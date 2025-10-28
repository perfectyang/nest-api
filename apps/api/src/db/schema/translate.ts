import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { user } from './user';
import { project } from './project';

export const translate = mysqlTable('translate', {
  id: int('id').autoincrement().primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  ch: varchar('ch', { length: 255 }).notNull(),
  en: varchar('en', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  creator_id: int('creator_id').references(() => user.id),
  project_id: int('project_id').references(() => project.id),
});
