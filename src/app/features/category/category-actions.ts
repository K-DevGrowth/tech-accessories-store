"use server";

import { db } from "@/db/db";
import { categories } from "@/db/schema";
import { revalidatePath } from "next/cache";
import z from "zod";

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

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

  await db
    .insert(categories)
    .values({ name, slug: slug || toSlug(name), sortOrder });

  revalidatePath("/admin/catalog");
}

