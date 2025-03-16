const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const pool = require('../config/pool');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const pathToKey = path.join(__dirname,'..','id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

// JWT Strategy for protecting routes
async function verifyJWTCallback(payload, done) {
    try {
      const userId = payload.sub;
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
      const user = rows[0];
      
      // There's no need to verify the password since the JWT verified the user id
      if (!user) {
        return done(null, false, { message: "Incorrect username/passwords" });
      } else {
        return done(null, user)
      };
    } catch(err) {
      return done(err);
    }
}
const jwtStrategy = new JwtStrategy(options, verifyJWTCallback);

// Local Strategy for login mainly
async function verifyLocalCallback(username, password, done) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username/password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);

  } catch(err) {
    return done(err);
  }
}
const localStrategy = new LocalStrategy(verifyLocalCallback);

module.exports = { jwtStrategy, localStrategy };