import path from "node:path";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schemas } from "./schema";

const envName = process.env.NODE_ENV === "prod" ? ".env.prod" : ".env";
dotenv.config({
  path: path.resolve(__dirname, `../${envName}`),
});

console.log("2222连接数据库connection string: ", process.env.DATABASE_URL);
const connection = postgres(process.env.DATABASE_URL ?? "");

export const db = drizzle(connection, {
  schema: schemas,
});
