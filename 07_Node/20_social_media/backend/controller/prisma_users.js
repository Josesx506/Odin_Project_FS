import { prisma } from '../config/prisma.js';

async function addNewFollowerDb(currUserId, trgtUserId) {
  const added = await prisma.socialFriendship.create({
    data: {
      user: { connect: { id: trgtUserId } },
      friend: { connect: { id: currUserId } },
    }
  })
  return added;
}


async function removeExistingFollowerDb(currUserId, trgtUserId) {
  const removed = await prisma.socialFriendship.delete({
    where: {
      userId_friendId: {
        userId: trgtUserId,
        friendId: currUserId,
      }
    }
  })
  return removed;
}

async function getLimitedNonFollowersDb(userId, take=5) {
  const users = await prisma.socialUser.findMany({
    where: {
        NOT: { id: userId },
        friendOf: { none: { friendId: userId } },
        friends: { none: { friendId: userId } }
    },
    select: {
      id: true, fullname: true,
      gravatar: true, username: true,
      bio: true,
    },
    take: take
  });

  return users;
}



export { addNewFollowerDb, removeExistingFollowerDb, getLimitedNonFollowersDb }