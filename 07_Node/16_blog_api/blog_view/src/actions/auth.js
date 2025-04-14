'use server';

import { revalidatePath } from 'next/cache';
// import localforage from 'localforage';

async function registerUserAction(body,author=false) {
  const user = body;
  if (author) { user["role"] = "AUTHOR" };
  
  try {
    const resp = await fetch(`${process.env.EXPRESS_URL}/v1/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: "include"
    })

    const data = await resp.json();

    if (!resp.ok) {
      return { success: false, error: data?.message || 'Failed to create user' };
    }
    
    return { success: true, message: 'User registered successfully!' };
  
  } catch(err) {
    return { success: false, error: err.message }
  }
}

async function signUserInAction(body) {
  const user = body;
  try {
    const resp = await fetch(`${process.env.EXPRESS_URL}/v1/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: "include"
    })

    const data = await resp.json();

    if (!resp.ok) {
      return { success: false, error: data?.message || 'Invalid Credentials' };
    }

    return { success: true, token: data.token };
  
  } catch(err) {
    return { success: false, error: err.message }
  }
}


export { registerUserAction,signUserInAction }