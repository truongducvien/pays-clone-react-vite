/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryOptions } from 'react-query';
import { useFetch, usePost } from './useReactQuery';
import { AxiosError } from 'axios';

export interface LogInPayload {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient?: boolean;
}

export interface LogInResponse {
  accessToken?: string | null;
  refreshToken?: string | null;
  userId?: number;
}

export interface User {
  id: 0;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  gender: string;
  dateOfBirth: string;
  avatarUrl: string;
  enableBiometric: true;
  countryCode: string;
}

const ENDPOINT = {
  LOG_IN: 'api/services/app/TokenAuth/Authenticate',
  USER_PROFILE: 'api/services/app/User/Profile',
};

export const useLogIn = () =>
  usePost<LogInPayload, LogInResponse>({
    endpoint: ENDPOINT.LOG_IN,
  });

export const useGetUserProfile = (
  params?: any,
  options?: UseQueryOptions<User, AxiosError, User, string | string[]>
) =>
  useFetch<User>({
    endpoint: ENDPOINT.USER_PROFILE,
    params,
    options,
  });
