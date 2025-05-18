import { Router } from "express";
import {
    createNewCommentCntlr, createNewPostCntlr,
    getCtlrCheckCommentLike,
    getCtlrCheckPostLike,
    getCtlrPostDetails, getCtlrPosts,
    toggleCtlrCommentLikes, toggleCtlrPostLikes
} from "../controller/posts.js";
import { authJWT } from "../middleware/auth.js";

const router = Router();
router.use(authJWT);

// Create post and comment
router.post('/posts/new', createNewPostCntlr)
router.post('/posts/:postId/new', createNewCommentCntlr)

// Get data
router.get('/posts', getCtlrPosts)
router.get('/posts/:postId', getCtlrPostDetails)
router.get('/posts/:postId/like', toggleCtlrPostLikes)
router.get('/posts/:postId/comment/:commentId/like', toggleCtlrCommentLikes)
router.get('/posts/:postId/check-like', getCtlrCheckPostLike)
router.get('/posts/:postId/comment/:commentId/check-like', getCtlrCheckCommentLike)

export { router };

