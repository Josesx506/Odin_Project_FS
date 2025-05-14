'use server';

import axiosApi from '@/config/axios';
import axios from 'axios';

const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESSURL;

/**
 * Default data fetcher with inbuilt retry method when the access token expires
 * @param {*} url 
 * @param {*} options 
 * @returns 
 */
export default async function authFetch(url, options = {}) {
  try {
    console.log(url)
    const res = await axiosApi({
      url,
      method: options?.method || 'GET',
      data: options?.body,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      }
    });
    console.log('Responses is s',res)

    return res.data;

  } catch (err) {

    if (err.response?.status === 401) {
      try {
        // Refresh access token
        const rfRes = await axiosApi.get('/v1/auth/refresh', { withCredentials: true });
        console.log('refress',rfRes.response)

        if (rfRes.response?.status !== 200) {
          // throw new Error('Authentication failed');

        } else {
          // Retry original request after refresh
          // const retryRes = await axiosApi({
          //   url,
          //   method: options.method || 'GET',
          //   data: options.body,
          //   baseURL: EXPRESS_URL,
          //   withCredentials: true,
          //   headers: {
          //     'Content-Type': 'application/json',
          //     ...(options.headers || {}),
          //   },
          // });


          const retryRes = await axiosApi({
            url,
            method: options?.method || 'GET',
            data: options?.body,
            headers: {
              'Content-Type': 'application/json',
              ...(options?.headers || {}),
            },
            withCredentials: true
          });

          return retryRes.data;
        }

      } catch (error) {
        // console.log(error.response)
        // throw new Error('Token refresh failed');
      }
    }

    // throw err;
  }
}
