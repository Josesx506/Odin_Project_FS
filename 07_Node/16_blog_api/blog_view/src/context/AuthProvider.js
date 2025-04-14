'use client';

import { createContext, useLayoutEffect, useState } from "react";
import { axiosApi, setInterceptors } from "@/api/axios";
import { useEffect, useRef } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const interceptorsRef = useRef({ request: null, response: null });


  // Try to get a new access token on page load
  useEffect(() => {
    async function initAuth() {
      try {
        const res = await axiosApi.get('/v1/refresh');
        setAccessToken(res.data.accessToken);
      } catch (error) {
        // If refresh fails, that's okay - user will need to log in
        console.log("Initial auth refresh failed, user needs to log in", error);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  async function login(credentials) {
    const res = await axiosApi.post('/v1/auth/signin', credentials)
    setAccessToken(res.data.accessToken)
  }

  async function logout() {
    await axiosApi.get('/v1/auth/signout')
    setAccessToken(null)
  }

  async function refresh() {
    try {
      const res = await axiosApi.get('v1/refresh')
      setAccessToken(res.data.accessToken)
      return res.data.accessToken
    } catch (err) {
      setAccessToken(null)
      return null
    }
  }

  useLayoutEffect(() => {
    // Remove old interceptors for cleanup
    if (interceptorsRef.current.request !== null) {
      axiosApi.interceptors.request.eject(interceptorsRef.current.request);
    }
    if (interceptorsRef.current.response !== null) {
      axiosApi.interceptors.response.eject(interceptorsRef.current.response);
    }

    const { reqId, resId } = setInterceptors(() => accessToken, refresh)
    interceptorsRef.current.request = reqId;
    interceptorsRef.current.response = resId;

  }, [accessToken])

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refresh, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext;



  // useLayoutEffect(()=> {
  //   const authInterceptor = axiosApi.interceptors.request.use((config) => {
  //     config.headers.Authorization = !config._retry && accessToken 
  //       ? `Bearer ${accessToken}` 
  //       : config.headers.Authorization;
      
  //     return config;
  //   })

  //   return () => { axiosApi.interceptors.request.eject(authInterceptor) }
  // }, [accessToken])

  // useLayoutEffect(()=> {
  //   const refreshInterceptor = axiosApi.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const originalRequest = error.config;

  //       // error.response.status === 403 && error.response.data.message === 'Unauthorized'
  //       if (error.response.status === 401) {
  //         try {
  //           const newToken = await refresh();
  //           originalRequest.headers.Authorization = `Bearer ${newToken}`;
  //           originalRequest._retry = true;

  //           return axiosApi(originalRequest);
  //         } catch {
  //           setAccessToken(null);
  //         }
  //       }
  //     return Promise.reject(error);
  //   })

  //   return () => { axiosApi.interceptors.response.eject(refreshInterceptor) }
  // })