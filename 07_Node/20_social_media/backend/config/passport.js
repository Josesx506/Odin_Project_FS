import bcrypt from 'bcrypt';
import crypto from 'crypto';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { retrieveUserById, retrieveUserByEmail, updateUserDetailsByEmail } from '../controller/prisma_auth.js';

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
}

// Local Strategy for session based authentication
async function verifyLocalCallback(email, password, done) {
  try {
    const user = await retrieveUserByEmail(email);

    if (!user) {
      return done(null, false, { message: "Incorrect email/password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);

  } catch (err) {
    return done(err);
  }
}
const localStrategy = new LocalStrategy(customFields, verifyLocalCallback);

// Serializers for local strategy signin and signout
passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await retrieveUserByEmail(email);
    done(null, user);
  } catch (err) {
    done(err);
  }
});




// Github OAuth authentication for signin
async function verifyGitHubOAuthCallback(accessToken, refreshToken, profile, done) {
  try {
    let email = null;

    if (profile.emails && profile.emails.length > 0) {
      email = profile.emails.find(e => e.verified)?.value || profile.emails[0].value;
    } else {
      // Create a dummy email that can be saved in the db
      email = `${String(profile.id)}@github.local`.toLowerCase();
      profile.emails = [{value: email}]
    }
    
    if (typeof crypto.randomUUID !== 'function') {
      console.warn('Warning: crypto.randomUUID() is not available. Please use Node.js v16 or higher.');
    }

    profile.otp = crypto.randomUUID().replace(/-/g,'');

    // Upsert the user into the db if they exist
    const user = await updateUserDetailsByEmail(email,profile)

    return done(null, user)

  } catch (err) {
    return done(err)
  }

}

const oauthOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.CLIENT_URL}/v1/auth/github/callback`,
  // scope: ['user:email'], force retrieval of emails. Can throw errors if email is hidden
}

const oauthStrategy = new GithubStrategy(oauthOptions, verifyGitHubOAuthCallback);




// JWT Strategy for token authentication
async function verifyJWTCallback(payload, done) {
  try {
    const user = await retrieveUserById(payload.id)

    // There's no need to verify the password since the JWT verified the user id
    if (!user) {
      return done(null, false, { message: "Forbidden" });
    } else {
      return done(null, user)
    };
  } catch (err) {
    return done(err);
  }
}

function cookieExtractor(req) {
  let token= null;
  if (req && req.cookies && req.cookies?.accessJwt) {
    token = req.cookies.accessJwt;
  }
  return token;
}

const jwtOptions = {
  // jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET
}

const jwtStrategy = new JwtStrategy(jwtOptions, verifyJWTCallback);



passport.use(localStrategy);
passport.use(oauthStrategy);
passport.use(jwtStrategy);

export { passport }