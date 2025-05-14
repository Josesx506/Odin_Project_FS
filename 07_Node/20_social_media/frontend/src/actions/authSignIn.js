'use server';

import axiosApi from "@/config/axios";

async function getGitHubRoute() {
    const route = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;
    return route;
}

export { getGitHubRoute }