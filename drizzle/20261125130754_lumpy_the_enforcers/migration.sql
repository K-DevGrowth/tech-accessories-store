CREATE TYPE "order_status" AS ENUM('pending', 'confirmed', 'shipping', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "payment_method" AS ENUM('cod', 'online');--> statement-breakpoint
CREATE TYPE "payment_status" AS ENUM('unpaid', 'paid', 'refunded');--> statement-breakpoint
CREATE TABLE "cart_items" (
	"userId" text,
	"variantId" integer,
	"quantity" integer NOT NULL,
	"priceAtAdd" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cart_items_pkey" PRIMARY KEY("userId","variantId"),
	CONSTRAINT "cart_items_quantity_check" CHECK ("quantity" between 1 and 10)
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order_items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"orderId" integer NOT NULL,
	"productId" integer NOT NULL,
	"variantId" integer NOT NULL,
	"productName" text NOT NULL,
	"variantLabel" text NOT NULL,
	"sku" text NOT NULL,
	"imageUrl" text,
	"unitPrice" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "order_items_order_variant_uq" UNIQUE("orderId","variantId"),
	CONSTRAINT "order_items_quantity_check" CHECK ("quantity" > 0),
	CONSTRAINT "order_items_price_check" CHECK ("unitPrice" >= 0)
);
--> statement-breakpoint
CREATE TABLE "order_status_events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order_status_events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"orderId" integer NOT NULL,
	"fromStatus" "order_status",
	"toStatus" "order_status" NOT NULL,
	"actorId" text,
	"note" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"code" text NOT NULL UNIQUE,
	"userId" text NOT NULL,
	"status" "order_status" DEFAULT 'pending'::"order_status" NOT NULL,
	"paymentMethod" "payment_method" NOT NULL,
	"paymentStatus" "payment_status" DEFAULT 'unpaid'::"payment_status" NOT NULL,
	"subtotal" integer NOT NULL,
	"shippingFee" integer NOT NULL,
	"total" integer NOT NULL,
	"recipientName" text NOT NULL,
	"phone" text NOT NULL,
	"province" text NOT NULL,
	"addressLine" text NOT NULL,
	"note" text,
	"paymentRef" text,
	"paymentExpiresAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "orders_total_check" CHECK ("total" = "subtotal" + "shippingFee"),
	CONSTRAINT "orders_amount_check" CHECK ("subtotal" >= 0 and "shippingFee" >= 0)
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "addresses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" text NOT NULL,
	"recipientName" text NOT NULL,
	"phone" text NOT NULL,
	"province" text NOT NULL,
	"addressLine" text NOT NULL,
	"isDefault" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reviews_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" text NOT NULL,
	"productId" integer NOT NULL,
	"orderId" integer NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"isHidden" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_order_product_uq" UNIQUE("orderId","productId"),
	CONSTRAINT "reviews_rating_check" CHECK ("rating" between 1 and 5)
);
--> statement-breakpoint
ALTER INDEX "account_userId_idx" RENAME TO "account_user_id_idx";--> statement-breakpoint
ALTER INDEX "session_userId_idx" RENAME TO "session_user_id_idx";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'customer' NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "access_token_expires_at" SET DATA TYPE timestamp with time zone USING "access_token_expires_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "refresh_token_expires_at" SET DATA TYPE timestamp with time zone USING "refresh_token_expires_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone USING "expires_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone USING "expires_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at"::timestamp with time zone;--> statement-breakpoint
CREATE INDEX "order_status_events_order_idx" ON "order_status_events" ("orderId","createdAt");--> statement-breakpoint
CREATE INDEX "orders_user_created_idx" ON "orders" ("userId","createdAt" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "orders_created_idx" ON "orders" ("createdAt" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "addresses_user_idx" ON "addresses" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "addresses_one_default_uq" ON "addresses" ("userId") WHERE "isDefault";--> statement-breakpoint
CREATE INDEX "reviews_product_created_idx" ON "reviews" ("productId","createdAt" DESC NULLS LAST);--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_variantId_product_variants_id_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_orders_id_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_products_id_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variantId_product_variants_id_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "order_status_events" ADD CONSTRAINT "order_status_events_orderId_orders_id_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "order_status_events" ADD CONSTRAINT "order_status_events_actorId_user_id_fkey" FOREIGN KEY ("actorId") REFERENCES "user"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_products_id_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderId_orders_id_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_role_check" CHECK ("role" in ('customer', 'admin'));