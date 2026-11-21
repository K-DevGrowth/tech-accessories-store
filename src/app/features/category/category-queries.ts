import "server-only";

import { db } from "@/db/db";

export async function getCategories() {
  return await db.query.categories.findMany({
    orderBy: { sortOrder: "asc" },
  });
}
