import { prisma } from "../../config/prisma.js";


async function createUser(username, email, hashedPassword) {
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

export {
    createUser, retrieveUserByEmail, retrieveUserById, 
    retrieveUserByToken, updateRefreshToken
};
