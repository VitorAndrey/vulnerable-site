// import { Client } from "pg";

// export const database = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

import { Pool } from "pg";

export const database = new Pool({
  connectionString: process.env.DATABASE_URL,
});
