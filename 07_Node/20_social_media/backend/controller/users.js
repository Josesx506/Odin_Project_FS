import { getDbUserPosts } from "./prisma_posts.js";
import {
  addNewFollowerDb,
  checkUserNowFollowsDb,
  getDbUserFollowersPaginated,
  getDbUserFollowingPaginated,
  getDbUsersPaginated,
  getLimitedNonFollowersDb,
  getUserProfileDetailsDb,
  removeExistingFollowerDb, 
  updateUserProfileDb
} from "./prisma_users.js";

async function getCtlrPaginatedUsers(req, res) {
  try {
    const userId = req.user?.id;
    let { skip, take } = req.query;
    skip = Number(skip) || 0;
    take = Number(take) || 20;
    const users = await getDbUsersPaginated(userId, skip, take);
    if (!users) {
      return res.status(400).json({ message: "No users found" });
    } else {
      return res.status(200).json(users);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' })
  }
}

async function cntrlrCurrUserFollowsTarget(req, res) {
  const userId = req.user?.id;
  const { targetId } = req.query;

  if (!targetId || isNaN(Number(targetId))) {
    return res.status(400).json({ message: 'Invalid or missing targetId' });
  }

  try {
    const status = await checkUserNowFollowsDb(userId, Number(targetId));
    return res.status(200).json({ isFollowing: !!status });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}

async function cntlrFollowRequest(req, res) {
  const userId = req.user?.id;
  const { targetId } = req.query;

  if (userId === Number(targetId)) {
    return res.status(404).json({ message: 'Forbidden. You can follow yourself' })
  }

  try {
    const added = await addNewFollowerDb(userId, Number(targetId));
    return res.status(200).json(added);
  } catch (err) {
    return res.status(404).json({ message: `You're already connected to this user` });
  }
}

async function cntlrFollowDelete(req, res) {
  const userId = req.user?.id;
  const { targetId } = req.query;
  try {
    const added = await removeExistingFollowerDb(userId, Number(targetId));
    return res.status(200).json(added);
  } catch (err) {
    return res.status(404).json({ message: `You're not friends with this user` });
  }
}

async function cntlrFindNonFollowers(req, res) {
  const userId = req.user?.id;
  try {
    let { skip, take } = req.query;
    skip = Number(skip) || 0;
    take = Number(take) || 5;
    const users = await getLimitedNonFollowersDb(userId, skip, take);
    if (users.length === 0) {
      return res.status(200).json({ message: "Everyone is part of your follow/following list" })
    } else {
      return res.status(200).json(users);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}

async function cntlrGetUserProfileDetails(req, res) {
  const { userId } = req.params;
  try {
    const user = await getUserProfileDetailsDb(Number(userId));
    if (!user) {
      return res.status(404).json({ message: "User not found in db" })
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}

async function cntlrGetAnyUserFollowers(req, res) {
  const currUserId = req.user?.id;
  try {
    let { userId } = req.params;
    let { skip, take } = req.query;
    userId = Number(userId);
    skip = Number(skip) || 0;
    take = Number(take) || 20;
    const result = await getDbUserFollowersPaginated(currUserId, userId, skip, take);
    if (result.followers.length === 0) {
      return res.status(200).json({ message: "No followers found for this user", ...result })
    } else {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}

async function cntlrGetAnyUserFollowing(req, res) {
  const currUserId = req.user?.id;
  try {
    let { userId } = req.params;
    let { skip, take } = req.query;
    userId = Number(userId);
    skip = Number(skip) || 0;
    take = Number(take) || 20;
    const result = await getDbUserFollowingPaginated(currUserId, userId, skip, take);
    if (result.following.length === 0) {
      return res.status(200).json({ message: "This user is not following anyone", ...result })
    } else {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}


async function cntlrGetUserPosts(req, res) {
  const { userId } = req.params;
  let { skip, take } = req.query;
  skip = Number(skip) || 0;
  take = Number(take) || 10;
  try {
    const posts = await getDbUserPosts(Number(userId), skip, take);
    if (posts.length === 0) {
      return res.status(200).json({ message: "No posts found for this user" })
    } else {
      return res.status(200).json({ posts, hasMore: posts.length === take });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}

async function cntlrGetUserProfile(req, res) {
  const user = req.user;
  const data = {
    fullname: user.fullname,
    username: user.username.toLowerCase(),
    gravatar: user.gravatar,
    bio: user.bio
  }
  try {
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}

async function cntlrUpdateUserProfile(req, res) {
  const userId = req.user?.id;
  const { id, fullname, username, gravatar, bio } = req.body;

  console.log(Number(id),userId, req.body)

  if (Number(id) !== userId) {
    return res.status(401).json({ message: 'Unauthorized Profile Edit' });
  }
  try {
    const updt = await updateUserProfileDb(userId, fullname, username, gravatar, bio)
    res.status(200).json({ message: 'Profile updated' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}

export {
  cntlrFindNonFollowers, cntlrFollowDelete, cntlrFollowRequest,
  cntlrGetAnyUserFollowers, cntlrGetAnyUserFollowing, cntlrGetUserPosts,
  cntlrGetUserProfile, cntlrGetUserProfileDetails, cntlrUpdateUserProfile, 
  cntrlrCurrUserFollowsTarget, getCtlrPaginatedUsers
};

