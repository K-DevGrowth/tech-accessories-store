// Tương tác

import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { orders } from "./sales";
import { products } from "./catalog";
import { createdAt, pk, updatedAt } from "./_helpers";

// FR-13 [S]. Khi checkout, giá trị được SAO CHÉP sang bảng orders (snapshot),
// không tham chiếu bằng FK.
export const addresses = pgTable(
  "addresses",
  {
    id: pk(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    recipientName: text().notNull(),
    phone: text().notNull(),
    province: text().notNull(), // chọn từ danh sách tỉnh/thành cố định ở app (Q-06)
    addressLine: text().notNull(),
    isDefault: boolean().notNull().default(false),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("addresses_user_idx").on(t.userId),
    // Mỗi user tối đa 1 địa chỉ mặc định.
    uniqueIndex("addresses_one_default_uq")
      .on(t.userId)
      .where(sql`${t.isDefault}`),
  ],
);

// FR-14 [S] + BR-19: mỗi cặp (đơn, sản phẩm) chỉ có một đánh giá.
// Việc đơn phải ở trạng thái 'delivered' và thuộc về user được kiểm tra ở service,
// vì DB không biểu diễn gọn được ràng buộc này.
export const reviews = pgTable(
  "reviews",
  {
    id: pk(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    productId: integer()
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    orderId: integer()
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    rating: integer().notNull(),
    comment: text(),
    isHidden: boolean().notNull().default(false), // FR-22 [C]: admin ẩn đánh giá
    createdAt: createdAt(),
  },
  (t) => [
    unique("reviews_order_product_uq").on(t.orderId, t.productId),
    index("reviews_product_created_idx").on(t.productId, t.createdAt.desc()),
    check("reviews_rating_check", sql`${t.rating} between 1 and 5`),
  ],
);
