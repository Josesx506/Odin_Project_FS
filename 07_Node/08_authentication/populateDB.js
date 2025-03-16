const { Client } = require("pg");
require('dotenv').config();

// I created the pgSession table as `user_sessions` instead of using the default `session` tablename
const CREATESESSIONS = `
CREATE TABLE IF NOT EXISTS "user_sessions" (
  "sid" varchar PRIMARY KEY NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "user_sessions" ("expire");
`

async function main() {
  console.log("populating db...");
  const client = new Client({connectionString: process.env.DBURI});
  await client.connect();
  await client.query(CREATESESSIONS);
  await client.end();
  console.log("done");
}

main();