'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

function getApiPrefix() {
    const headersList = headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    
    // Construct an absolute URL
    const apiPrefix = `${protocol}://${host}`;

    return apiPrefix
}

// /api/registerImage
async function registerImageAction(formData) {
    try {
        const prefix = getApiPrefix()

        const response = await fetch(`${prefix}/api/registerImage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();

        return {
            success: response.ok,
            message: response.ok ? 'Image registered successfully!' : data?.message || 'Image registration failed'
        };
      } catch (error) {
        console.error('Server action error:', error);
        return {
          success: false,
          message: error.message || 'An unexpected error occurred'
        };
    }
}

export { registerImageAction }