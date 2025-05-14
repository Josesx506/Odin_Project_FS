'use server'

import axios from 'axios';

const EXPRESS_URL=process.env.NEXT_PUBLIC_EXPRESSURL;

const axiosApi = axios.create({
    baseURL: EXPRESS_URL,
    withCredentials: true
})

export default axiosApi;