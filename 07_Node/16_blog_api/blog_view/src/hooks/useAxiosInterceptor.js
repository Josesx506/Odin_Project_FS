'use client';

import { axiosPrivate } from "@/api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(()=>{
      // Use token from login
      const reqIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.token}`
            }
            return config;  
        }, (error) => Promise.reject(error)
      )

    //   Use refresh token
      const respIntercept  = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            // Retry only once to prevent infinite loop
            if (error.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                // Update the request with the new access token
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
      )
      return () => {
        // Clean up function to remove interceptors
        axiosPrivate.interceptors.request.eject(reqIntercept)
        axiosPrivate.interceptors.response.eject(respIntercept)
      }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate