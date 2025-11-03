import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const language = mysqlTable('language', {
  id: int('id').autoincrement().primaryKey(),
  language: varchar('language', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
});
