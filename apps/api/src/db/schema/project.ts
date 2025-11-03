import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const project = mysqlTable('project', {
  id: int('id').autoincrement().primaryKey(),
  projectName: varchar('project_name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
});
