import { prisma } from "../../config/prisma.js";
import { PrismaCustomError } from "../utils/errors.js";

async function createUserWithoutRole(username, email, hashedPassword) {
  const user = await prisma.chatUser.create({
    data: {
      name: username,
      email: email.toLowerCase(),
      password: hashedPassword
    },
    select: {
      id: true,
      email: true
    }
  })
  return user;
}

async function createUserWithRole(username, email, hashedPassword, role) {
  const user = await prisma.chatUser.create({
    data: {
      name: username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role.toUpperCase()
    },
    select: {
      id: true,
      email: true
    }
  })
  return user;
}

async function retrieveUserByEmail(email) {
  const user = await prisma.chatUser.findFirst({
    where: {
      email: email.toLowerCase()
    }
  })
  return user;
}

async function retrieveUserById(id) {
  const user = await prisma.chatUser.findUnique({
    where: {
      id: id
    }
  })
  return user;
}

async function retrieveUserByToken(refreshToken) {
  const user = await prisma.chatUser.findFirst({
    where: {
      token: refreshToken
    }
  })
  return user;
}

async function updateRefreshToken(id, token) {
  const user = await prisma.chatUser.update({
    where: {
      id: id
    },
    data: {
      token: token
    }
  })
  return user;
}

// COMMUNITY SYNTAX
async function getAllUsers(userId) {
  const users = await prisma.chatUser.findMany({
    select: {
      id: true, name: true,
      image: true, bio: true,
      friends: {
        where: {
          friendId: userId
        }
      },
      friendOf: {
        where: {
          userId: userId
        }
      }
    }
  });
  // Include a boolean for whether a user is friends with anyone in the community
  const friendRelations = users.map(user => ({
    id: user.id,
    name: user.name,
    image: user.image,
    bio: user.bio,
    isFriend: user.friends.length > 0,
    followsYou: user.friendOf.length > 0
  })).filter(user => user.id !== userId);

  return friendRelations;
}

// FRIENDSHIP SYNTAX
async function addNewFriend(currUserId, trgtUserId) {
  const added = await prisma.chatFriendship.create({
    data: {
      user: { connect: { id: trgtUserId } },
      friend: { connect: { id: currUserId } },
    }
  })
  return added;
}

async function removeExistingFriend(currUserId, trgtUserId) {
  const removed = await prisma.chatFriendship.delete({
    where: {
      userId_friendId: {
        userId: trgtUserId,
        friendId: currUserId,
      }
    }
  })
  return removed;
}

// CONVERSATION SYNTAX
async function createGroupConversation(authorId, grpName) {
  const convo = await prisma.chatConvo.create({
    data: {
      convoName: grpName,
      isGroup: true,
      participants: {
        create: { userId: authorId }
      }
    },
    select: {
      id: true, convoName: true,
      _count: { select: { participants: true } }
    }
  })
  const group = { id: convo.id, convoName: convo.convoName, size: convo._count.participants }
  return group;
}

async function findGroupConvoByName(grpName) {
  const exist = await prisma.chatConvo.findFirst({
    where: { convoName: grpName, isGroup: true }
  })
  return exist;
}

async function getAllGroupConversations() {
  const convos = await prisma.chatConvo.findMany({
    where: { isGroup: true },
    select: {
      id: true, convoName: true,
      _count: { select: { participants: true } }
    }
  })
  const groups = convos.map(convo => ({
    id: convo.id,
    convoName: convo.convoName,
    size: convo._count.participants
  }));
  return groups;
}

async function getAllUserFriends(userId) {
  const friends = await prisma.chatUser.findUnique({
    where: { id: userId },
    select: {
      friends: {
        select: { friend: { select: { id: true, name: true, image: true } } }
      },
      friendOf: {
        select: { user: { select: { id: true, name: true, image: true } } }
      }
    }
  });

  const allFriends = [
    ...friends.friends.map(f => f.friend),
    ...friends.friendOf.map(f => f.user)
  ];

  return allFriends
}

async function getAllUserConversations(userId) {
  const conversations = await prisma.chatConvoParticipant.findMany({
    where: { userId },
    include: {
      conversation: {
        include: {
          participants: {
            include: { user: { select: { id: true, name: true, image: true } } }
          },
          messages: {
            orderBy: { createdAt: 'desc' }, take: 1
          }
        }
      }
    }
  });
  
  const namedConvos = conversations.map((convo) => {
    const conv = convo.conversation;
    const otherUser = conv.isGroup ? null : conv.participants.find(p => p.user.id !== userId)?.user;

    return {
      id: conv.id,
      otherUserId: otherUser?.id,
      name: conv.isGroup ? conv.convoName : otherUser?.name || "Unknown",
      image: otherUser?.image || null,
      isGroup: conv.isGroup,
      lastMessage: conv.messages?.[0]?.body || null
    };
  });
  
  return namedConvos;
}

async function createSingleConversation(authorId, trgtUserId) {
  const exists = await prisma.chatConvo.findFirst({
    where: {
      isGroup: false,
      participants: {
        every: {
          userId: { in: [authorId, trgtUserId] }
        }
      }
    },
    include: {
      participants: { select: { id: true } }
    }
  })

  if (exists && exists.participants.length === 2) { return exists.id }

  const newConvo = await prisma.chatConvo.create({
    data: {
      participants: {
        create: [{ userId: authorId }, { userId: trgtUserId }]
      }
    },
  })

  return newConvo.id;
}


async function getConversationMessages(conversationId, userId) {
  const messages = await prisma.chatConvo.findFirst({
    where: {
      id: conversationId,
      participants: { some: { userId: userId } }
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, name: true, image: true, }
          }
        }
      },
      messages: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!messages) {
    throw new PrismaCustomError("Conversation messages not found", "P2025")
  } else {
    const otherUser = messages.isGroup ? null : messages.participants.find(p => p.user.id !== userId)?.user;
    let details = {
      metadata: {
        convoId: conversationId,
        convoName: messages.isGroup ? messages.convoName : otherUser.name || "Unknown",
        image: otherUser?.image || null,
        otherUserId: messages.isGroup ? null : otherUser.id,
        isGroup: messages.isGroup
      },
      messages: messages.messages
    }

    return details;
  }
}

async function joinGroupConversation(conversationId, newMemberId) {
  const convo = await prisma.chatConvo.findFirst({
    where: { 
      id: conversationId, isGroup: true,
      participants: {
        none: { userId: newMemberId }
      } },
  })

  if (!convo) { throw new PrismaCustomError("Invalid group join request", "P2025") };
  if (!convo.isGroup) { throw new PrismaCustomError("Cannot add members to a non-group conversation", "P2018") };

  // Add new participant and count the new size of the group in one transaction
  const [newParticipant, groupMemberSize] = await prisma.$transaction([
    prisma.chatConvoParticipant.create({
      data: {
        user: { connect: { id: newMemberId } },
        conversation: { connect: { id: conversationId } }
      }
    }),
    prisma.chatConvoParticipant.count({
      where: { conversationId }
    })
  ]);

  return groupMemberSize;
}

async function createNewMessage(conversationId, authorId, message) {
  const msg = await prisma.chatMessage.create({
    data: {
      body: message,
      conversation: { connect: { id: conversationId } },
      author: { connect: { id: authorId } }
    }
  })
  return msg;
}



export {
  addNewFriend, createGroupConversation, createNewMessage, createSingleConversation,
  createUserWithoutRole, createUserWithRole, findGroupConvoByName, getAllGroupConversations,
  getAllUserConversations, getAllUserFriends, getAllUsers, getConversationMessages,
  joinGroupConversation, removeExistingFriend, retrieveUserByEmail, retrieveUserById,
  retrieveUserByToken, updateRefreshToken
};

