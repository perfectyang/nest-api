import {
  int,
  mysqlTable,
  timestamp,
  varchar,
  json,
} from 'drizzle-orm/mysql-core';

export const course_type = mysqlTable('course_type', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  category: varchar('category', { length: 255 }),
  tags: json('tags'),
  language: varchar('language', { length: 255 }),
  languageCategory: varchar('languageCategory', { length: 255 }),
  url: varchar('url', { length: 255 }),
  length: int('length'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
});
