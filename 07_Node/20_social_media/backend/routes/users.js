import { Router } from "express";
import {
    cntlrFindNonFollowers,
    cntlrFollowDelete,
    cntlrFollowRequest,
    cntlrGetAnyUserFollowers,
    cntlrGetAnyUserFollowing,
    cntlrGetUserPosts,
    cntlrGetUserProfile,
    cntlrGetUserProfileDetails,
    cntlrUpdateUserProfile,
    cntrlrCurrUserFollowsTarget,
    getCtlrPaginatedUsers
} from "../controller/users.js";
import { authJWT } from "../middleware/auth.js";

const router = Router();
router.use(authJWT);

// These routes are always tied to the logged in user
router.get('/users/follow', cntlrFollowRequest);
router.get('/users/unfollow', cntlrFollowDelete);
router.get('/users/mixed', getCtlrPaginatedUsers);
router.get('/users/non-followers', cntlrFindNonFollowers);
router.get('/users/check-following', cntrlrCurrUserFollowsTarget);
router.get('/users/profile', cntlrGetUserProfile);
router.post('/users/profile', cntlrUpdateUserProfile);

// These routes work for any user id
router.get('/users/:userId', cntlrGetUserProfileDetails);
router.get('/users/:userId/posts', cntlrGetUserPosts);
router.get('/users/:userId/followers', cntlrGetAnyUserFollowers);
router.get('/users/:userId/following', cntlrGetAnyUserFollowing);

export { router };
