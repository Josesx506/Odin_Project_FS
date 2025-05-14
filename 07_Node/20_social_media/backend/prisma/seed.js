import { seedUsers } from "./seedUsers.js";
import { seedPosts } from "./seedPosts.js"
import { prisma } from "../config/prisma.js";

async function seedAll() {
  const userCount = await prisma.socialUser.count();
  if (userCount === 0) {
    await seedUsers();
  }

  const postCount = await prisma.socialPost.count();
  if (postCount === 0) {
    await seedPosts();
  }
}

seedAll()
  .then(() => console.log(`All tables has been seeded successfully. 🌱`))
  .catch(err => console.error("Seeding failed:", err))
  .finally(async () => { await prisma.$disconnect() });