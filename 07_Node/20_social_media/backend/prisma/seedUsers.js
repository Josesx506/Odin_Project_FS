import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { prisma } from '../config/prisma.js';


async function seedUsers() {
  try {
    const knownUsers = [
      {
        fullname: "Victor Blaize",
        email: "vickyblaize@odinbook.com",
        gravatar: "https://i.pravatar.cc/200?img=56",
        bio: "Ready User 001 🚀",
        password: process.env.GUEST_PSWD,
      }
    ];

    const generatedUsers = Array.from({ length: 49 }).map(() => ({
      fullname: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      gravatar: faker.image.avatar(),
      bio: faker.person.bio(),
      password: faker.internet.password({ length: 8 }) + 'A1$'
    }))

    const data = [...knownUsers, ...generatedUsers]

    const hashedData = await Promise.all(
      data.map(async (user) => ({
        ...user,
        username: faker.internet.username({
          firstName: user.fullname.split(' ')[0],
          lastName: user.fullname.split(' ').pop()
        }).toLowerCase(),
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    // Create many users
    const createdUsers = await prisma.socialUser.createMany({
      data: hashedData,
      skipDuplicates: true,
    });

    // Fetch all users
    const allUsers = await prisma.socialUser.findMany();
    const guestUser = allUsers.find(user => user.email === "vickyblaize@odinbook.com");
    if (!guestUser) throw new Error("Guest user not found");

    // ✅ Randomly select 20 users to follow guest
    const followers = faker.helpers.shuffle(allUsers.filter(u => u.id !== guestUser.id)).slice(0, 20);

    await Promise.all(
      followers.map(user =>
        prisma.socialFriendship.create({
          data: {
            user: { connect: { id: user.id } },
            friend: { connect: { id: guestUser.id } }
          }
        })
      )
    );

    // 🔁 Each user gets 1–10 unique followers (excluding themselves)
    for (const user of allUsers) {
      const possibleFollowers = allUsers.filter(u => u.id !== user.id);
      const numberOfFollowers = faker.number.int({ min: 4, max: 30 });
      const selectedFollowers = faker.helpers.shuffle(possibleFollowers).slice(0, numberOfFollowers);

      for (const follower of selectedFollowers) {
        // Check if friendship already exists
        const exists = await prisma.socialFriendship.findUnique({
          where: {
            userId_friendId: {
              userId: follower.id,
              friendId: user.id,
            },
          },
        });

        if (!exists) {
          await prisma.socialFriendship.create({
            data: {
              user: { connect: { id: follower.id } },
              friend: { connect: { id: user.id } },
            },
          });
        }
      }
    }
    
    console.log(`User database has been seeded successfully with ${createdUsers.count} users. 🌱`)
  } catch (err) {
    throw err;
  }
}

export { seedUsers };

