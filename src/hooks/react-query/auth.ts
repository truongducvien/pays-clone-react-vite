import { LogInPayload, LogInResponse, logIn } from '@/api/auth';
import { ErrorResponse } from '@/utils';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const LOGIN_KEY = 'logIn';

const useLogIn = (
  options?: UseMutationOptions<LogInResponse, AxiosError<ErrorResponse>, LogInPayload>
) =>
  useMutation<LogInResponse, AxiosError<ErrorResponse>, LogInPayload>({
    mutationKey: [LOGIN_KEY],
    mutationFn: logIn,
    ...options,
  });

export { LOGIN_KEY, useLogIn };
