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

// FRIENDSHIP SYNTAX
async function addNewFriend(currUserId, trgtUserId) {
  const added = await prisma.chatFriendship.create({
    data: {
      user: { connect: { id: currUserId } },
      friend: { connect: { id: trgtUserId } },
    }
  })
  return added;
}

async function removeExistingFriend(currUserId, trgtUserId) {
  const removed = await prisma.chatFriendship.delete({
    where: {
      userId_friendId: {
        userId: currUserId,
        friendId: trgtUserId,
      }
    }
  })
  return removed;
}

// CONVERSATION SYNTAX
async function createSingleConversation(authorId, trgtUserId) {
  const convo = await prisma.chatConvo.create({
    data: {
      participants: {
        create: [ { id: authorId }, { id: trgtUserId } ]
      }
    },
    include: { participants: true },
  })
  return convo;
}

async function createGroupConversation(authorId, grpName) {
  const convo = await prisma.chatConvo.create({
    data: {
      convoName: grpName,
      isGroup: true,
      participants: {
        create: [ { id: authorId } ]
      }
    }
  })
  return convo;
}

async function joinGroupConversation(conversationId, newMemberId) {
  const convo = await prisma.chatConvo.findFirst({
    where: { id: conversationId, isGroup: true }
  })

  if (!convo) { throw new PrismaCustomError("Conversation not found", "P2025")};
  if (!convo.isGroup) { throw new PrismaCustomError("Cannot add members to a non-group conversation", "P2018")};

  // Check if the user is already a participant
  const existingParticipant = await prisma.chatConvoParticipant.findUnique({
    where: {
      userId_conversationId: {
        conversationId: conversationId, 
        userId: newMemberId, 
      }
    }
  })
  if (existingParticipant) { throw new PrismaCustomError("User is already a member of this conversation", "P2018")};

  // Add new participant
  const newParticipant = await prisma.chatConvoParticipant.create({
    data: {
      user: { connect: { id: newMemberId } },
      conversation: { connect: { id: conversationId } }
    },
    include: {
      user: { select: { id: true, name: true } }
    }
  })

  return newParticipant;
}

async function findUserConversations(userId) {
  const conversations = await prisma.chatConvo.findMany({
    where: {
      participants: { 
        some: { userId: userId }}
    },
    // Join the participants and messages table to get most recent messages
    include: {
      participants: {
        select: { user: { 
          select: { id: true, name: true }
        } }
      },
      messages: { 
        orderBy: { createdAt: 'desc' }, take: 1 }
    },
    orderBy: { updatedAt: 'desc' } // Sort the conversations
  })

  return conversations;
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
  createUserWithoutRole, createUserWithRole, joinGroupConversation, removeExistingFriend,
  retrieveUserByEmail, retrieveUserById, retrieveUserByToken, findUserConversations,
  updateRefreshToken
};

