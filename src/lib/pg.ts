import { Client } from "pg";

export const database = new Client({
  connectionString: process.env.DATABASE_URL,
});
