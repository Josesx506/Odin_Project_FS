require('dotenv').config()
const { Client } = require("pg");

const DBURI = process.env.DBURI;

// Create the table and insert entries with raw sql
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  text VARCHAR ( 1024 ),
  added TIMESTAMP default CURRENT_TIMESTAMP
);

INSERT INTO messages (username, text) 
VALUES
  ('Amando', 'Hi there! Welcome to the Message Board'),
  ('Charles', 'Hello World! This is the Odin Project'),
  ('Pastor', 'To the church in onipanu, una like wahala'),
  ('Guest', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, sit ad explicabo rerum alias voluptatem dolore quod'),
  ('Guest', 'Labore nulla deleniti possimus magnam ipsa cumque eius, ab, totam, odit tempore cupiditate praesentium molestiae consectetur');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({ connectionString: DBURI });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
  
main();