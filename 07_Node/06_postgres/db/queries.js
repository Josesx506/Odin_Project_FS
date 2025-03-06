const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
  // OR
  // await pool.query("INSERT INTO usernames (username) VALUES ('" + username + "')");
}

async function findUser(value) {
    // find if the string is inside any name
    const { rows } = await pool.query("SELECT * FROM usernames WHERE username LIKE ($1)", [`%${value}%`]);
    return rows;
}

async function deleteAll() {
    await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllUsernames,
  insertUsername,
  findUser,
  deleteAll
};