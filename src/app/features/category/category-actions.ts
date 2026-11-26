"use server";

import { db } from "@/db/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

const CreateCategorySchema = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim(),
  sortOrder: z.coerce.number().int().default(0),
});

export async function createCategory(formData: FormData) {
  const { name, slug, sortOrder } = CreateCategorySchema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    sortOrder: formData.get("sortOrder"),
  });

  await db.insert(categories).values({ name, slug, sortOrder });

  revalidatePath("/admin/catalog");
}

export type DeleteCategoryResult = { ok: true } | { ok: false; error: string };

export async function deleteCategory(
  id: string,
): Promise<DeleteCategoryResult> {
  const categoryId = z.number().int().positive().parse(id);

  const inUse = await db.query.products.findFirst({
    where: { categoryId },
    columns: { id: true },
  });

  if (inUse) {
    return {
      ok: false,
      error: "Danh mục còn sản phẩm, hãy chuyển hoặc xóa sản phẩm trước.",
    };
  }

  await db.delete(categories).where(eq(categories.id, categoryId));

  revalidatePath("/admin/catalog");
  return { ok: true };
}

const UpdateCategorySchema = CreateCategorySchema.extend({
  id: z.number().int().positive(),
});

export type UpdateCategoryResult = { ok: true } | { ok: false; error: string };

export async function updateCategory(
  id: number,
  formData: FormData,
): Promise<UpdateCategoryResult> {
  const data = UpdateCategorySchema.parse({
    id,
    name: formData.get("name"),
    slug: formData.get("slug"),
    sortOrder: formData.get("sortOrder"),
  });

  await db
    .update(categories)
    .set({
      name: data.name,
      slug: data.slug,
      sortOrder: data.sortOrder,
    })
    .where(eq(categories.id, data.id));

  revalidatePath("/admin/catalog");
  return { ok: true };
}
