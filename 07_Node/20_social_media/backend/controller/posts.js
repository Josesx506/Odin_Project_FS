import {
  getDbPostDetailsWithComments, getDbPosts,
  getDbUserLikesComment,
  getDbUserLikesPost,
  toggleDbCommentLikes, toggleDbPostLikes
} from "./prisma_posts.js";

async function getCtlrPosts(req, res) {
  try {
    let { skip } = req.query;
    skip = Number(skip) || 0;
    const posts = await getDbPosts(skip);
    if (!posts) {
      return res.status(400).json({ message: "No posts found" });
    } else {
      return res.status(200).json(posts);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' })
  }
}

async function getCtlrPostDetails(req, res) {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;
    const post = await getDbPostDetailsWithComments(userId, Number(postId));
    if (!post) {
      return res.status(400).json({ message: `Post ${postId} found` });
    } else {
      return res.status(200).json(post);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' })
  }
}

async function getCtlrCheckPostLike(req, res) {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;
    const liked = await getDbUserLikesPost(userId, Number(postId));
    return res.status(200).json(liked);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' })
  }
}

async function getCtlrCheckCommentLike(req, res) {
  try {
    const userId = req.user?.id;
    const { commentId } = req.params;
    const liked = await getDbUserLikesComment(userId, Number(commentId));
    return res.status(200).json(liked);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' })
  }
}

async function toggleCtlrPostLikes(req, res) {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;
    const likes = await toggleDbPostLikes(userId, Number(postId));
    if (!likes) {
      return res.status(400).json({ message: "Post not found" });
    } else {
      return res.status(200).json(likes);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' })
  }
}

async function toggleCtlrCommentLikes(req, res) {
  try {
    const userId = req.user?.id;
    const { commentId } = req.params;
    const likes = await toggleDbCommentLikes(userId, Number(commentId));
    if (!likes) {
      return res.status(400).json({ message: "Comment not found" });
    } else {
      return res.status(200).json(likes);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' })
  }
}

export {
  getCtlrCheckCommentLike, getCtlrCheckPostLike, getCtlrPostDetails, 
  getCtlrPosts, toggleCtlrCommentLikes, toggleCtlrPostLikes
};

