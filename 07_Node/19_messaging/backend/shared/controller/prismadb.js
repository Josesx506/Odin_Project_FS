import { prisma } from "../../config/prisma.js";


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

export {
  createUserWithoutRole, createUserWithRole, retrieveUserByEmail,
  retrieveUserById, retrieveUserByToken, updateRefreshToken
};

