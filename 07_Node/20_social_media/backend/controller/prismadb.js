import { prisma } from '../config/prisma.js';

async function createUserWithoutRole(username, email, hashedPassword) {
  const user = await prisma.socialUser.create({
    data: {
      username: username,
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
  const user = await prisma.socialUser.findFirst({
    where: {
      email: email.toLowerCase()
    }
  })
  return user;
}

async function retrieveUserById(id) {
  const user = await prisma.socialUser.findUnique({
    where: {
      id: id
    }
  })
  return user;
}

async function updateUserDetailsByEmail(email, profile) {
  const user = await prisma.socialUser.upsert({
    where: { email },
    update: {
      username: profile.username,
      gravatar: profile.photos?.[0]?.value || profile?._json?.avatar_url,
    },
    create: {
      email,
      username: profile.username,
      gravatar: profile.photos?.[0]?.value || profile?._json?.avatar_url,
    },
  });
  return user;
}

async function retrieveUserByToken(refreshToken) {
  const user = await prisma.socialUser.findFirst({
    where: {
      token: refreshToken
    }
  })
  return user;
}

async function updateRefreshToken(id, token) {
  const user = await prisma.socialUser.update({
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
  createUserWithoutRole, retrieveUserByEmail, retrieveUserById, retrieveUserByToken, updateRefreshToken, updateUserDetailsByEmail
};

