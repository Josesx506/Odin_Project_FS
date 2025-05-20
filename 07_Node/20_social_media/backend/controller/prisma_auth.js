import { prisma } from '../config/prisma.js';

async function createUserWithoutRole(fullname, username, email, hashedPassword) {
  const user = await prisma.socialUser.create({
    data: {
      fullname: fullname,
      username: username.toLowerCase(),
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
      githubotp: profile.otp
    },
    create: {
      email,
      fullname: profile.displayName || 'Github User',
      username: profile.username,
      gravatar: profile.photos?.[0]?.value || profile?._json?.avatar_url,
      bio: profile?._json?.bio,
      githubotp: profile.otp
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

async function retrieveUserByOTP(otp) {
  const user = await prisma.socialUser.findFirst({
    where: {
      githubotp: otp
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

async function removeOneTimePassword(id) {
  const user = await prisma.socialUser.update({
    where: { id: id },
    data: { githubotp: null }
  })
  return user;
}


export {
  createUserWithoutRole, removeOneTimePassword, retrieveUserByEmail, retrieveUserByOTP,
  retrieveUserById, retrieveUserByToken, updateRefreshToken, updateUserDetailsByEmail
};

