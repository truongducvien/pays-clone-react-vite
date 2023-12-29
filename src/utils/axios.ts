import { API_URL } from '@/config';
import { REQUEST_TIMEOUT } from '@/constants';
import { getSessionStorage, removeSessionStorage, setSessionStorage } from '@/utils';
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

let isRefreshingToken = false;

const waitRefreshToken = (retry: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isRefreshingToken && retry > 0) {
        resolve(waitRefreshToken(retry - 1));
      } else {
        resolve(true);
      }
    }, 1000);
  });
};

axiosInstance.interceptors.request.use(async (config) => {
  if (isRefreshingToken) {
    await waitRefreshToken(REQUEST_TIMEOUT / 1000);
  }

  const accessToken = getSessionStorage('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => ({
    ...response,
    data: response?.data?.result || response?.data,
  }),
  async (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).retry = true; // Retry will be used in react-query options. Check in App.tsx
    try {
      if (error.response?.status === 401) {
        // Refresh token:
        isRefreshingToken = true;
        const accessToken = getSessionStorage('accessToken');
        const refreshToken = getSessionStorage('refreshToken');
        const result = await axios.post(`${API_URL}/api/services/app/TokenAuth/RefreshToken`, {
          accessToken,
          refreshToken,
        });
        setSessionStorage('accessToken', result.data.result.accessToken);
        setSessionStorage('refreshToken', result.data.result.refreshToken);
        if (error.config?.method?.toLowerCase() !== 'get') {
          return axiosInstance(error.config || {});
        }
      }
    } catch (error) {
      window.open('/');
      removeSessionStorage('accessToken');
      removeSessionStorage('refreshToken');
    } finally {
      isRefreshingToken = false;
    }
  }
);

const handleAxiosError = (error: AxiosError<ErrorResponse>) => {
  toast(error.response?.data.error.message, {
    type: 'error',
    hideProgressBar: true,
    autoClose: 3000,
  });
};

export { axiosInstance, handleAxiosError };
