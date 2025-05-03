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