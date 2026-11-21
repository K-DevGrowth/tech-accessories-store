import { integer, timestamp } from "drizzle-orm/pg-core";

export const pk = () => integer().primaryKey().generatedAlwaysAsIdentity();

export const createdAt = () =>
  timestamp({ withTimezone: true }).notNull().defaultNow();

export const updatedAt = () =>
  timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());
