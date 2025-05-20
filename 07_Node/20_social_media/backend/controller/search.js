import { searchDbUsers } from "./prisma_users.js";
import { searchDbPosts } from "./prisma_posts.js";

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function searchUsersAndPosts(req, res) {
  const query = req.body?.query?.toLowerCase() || "";
  if (query==="") {
    return res.status(400).json({message: "Empty search query"})
  }
  try {
    const [users, posts] = await Promise.all(
      [searchDbUsers(query), searchDbPosts(query)]
    )
    const results = shuffleArray([...users, ...posts]);
    if (results.length===0) {
      return res.status(200).json({message:'No matching results', results})
    } 
    return res.status(200).json({message:'top 10 results', results})
  } catch(err) {
    res.status(500).json({message: err.message || 'Internal server error'})
  }
}

export { searchUsersAndPosts }