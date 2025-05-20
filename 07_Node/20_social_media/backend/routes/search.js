import { Router } from "express";
import { searchUsersAndPosts } from "../controller/search.js";
import { authJWT } from "../middleware/auth.js";

const router = Router();
router.use(authJWT);

router.post('/search', searchUsersAndPosts);

export { router };
