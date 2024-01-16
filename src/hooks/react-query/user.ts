import {
  AccountResponse,
  UserResponse,
  UserByRoleParams,
  getUserAccount,
  getUsersByRole,
  getUserProfile,
  UserByRoleResponse,
} from '@/api/user';
import { ErrorResponse, handleAxiosError } from '@/utils';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const USER_PROFILE_KEY = 'userProfile';
const USER_ACCOUNT_KEY = 'userAcount';
const USER_BY_ROLE_KEY = 'userByRole';

const useGetUserProfile = (
  options?: Partial<UseQueryOptions<UserResponse, AxiosError<ErrorResponse>>>
) =>
  useQuery({
    queryKey: [USER_PROFILE_KEY],
    queryFn: getUserProfile,
    throwOnError: (error) => {
      handleAxiosError(error);
      return false;
    },
    ...options,
  });

const useGetUserAccount = (
  options?: Partial<UseQueryOptions<AccountResponse, AxiosError<ErrorResponse>>>
) =>
  useQuery({
    queryKey: [USER_ACCOUNT_KEY],
    queryFn: getUserAccount,
    throwOnError: (error) => {
      handleAxiosError(error);
      return false;
    },
    ...options,
  });

const useGetUsersByRole = (
  params: UserByRoleParams,
  options?: Partial<UseQueryOptions<UserByRoleResponse, AxiosError<ErrorResponse>>>
) =>
  useQuery({
    queryKey: [USER_BY_ROLE_KEY, params],
    queryFn: () => getUsersByRole(params),
    throwOnError: (error) => {
      handleAxiosError(error);
      return false;
    },
    ...options,
  });

export {
  USER_PROFILE_KEY,
  USER_ACCOUNT_KEY,
  useGetUserProfile,
  useGetUserAccount,
  useGetUsersByRole,
};
