import axios from 'axios';

const EXPRESS_URL="http://localhost:8300";

const axiosApi = axios.create({
    baseURL: EXPRESS_URL,
    withCredentials: true
})

// For interceptor
function setInterceptors(getAccessToken, refreshToken) {
    const reqId = axiosApi.interceptors.request.use(async (config) => {
      const token = getAccessToken()
      console.log("\n\n\nRequest with token:", token ? "Token exists" : "No token","\n\n\n");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  
    const resId = axiosApi.interceptors.response.use(
      res => res,
      async err => {
        const originalRequest = err.config
        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const newToken = await refreshToken()
          if (newToken) {
            // axiosApi.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return axiosApi(originalRequest)
          }
        }
        return Promise.reject(err)
      }
    );
    return { reqId, resId };
}

export { axiosApi,setInterceptors }