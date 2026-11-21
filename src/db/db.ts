import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./schema/relations";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Thiếu biến môi trường DATABASE_URL");
}

function createPool() {
  const pool = new Pool({ connectionString, max: 5 });
  pool.on("error", (error) => console.error("Lỗi postgres pool: ", error));
  return pool;
}

const globalForPgPool = globalThis as unknown as { pgPool?: Pool };
const pool = globalForPgPool.pgPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalForPgPool.pgPool = pool;

export const db = drizzle({ client: pool, relations });
