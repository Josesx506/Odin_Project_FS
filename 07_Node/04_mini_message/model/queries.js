const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

async function insertMessage(username,message) {
    await pool.query("INSERT INTO messages (username,text) VALUES ($1,$2)", [username,message]);
}

async function findMessage(value) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id=($1)", [value]);
    return rows;
}

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
}

const dateOptions = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit'
}

module.exports = { 
    getAllMessages,
    insertMessage,
    findMessage,
    timeOptions,
    dateOptions
}