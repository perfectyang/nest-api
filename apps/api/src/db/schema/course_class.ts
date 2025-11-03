import {
  int,
  mysqlTable,
  timestamp,
  varchar,
  json,
} from 'drizzle-orm/mysql-core';

export const course_class = mysqlTable('course_class', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  usphone: varchar('usphone', { length: 255 }),
  ukphone: varchar('ukphone', { length: 255 }),
  trans: json('trans'),
  course_id: int('course_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
});
