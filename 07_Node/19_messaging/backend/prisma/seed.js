import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { prisma } from '../config/prisma.js';


async function seedUsers() {
  try {
    const knownUsers = [
      {
        name: "John Doe",
        email: "johndoe@odinchat.com",
        image: "https://i.pravatar.cc/200?u=test",
        bio: "System administrator",
        password: process.env.ADMIN_PSWD,
        role: "ADMIN"
      },
      {
        name: "Kassandra Alexios",
        email: "ply1@acodyssey.com",
        image: "https://i.pravatar.cc/200?u=admin",
        bio: "Kassandra armed with Leonidas spear vs. the Deimoses 🥷🏽",
        password: process.env.USER_PSWD
      }
    ];

    const generatedUsers = Array.from({ length: 48 }).map(() => ({
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      image: faker.image.avatar(),
      bio: faker.person.bio(),
      password: faker.internet.password({ length: 6 }) + 'A1$'
    }))

    const data = [...knownUsers, ...generatedUsers]

    const hashedData = await Promise.all(
      data.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    // Create many users
    const createdUsers = await prisma.chatUser.createMany({
      data: hashedData,
      skipDuplicates: true,
    });
    
    // Fetch all users
    const allUsers = await prisma.chatUser.findMany();
    const guestUser = allUsers.find(user => user.email === "ply1@acodyssey.com");
    if (!guestUser) throw new Error("Guest user not found");

    // ✅ Create global group conversation
    const globalChat = await prisma.chatConvo.create({
      data: {
        convoName: "global chat",
        isGroup: true,
        participants: {
          create: allUsers.map(user => ({ userId: user.id }))
        }
      }
    });

    // ✅ Randomly select 20 users to follow guest
    const followers = faker.helpers.shuffle(allUsers.filter(u => u.id !== guestUser.id)).slice(0, 20);
    console.log(followers)

    await Promise.all(
      followers.map(user =>
        prisma.chatFriendship.create({
          data: {
            user: { connect: { id: guestUser.id } },
            friend: { connect: { id: user.id } }
          }
        })
      )
    );

    console.log(`Created ${createdUsers.count} users`);
  } catch (err) {
    throw err;
  }
}

async function seedAll() {
  const userCount = await prisma.chatUser.count();
  if (userCount === 0) {
    await seedUsers();
  }
}

seedAll()
  .then(() => console.log(`User database has been seeded successfully. 🌱`))
  .catch(err => console.error("Seeding failed:", err))
  .finally(async () => { await prisma.$disconnect() });