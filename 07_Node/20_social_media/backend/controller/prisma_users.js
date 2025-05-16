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

async function getLimitedNonFollowersDb(userId,  skip, take=5) {
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

async function getDbUsersPaginated(userId, skip, take=20) {
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



export {
  addNewFollowerDb, checkUserNowFollowsDb, getDbUsersPaginated, 
  getLimitedNonFollowersDb, removeExistingFollowerDb
};

