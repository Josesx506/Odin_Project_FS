'use server';

async function getGitHubClientId() {
  return process.env.CLIENT_ID
}

async function getGitHubOAuth() {
  const route = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;
  return route;
}

export { getGitHubOAuth, getGitHubClientId }