const { Pool } = require("pg");

// All of the following properties should be read from environment variables
const DBHOST = process.env.DBHOST;
const DBUSER = process.env.DBUSER;
const DBNAME = process.env.DBNAME;
const DBPSWD = process.env.DBPSWD;
const DBPORT = process.env.DBPORT;

module.exports = new Pool({
  host: DBHOST,
  user: DBUSER,
  database: DBNAME,
  password: DBPSWD,
  port: DBPORT
});


// You can use a dynamic object or connection string
// module.exports = new Pool({
//     connectionString: `postgresql://${DBUSER}:${DBPSWD}@${DBHOST}:${DBPORT}/${DBNAME}`
// });