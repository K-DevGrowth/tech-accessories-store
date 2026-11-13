"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    return await db.select().from(products).orderBy(desc(products.id));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function createProduct(data: {
  name: string;
  price: number;
  description?: string;
}) {
  if (!data.name || isNaN(data.price)) {
    throw new Error("Tên và giá sản phẩm là bắt buộc");
  }

  await db.insert(products).values({
    name: data.name,
    price: data.price,
    description: data.description || "",
  });

  revalidatePath("/");
}

export async function updateProduct(
  id: number,
  data: {
    name: string;
    price: number;
    description?: string;
  }
) {
  if (!data.name || isNaN(data.price)) {
    throw new Error("Tên và giá sản phẩm là bắt buộc");
  }

  await db
    .update(products)
    .set({
      name: data.name,
      price: data.price,
      description: data.description || "",
    })
    .where(eq(products.id, id));

  revalidatePath("/");
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/");
}
