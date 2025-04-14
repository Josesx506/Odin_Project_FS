import axios from 'axios';

const EXPRESS_URL="http://localhost:8300";

const axiosApi = axios.create({
    baseURL: EXPRESS_URL,
    withCredentials: true
})

// For interceptor
function setInterceptors(getAccessToken, refreshToken) {
  let refreshAttempts = 0;
  const MAX_REFRESH_ATTEMPTS = 2;

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
      
      // ⛔️ Prevent infinite loop: Prevent retries from the refresh endpoint
      if (originalRequest.url.includes('/refresh')) {
        return Promise.reject(err);
      }

      if (
        err.response?.status === 401 && 
        !originalRequest._retry  &&
        refreshAttempts < MAX_REFRESH_ATTEMPTS
      ) {
        originalRequest._retry = true;
        refreshAttempts += 1;

        const newToken = await refreshToken()
        
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosApi(originalRequest)
        }
      }
      return Promise.reject(err)
    });
  
  return { reqId, resId };
}

export { axiosApi,setInterceptors }