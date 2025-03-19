import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// Create a new user - Run inside `async` function
const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Join us for Prisma Day 2020' },
      },
    },
})

const allUsers = await prisma.user.findMany();
console.log(allUsers);

// Find all users and join the query with the posts table
const allUserPosts = await prisma.user.findMany({
    include: { posts: true },
})
console.log(allUserPosts)