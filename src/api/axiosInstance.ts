import { API_URL } from '@/config';
import { REQUEST_TIMEOUT } from '@/constants';
import { getSessionStorage } from '@/utils';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getSessionStorage('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default axiosInstance;
