import { int, mysqlTable, text, timestamp } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: int('id').autoincrement().primaryKey(),
  user: text('user').notNull(),
  password: text('password').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});
