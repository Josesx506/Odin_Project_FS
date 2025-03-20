import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// Create a new user - Run inside `async` function
// const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//       posts: {
//         create: { title: 'Join us for Prisma Day 2020' },
//       },
//     },
// })
// 
// const post = await prisma.post.create({
//     data: {
//         title: 'This is a Prisma tutorial',
//       content: 'Setting up prisma db is not as easy as it sounds',
//       published: true,
//     },
// })

const allUsers = await prisma.user.findMany();
console.log(allUsers);

// Find all users and join the query with the posts table
const allUserPosts = await prisma.user.findMany({
    include: { posts: true },
})
console.log(allUserPosts);


// Find all posts that contain the word prisma
// Run inside `async` function
const filteredPosts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: 'prisma' } },
        { content: { contains: 'prisma' } },
      ],
    },
})
console.log(filteredPosts);

// Create a combined query that defines entries in the users and post tables
const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.odin',
      posts: {
        create: { title: 'Join us for Prisma Day 2020' },
      },
    },
})

// Update an existing entry
const post = await prisma.post.update({
    where: { id: 2 },
    data: { published: true },
})
console.log(post);