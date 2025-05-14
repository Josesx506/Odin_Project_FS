async function fetchPostsAndComments() {
  try {
    // Fetch posts and comments concurrently
    const [postsResponse, commentsResponse] = await Promise.all([
      fetch('https://dummyjson.com/posts?limit=251'),
      fetch('https://dummyjson.com/comments?limit=340')
    ]);

    const postsData = await postsResponse.json();
    const commentsData = await commentsResponse.json();

    // Create a map of postId to comments array
    const commentsByPostId = {};
    commentsData.comments.forEach(comment => {
      if (!commentsByPostId[comment.postId]) {
        commentsByPostId[comment.postId] = [];
      }
      // Only store comment body
      commentsByPostId[comment.postId].push({
        body: comment.body
      });
    });

    // Create simplified post objects with body and matching comments
    const result = postsData.posts.map(post => ({
      body: post.body,
      comments: commentsByPostId[post.id] || []
    }));

    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { fetchPostsAndComments }