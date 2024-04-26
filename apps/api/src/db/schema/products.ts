import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const products = mysqlTable('products', {
  id: int('id').autoincrement().primaryKey(),
  product_name: varchar('product_name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
});
