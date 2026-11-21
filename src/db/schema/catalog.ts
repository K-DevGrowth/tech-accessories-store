import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { createdAt, pk, updatedAt } from "./_helpers";
import { sql } from "drizzle-orm";

// Danh mục
export const categories = pgTable("categories", {
  id: pk(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  sortOrder: integer().notNull().default(0),
  createdAt: createdAt(),
});

// Thương hiệu
export const brands = pgTable("brands", {
  id: pk(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  createdAt: createdAt(),
});

// Sản phẩm
export const products = pgTable(
  "products",
  {
    id: pk(),
    slug: text().notNull().unique(),
    name: text().notNull(),
    // Tên đã bỏ dấu và viết thường ("Ốp lưng" -> "op lung"), app tự ghi khi lưu sản phẩm.
    // Dùng để tìm kiếm không dấu: WHERE name_normalized LIKE '%' || $1 || '%'.
    nameNormalized: text().notNull(),
    description: text().notNull().default(""),
    categoryId: integer()
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    brandId: integer()
      .notNull()
      .references(() => brands.id, { onDelete: "restrict" }),
    // BR-03: ẩn thay vì xóa. Sản phẩm từng nằm trong đơn sẽ bị FK restrict chặn xóa cứng.
    isActive: boolean().notNull().default(true),
    // DENORMALIZE có chủ đích: giá thấp nhất trong các biến thể đang bán, để lọc/sắp xếp
    // theo giá mà không cần join + group by. Phải cập nhật trong CÙNG transaction
    // với mỗi lần ghi biến thể.
    minPrice: integer().notNull().default(0),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("products_category_active_idx").on(t.categoryId, t.isActive),
    index("products_brand_idx").on(t.brandId),
    check("products_min_price_check", sql`${t.minPrice} >= 0`),
  ],
);

// Hình ảnh sản phẩm
export const productImages = pgTable(
  "product_images",
  {
    id: pk(),
    productId: integer()
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    url: text().notNull(),
    alt: text(),
    sortOrder: integer().notNull().default(0),
  },
  (t) => [index("product_images_product_idx").on(t.productId, t.sortOrder)],
);

// Biến thể sản phẩm
// BR-02: mỗi sản phẩm có >= 1 biến thể (SKU); giá và tồn kho nằm ở đây.
export const productVariants = pgTable(
  "product_variants",
  {
    id: pk(),
    productId: integer()
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    sku: text().notNull().unique(),
    // Chỉ để hiển thị, không truy vấn theo từng khóa. VD: {"Màu":"Đen","Mẫu":"iPhone 15"}
    attributes: jsonb().$type<Record<string, string>>().notNull().default({}),
    price: integer().notNull(), // BR-01: VND, số nguyên, đã gồm VAT
    stock: integer().notNull().default(0),
    imageUrl: text(),
    isActive: boolean().notNull().default(true),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => [
    index("product_variants_product_idx").on(t.productId),
    check("product_variants_price_check", sql`${t.price} >= 0`),
    // BR-12: chốt chặn cuối cùng ở DB, tồn kho không bao giờ âm dù code có lỗi.
    check("product_variants_stock_check", sql`${t.stock} >= 0`),
  ],
);
