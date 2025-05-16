import { Router } from "express";
import {
    cntlrFindNonFollowers,
    cntlrFollowDelete,
    cntlrFollowRequest,
    cntrlrCurrUserFollowsTarget,
    getCtlrPaginatedUsers
} from "../controller/users.js";
import { authJWT } from "../middleware/auth.js";

const router = Router();
router.use(authJWT);

router.get('/users/follow', cntlrFollowRequest);
router.get('/users/unfollow', cntlrFollowDelete);
router.get('/users/is-following', cntrlrCurrUserFollowsTarget)
router.get('/users/non-followers', cntlrFindNonFollowers);
router.get('/users/mixed', getCtlrPaginatedUsers)

export { router };
