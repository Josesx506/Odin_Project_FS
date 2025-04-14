import axios from 'axios';

const axsapi = axios.create({
    baseURL: process.env.EXPRESS_URL
})

export default axsapi;