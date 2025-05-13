import { prisma } from '../config/prisma.js'

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


export { retrieveUserByEmail, retrieveUserById, updateUserDetailsByEmail }