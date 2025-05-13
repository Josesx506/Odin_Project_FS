import { Router } from "express";
import { passport } from '../config/passport.js';
import { authOAuth } from '../middleware/auth.js'

const router = Router();

// The user profile is upserted into the db if they don't exist
router.get('/github', authOAuth); 
router.get('/github/callback', authOAuth, (req, res) => {
    res.redirect('/profile')
  }
) // Send login JWT in final implementation

export { router }