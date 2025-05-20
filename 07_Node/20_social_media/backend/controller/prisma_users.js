import { prisma } from '../config/prisma.js';

async function checkUserNowFollowsDb(currUserId, trgtUserId) {
  const following = await prisma.socialFriendship.findUnique({
    where: {
      userId_friendId: {
        userId: currUserId,
        friendId: trgtUserId,
      },
    }
  })
  return following;
}

async function addNewFollowerDb(currUserId, trgtUserId) {
  const added = await prisma.socialFriendship.create({
    data: {
      user: { connect: { id: currUserId } },
      friend: { connect: { id: trgtUserId } },
    }
  })
  return added;
}

async function removeExistingFollowerDb(currUserId, trgtUserId) {
  const removed = await prisma.socialFriendship.delete({
    where: {
      userId_friendId: {
        userId: currUserId,
        friendId: trgtUserId,
      }
    }
  })
  return removed;
}

async function getLimitedNonFollowersDb(userId, skip, take = 5) {
  const users = await prisma.socialUser.findMany({
    where: {
      NOT: { id: userId },
      friendOf: { none: { userId: userId } },
      friends: { none: { friendId: userId } }
    },
    select: {
      id: true, fullname: true,
      gravatar: true, username: true,
      bio: true,
    },
    skip: skip,
    take: take
  });

  return users;
}

async function getDbUsersPaginated(userId, skip, take = 20) {
  const users = await prisma.socialUser.findMany({
    where: {
      NOT: { id: userId },
    },
    select: {
      id: true, fullname: true,
      gravatar: true, username: true,
      bio: true,
      friendOf: {
        where: { userId: userId }, // current user follows them
        select: { id: true },
      },
      friends: {
        where: { friendId: userId }, // they follow current user
        select: { id: true },
      },
    },
    skip: skip,
    take: take
  });

  return users.map(user => ({
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    gravatar: user.gravatar,
    bio: user.bio,
    isFriend: user.friendOf.length > 0, // you follow them
    followsYou: user.friends.length > 0, // they follow you
  }));
}

async function getDbUserFollowersPaginated(currUserId, userId, skip, take = 20) {
  const [userDetails, followers] = await Promise.all([
    prisma.socialUser.findUnique({
      where: { id: userId },
      select: { id: true, fullname: true, username: true }
    }),
    prisma.socialUser.findMany({
      where: {
        friends: {
          some: { friendId: userId }
        }
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        gravatar: true,
        bio: true,
        friends: {
          where: { friendId: currUserId },
          select: { id: true },
        }
      },
      skip: skip,
      take: take
    })
  ])

  return {
    user: userDetails,
    followers: followers.map(user => ({
      id: user.id, fullname: user.fullname, username: user.username,
      gravatar: user.gravatar, bio: user.bio,
      followsYou: user.friends.length > 0 // they follow logged in user
    }))
  };
}

async function getDbUserFollowingPaginated(currUserId, userId, skip, take = 20) {
  const [userDetails, following] = await Promise.all([
    prisma.socialUser.findUnique({
      where: { id: userId },
      select: { id: true, fullname: true, username: true }
    }),
    prisma.socialUser.findMany({
      where: {
        friendOf: {
          some: { userId: userId }
        }
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        gravatar: true,
        bio: true,
        friends: {
          where: { friendId: currUserId },
          select: { id: true },
        }
      },
      skip: skip,
      take: take
    })
  ]);

  return {
    user: userDetails,
    following: following.map(user => ({
      id: user.id, fullname: user.fullname, username: user.username,
      gravatar: user.gravatar, bio: user.bio,
      followsYou: user.friends.length > 0 // they follow logged in user
    }))
  };
}

async function getUserProfileDetailsDb(userId) {
  const initial = await prisma.socialUser.findUnique({
    where: { id: userId },
    select: {
      id: true, fullname: true,
      username: true, gravatar: true,
      bio: true, createdAt: true,
      _count: {
        select: {
          posts: true, friendOf: true, friends: true
        }
      }
    }
  })
  const user = {
    ...initial,
    numPosts: initial._count.posts,
    numFollowing: initial._count.friends,
    numFollowers: initial._count.friendOf,
  };
  return user;
}

async function updateUserProfileDb(userId, fullname, username, gravatar, bio) {
  const updateUser = await prisma.socialUser.update({
    where: { id: userId, },
    data: {
      fullname: fullname,
      username: username,
      gravatar: gravatar,
      bio: bio
    }
  })
  return updateUser;
}


async function searchDbUsers(query) {
  const users = await prisma.socialUser.findMany({
    where: {
      OR: [
        { fullname: { contains: query, mode: 'insensitive' } },
        { username: { contains: query, mode: 'insensitive' } },]
    },
    select: {
      id: true, fullname: true, username: true, gravatar: true
    },
    take: 5
  })
  return users.map((user) => ({ ...user, type: 'user', key: crypto.randomUUID() }))
}


export {
  addNewFollowerDb, checkUserNowFollowsDb, getDbUserFollowersPaginated,
  getDbUserFollowingPaginated, getDbUsersPaginated, getLimitedNonFollowersDb,
  getUserProfileDetailsDb, removeExistingFollowerDb, searchDbUsers, updateUserProfileDb
};

