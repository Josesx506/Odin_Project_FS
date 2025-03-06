const { Client } = require("pg");

// All of the following properties should be read from environment variables
const DBHOST = process.env.DBHOST;
const DBUSER = process.env.DBUSER;
const DBNAME = process.env.DBNAME;
const DBPSWD = process.env.DBPSWD;
const DBPORT = process.env.DBPORT;

// Create the table and insert entries with raw sql
const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: `postgresql://${DBUSER}:${DBPSWD}@${DBHOST}:${DBPORT}/${DBNAME}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
  
main();