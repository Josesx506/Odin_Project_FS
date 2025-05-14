import { passport } from "../config/passport.js";

function authEmail(req,res,next) {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Authentication failed",
      });
    } else {
        req.user = user;
        next();
    }})(req, res, next);
}

function authOAuth(req,res,next) {
  passport.authenticate("github", 
    { scope: ['user.email'], failureRedirect: `${process.env.CLIENT_URL}/signin` }, 
    (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Github user not found",
      });
    } else {
        req.otp = user.githubotp;
        next();
    }})(req, res, next);
}

function authJWT(req, res, next) {
  passport.authenticate("jwt", 
    { session: false },
    (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ 
        message: info?.message || "Unauthorized: Invalid or expired token"
      });
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
}


export { authJWT, authOAuth, authEmail };
