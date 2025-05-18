import { prisma } from '../config/prisma.js';

async function getDbPosts(skip, take = 10) {
  const posts = await prisma.socialPost.findMany({
    select: {
      id: true,
      body: true,
      postimg: true,
      authorId: true,
      updatedAt: true,
      author: {
        select: { fullname: true, username: true, gravatar: true }
      },
      _count: {
        select: { likes: true, views: true, comments: true }
      },
    },
    skip: skip,
    take: take,
    orderBy: { updatedAt: 'desc' }
  })
  const finalPosts = posts.map((post) => {
    const { _count, ...rest } = post; // Drop the count key
    return {
      ...rest,
      likes: _count.likes,
      views: _count.views,
      comments: _count.comments
    };
  })
  return finalPosts;
}

async function getDbUserPosts(userId, skip, take = 10) {
  const posts = await prisma.socialPost.findMany({
    where: { authorId: userId },
    select: {
      id: true,
      body: true,
      postimg: true,
      authorId: true,
      updatedAt: true,
      author: {
        select: { fullname: true, username: true, gravatar: true }
      },
      _count: {
        select: { likes: true, views: true, comments: true }
      },
    },
    skip: skip,
    take: take,
    orderBy: { updatedAt: 'desc' }
  })

  if (!posts) { return null }

  const finalPosts = posts.map((post) => {
    const { _count, ...rest } = post; // Drop the count key
    return {
      ...rest,
      likes: _count.likes,
      views: _count.views,
      comments: _count.comments
    };
  })
  return finalPosts;
}

async function getDbPostDetailsWithComments(userId, postId) {
  // Prevent duplicate views by the same user
  try {
    await prisma.postView.upsert({
      where: { userId_postId: { userId, postId } },
      update: {},
      create: { userId, postId }
    });
  } catch (err) {
    console.error("Error incrementing view:", err);
    return null;
  }

  const post = await prisma.socialPost.findUnique({
    where: { id: postId },
    select: {
      id: true,
      body: true,
      postimg: true,
      createdAt: true,
      author: {
        select: { id: true, fullname: true, username: true, gravatar: true }
      },
      comments: {
        select: {
          id: true,
          body: true,
          commentimg: true,
          createdAt: true,
          _count: { select: { likes: true } },
          author: {
            select: { id:true, fullname: true, username: true, gravatar: true }
          }
        },
        orderBy: { updatedAt: 'desc' }
      },
      _count: {
        select: { likes: true, views: true, comments: true }
      },
    }
  })

  if (!post) return null;

  const finalPost = {
    author: post.author,
    post: {
      id: post.id,
      body: post.body,
      postimg: post.postimg,
      createdAt: post.createdAt,
      postLikes: post._count.likes,
      postViews: post._count.views,
      numComments: post._count.comments },
    comments: post.comments.map((comment) => ({
      id: comment.id,
      postId: post.id,
      body: comment.body,
      commentimg: comment.commentimg,
      likes: comment._count.likes,
      author: comment.author,
      createdAt: comment.createdAt,
    })),
  }

  return finalPost
}

async function getDbUserLikesPost(userId, postId) {
  const exists = await prisma.postLike.findUnique({
    where: { userId_postId: { userId, postId } }
  })
  return !!exists;
}

async function getDbUserLikesComment(userId, commentId) {
  const exists = await prisma.commentLike.findUnique({
    where: { userId_commentId: { userId, commentId } }
  })
  return !!exists;
}

async function toggleDbPostLikes(userId, postId) {
  // Check that the post exists
  const exists = await prisma.socialPost.findUnique({
    where: { id: postId }, select: { id: true }
  })
  if (!exists) return null;

  const finalLikeCount = await prisma.$transaction(async (tx) => {
    // Try to delete the like - returns count of deleted records
    const deleteResult = await tx.postLike.deleteMany({
      where: { userId, postId }
    });
    // If nothing was deleted, create a new like
    if (deleteResult.count === 0) {
      await tx.postLike.create({ data: { userId, postId } });
    }
    // Get the updated count
    const likeCount = await tx.postLike.count({ where: { postId } });

    return likeCount
  })
  return finalLikeCount;
}

async function toggleDbCommentLikes(userId, commentId) {
  const exists = await prisma.socialComment.findUnique({
    where: { id: commentId }, select: { id: true }
  })
  if (!exists) return null;

  const finalLikeCount = await prisma.$transaction(async (tx) => {
    const deleteResult = await tx.commentLike.deleteMany({
      where: { userId, commentId }
    });

    if (deleteResult.count === 0) {
      await tx.commentLike.create({ data: { userId, commentId } });
    }

    const likeCount = await tx.commentLike.count({ where: { commentId } });

    return likeCount
  })
  return finalLikeCount;
}

export {
  getDbPostDetailsWithComments, getDbPosts, getDbUserLikesComment, 
  getDbUserLikesPost, getDbUserPosts, toggleDbCommentLikes, toggleDbPostLikes
};

