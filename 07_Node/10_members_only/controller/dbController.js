const pool = require('../config/pool');

async function isUserAvail(emailValue) {
  const { rows } = await pool.query("SELECT email FROM mem_users WHERE email = $1",[emailValue]);
  return rows.length === 0;
}

async function findUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM mem_users WHERE email = $1", [email]);
  return rows;
}

async function findUserById(id) {
  const { rows } = await pool.query("SELECT * FROM mem_users WHERE id = $1", [id]);
  return rows;
}

async function updateUserStatus(id,status) {
  const admin = status==="admin"
  await pool.query(`
    UPDATE mem_users 
    SET admin = $1 
    WHERE id = $2`, [admin,id]);
}

async function registerUser(username,email,hashedPassword) {
  const { rows } = await pool.query("INSERT INTO mem_users (username, email, password) VALUES ($1, $2, $3) RETURNING *", 
    [ username,email,hashedPassword,]);
  return rows;
}

module.exports = { 
  isUserAvail, findUserByEmail, findUserById, registerUser, 
  updateUserStatus 
}