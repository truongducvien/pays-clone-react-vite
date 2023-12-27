import { API_URL } from '@/config';
import { REQUEST_TIMEOUT } from '@/constants';
import { getSessionStorage } from '@/utils';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export interface ErrorResponse {
  error: {
    code: number;
    details: string;
    errorCode: string;
    message: string;
  };
  success: true;
  unAuthorizedRequest: false;
}

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

const handleAxiosError = (error: AxiosError<ErrorResponse>) => {
  toast(error.response?.data.error.message, {
    type: 'error',
    hideProgressBar: true,
    autoClose: 3000,
  });
};

export { axiosInstance, handleAxiosError };
