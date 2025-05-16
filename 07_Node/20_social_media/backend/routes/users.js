import { Router } from "express";
import { 
    cntlrFollowRequest, cntlrFollowDelete, cntlrFindNonFollowers
} from "../controller/users.js";
import { authJWT } from "../middleware/auth.js";

const router = Router();
router.use(authJWT);

router.get('/users/follow', cntlrFollowRequest);
router.get('/users/unfollow', cntlrFollowDelete);
router.get('/users/non-followers', cntlrFindNonFollowers);

export { router }