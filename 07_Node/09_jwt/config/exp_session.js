const pool = require('./pool');
const expSession = require("express-session");
const pgStore = require("connect-pg-simple")(expSession);
require("dotenv").config();

const sessionStore = new pgStore({
    pool : pool,
    tableName : 'sessions',
})

const sessConfig = expSession({ 
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
})

module.exports = sessConfig;