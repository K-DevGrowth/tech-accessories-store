import { defineRelations } from "drizzle-orm";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
      optional: false,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
      optional: false,
    }),
  },

  categories: { products: r.many.products() },
  brands: { products: r.many.products() },
  products: {
    category: r.one.categories({
      from: r.products.categoryId,
      to: r.categories.id,
      optional: false,
    }),
    brand: r.one.brands({
      from: r.products.brandId,
      to: r.brands.id,
      optional: false,
    }),
    images: r.many.productImages(),
    variants: r.many.productVariants(),
  },
  productImages: {
    product: r.one.products({
      from: r.productImages.productId,
      to: r.products.id,
      optional: false,
    }),
  },
  productVariants: {
    product: r.one.products({
      from: r.productVariants.productId,
      to: r.products.id,
      optional: false,
    }),
  },
}));
