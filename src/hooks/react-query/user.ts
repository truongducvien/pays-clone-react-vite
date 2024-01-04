import { AccountResponse, UserResponse, getUserAccount, getUserProfile } from '@/api/user';
import { ErrorResponse, handleAxiosError } from '@/utils';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const USER_PROFILE_KEY = 'userProfile';
const USER_ACCOUNT_KEY = 'userAcoount';

const useGetUserProfile = (options?: UseQueryOptions<UserResponse, AxiosError<ErrorResponse>>) =>
  useQuery<UserResponse, AxiosError<ErrorResponse>>({
    queryKey: [USER_PROFILE_KEY],
    queryFn: getUserProfile,
    throwOnError: handleAxiosError,
    ...options,
  });

const useGetUserAccount = (options?: UseQueryOptions<AccountResponse, AxiosError<ErrorResponse>>) =>
  useQuery<AccountResponse, AxiosError<ErrorResponse>>({
    queryKey: [USER_ACCOUNT_KEY],
    queryFn: getUserAccount,
    throwOnError: handleAxiosError,
    ...options,
  });

export { USER_PROFILE_KEY, USER_ACCOUNT_KEY, useGetUserProfile, useGetUserAccount };
