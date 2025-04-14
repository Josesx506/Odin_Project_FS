import axios from 'axios';

const EXPRESS_URL="http://localhost:8300";

const axiosApi = axios.create({
    baseURL: EXPRESS_URL,
    withCredentials: true
})

// For interceptor
function setInterceptors(getAccessToken, refreshToken) {
    axiosApi.interceptors.request.use(async (config) => {
      const token = getAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  
    axiosApi.interceptors.response.use(
      res => res,
      async err => {
        const originalRequest = err.config
        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const newToken = await refreshToken()
          if (newToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
            return axiosApi(originalRequest)
          }
        }
        return Promise.reject(err)
      }
    )
}

export { axiosApi,setInterceptors }