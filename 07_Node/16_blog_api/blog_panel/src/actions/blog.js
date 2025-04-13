'use server';

import { revalidatePath } from 'next/cache';

export default async function deleteBlogPost(id) {
  const path = `/${id}`;
  console.log("Executing delete request for ", path);
  try {
    // const resp = await fetch(`https:test.com`, {
    //     method: 'DELETE',
    // })

    // if (!resp.ok) {
    //     throw new Error('Failed to delete blog')
    // }
    console.log("running server action");
    revalidatePath('/');
    return { success: true }
  } catch(err) {
    return { success: false, error: err.message }
  }
}
