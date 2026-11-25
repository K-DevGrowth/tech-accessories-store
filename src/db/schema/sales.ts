import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { productVariants, products } from "./catalog";
import { createdAt, pk, updatedAt } from "./_helpers";

// BR-13: pending -> confirmed -> shipping -> delivered, ngoài ra có cancelled.
// Nhãn tiếng Việt nằm ở app (rules.ts), DB chỉ lưu mã ổn định.
export const orderStatus = pgEnum("order_status", [
  "pending",
  "confirmed",
  "shipping",
  "delivered",
  "cancelled",
]);
export const paymentMethod = pgEnum("payment_method", ["cod", "online"]);
// Q-01: trạng thái thanh toán tách riêng khỏi trạng thái đơn.
export const paymentStatus = pgEnum("payment_status", [
  "unpaid",
  "paid",
  "refunded",
]);

// Giỏ hàng của người dùng đã đăng nhập. Mỗi user đúng 1 giỏ nên không cần bảng `carts`.
// Giỏ của Guest nằm ở localStorage (Q-02), được gộp vào đây khi đăng nhập (BR-07).
export const cartItems = pgTable(
  "cart_items",
  {
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    variantId: integer()
      .notNull()
      .references(() => productVariants.id, { onDelete: "cascade" }),
    quantity: integer().notNull(),
    // Q-03: giá lúc thêm vào giỏ, chỉ để checkout báo "giá đã đổi".
    // Giá tính tiền luôn lấy từ bảng product_variants.
    priceAtAdd: integer().notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.variantId] }), // đồng thời là index cho "lấy giỏ của user"
    check("cart_items_quantity_check", sql`${t.quantity} between 1 and 10`), // BR-05
  ],
);

export const orders = pgTable(
  "orders",
  {
    id: pk(),
    // Mã công khai để hiển thị/tra cứu (VD "DH-7K3F9Q2M"). Không đưa id tuần tự ra URL
    // để người ngoài không đoán được đơn của người khác. Vẫn phải kiểm tra userId khi truy cập.
    code: text().notNull().unique(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    status: orderStatus().notNull().default("pending"),
    paymentMethod: paymentMethod().notNull(),
    paymentStatus: paymentStatus().notNull().default("unpaid"),

    // BR-09/10: server tính. Lưu cả 3 số để đối soát.
    subtotal: integer().notNull(),
    shippingFee: integer().notNull(),
    total: integer().notNull(),

    // BR-11 (mở rộng): chụp lại địa chỉ giao hàng, sửa sổ địa chỉ sau này không ảnh hưởng đơn cũ. Q-06.
    recipientName: text().notNull(),
    phone: text().notNull(),
    province: text().notNull(),
    addressLine: text().notNull(),
    note: text(),

    paymentRef: text(), // mã giao dịch từ cổng thanh toán sandbox
    paymentExpiresAt: timestamp({ withTimezone: true }), // BR-16: createdAt + 15 phút, chỉ với đơn online

    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("orders_user_created_idx").on(t.userId, t.createdAt.desc()), // lịch sử đơn của khách
    index("orders_created_idx").on(t.createdAt.desc()), // danh sách admin + dashboard theo ngày
    check(
      "orders_total_check",
      sql`${t.total} = ${t.subtotal} + ${t.shippingFee}`,
    ),
    check(
      "orders_amount_check",
      sql`${t.subtotal} >= 0 and ${t.shippingFee} >= 0`,
    ),
  ],
);

// BR-11: chụp lại tên/giá/biến thể lúc mua. FK vẫn giữ để liên kết
// (restrict: không thể xóa cứng sản phẩm/biến thể đã có đơn).
export const orderItems = pgTable(
  "order_items",
  {
    id: pk(),
    orderId: integer()
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: integer()
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),
    variantId: integer()
      .notNull()
      .references(() => productVariants.id, { onDelete: "restrict" }),
    productName: text().notNull(),
    variantLabel: text().notNull(), // VD "Đen / iPhone 15"
    sku: text().notNull(),
    imageUrl: text(),
    unitPrice: integer().notNull(),
    quantity: integer().notNull(),
  },
  (t) => [
    unique("order_items_order_variant_uq").on(t.orderId, t.variantId), // đồng thời là index theo orderId
    check("order_items_quantity_check", sql`${t.quantity} > 0`),
    check("order_items_price_check", sql`${t.unitPrice} >= 0`),
  ],
);

// Nhật ký chuyển trạng thái: hiển thị timeline cho khách và truy vết ai hủy/đổi.
export const orderStatusEvents = pgTable(
  "order_status_events",
  {
    id: pk(),
    orderId: integer()
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    fromStatus: orderStatus(), // null = sự kiện tạo đơn
    toStatus: orderStatus().notNull(),
    actorId: text().references(() => user.id, { onDelete: "set null" }), // null = hệ thống (cron tự hủy)
    note: text(),
    createdAt: createdAt(),
  },
  (t) => [index("order_status_events_order_idx").on(t.orderId, t.createdAt)],
);
