import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { authRelations } from "./schema";
import { relations } from "drizzle-orm/_relations";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({
  client: sql,
  relations: { ...relations, ...authRelations },
});
