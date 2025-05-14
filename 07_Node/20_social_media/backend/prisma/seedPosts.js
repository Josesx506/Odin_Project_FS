import { faker } from '@faker-js/faker';
import { fetchPostsAndComments } from './datafetch.js';
import 'dotenv/config';
import { prisma } from '../config/prisma.js';


async function seedPosts() {
  try {
    const users = await prisma.socialUser.findMany();
    if (users.length === 0) throw new Error("No users found. Seed users first.");

    // Fetch posts (with comments)
    const posts = await fetchPostsAndComments();

    for (const rawPost of posts) {
      const author = faker.helpers.arrayElement(users);

      // Create the post
      const createdPost = await prisma.socialPost.create({
        data: {
          body: rawPost.body,
          authorId: author.id,
        }
      });

      const otherUsers = users.filter(u => u.id !== author.id);

      // --- Post Views (1 - users.length)
      const viewCount = faker.number.int({ min: 1, max: otherUsers.length });
      const viewers = faker.helpers.shuffle(otherUsers).slice(0, viewCount);

      await Promise.all(
        viewers.map(user =>
          prisma.postView.create({
            data: { userId: user.id, postId: createdPost.id }
          })
        )
      );

      // --- Post Likes (10–30)
      const likeCount = faker.number.int({ min: 10, max: 30 });
      const likers = faker.helpers.shuffle(otherUsers).slice(0, likeCount);

      await Promise.all(
        likers.map(user =>
          prisma.postLike.create({
            data: { userId: user.id, postId: createdPost.id } })
        )
      );

      // --- Add real comments from the API
      if (Array.isArray(rawPost.comments)) {
        for (const apiComment of rawPost.comments) {
          // Select a random author
          const commentAuthor = faker.helpers.arrayElement(users);

          const createdComment = await prisma.socialComment.create({
            data: {
              body: apiComment.body,
              authorId: commentAuthor.id,
              postId: createdPost.id
            }
          });

          // --- Random comment likes (0–10)
          const clikeCount = faker.number.int({ min: 0, max: 10 });
          const clikers = faker.helpers.shuffle(users.filter(u => u.id !== commentAuthor.id)).slice(0, clikeCount);

          await Promise.all(
            clikers.map(user =>
              prisma.commentLike.create({
                data: { userId: user.id, commentId: createdComment.id }
              }) )
          );
        }
      }

    }
    console.log(`Seeded ${posts.length} posts with dummy json comments, views, and likes. 🌱`);

  } catch (err) {
    console.error("Seeding posts failed:", err);
    throw err;
  }
}

export { seedPosts }