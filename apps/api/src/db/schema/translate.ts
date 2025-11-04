import {
  int,
  mysqlTable,
  timestamp,
  varchar,
  json,
} from 'drizzle-orm/mysql-core';
import { user } from './user';
import { project } from './project';

export const translate = mysqlTable('translate', {
  id: int('id').autoincrement().primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  translations: json('translations').$type<Record<string, string>>(),
  created_at: timestamp('created_at').defaultNow(),
  creator_id: int('creator_id').references(() => user.id),
  project_id: int('project_id').references(() => project.id),
});
