'use client';

import { createContext, useState } from "react";
import { axiosApi, setInterceptors } from "@/api/axios";
import { useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  
  const [accessToken, setAccessToken] = useState(null)

  const login = async (credentials) => {
    const res = await axiosApi.post('/v1/auth/signin', credentials)
    setAccessToken(res.data.accessToken)
  }

  const logout = async () => {
    await axiosApi.post('/v1/auth/signout')
    setAccessToken(null)
  }

  const refresh = async () => {
    try {
      const res = await axiosApi.post('v1/refresh')
      setAccessToken(res.data.accessToken)
      return res.data.accessToken
    } catch (err) {
      setAccessToken(null)
      return null
    }
  }

  useEffect(() => {
    setInterceptors(() => accessToken, refresh)
  }, [accessToken])

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext;