import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
import path from 'path';
const envFile = path.resolve(__dirname, './.env');
dotenv.config({ path: envFile });

console.log('envFile------->>>', envFile);
console.log('process.env.DATABASE_URL: ', process.env.DATABASE_URL);

export default {
  schema: './src/db/schema/*',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL || '',
  },
} satisfies Config;
