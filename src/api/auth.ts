import { LOG_IN } from '@/constants';
import { axiosInstance } from '@/utils';

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

export const logIn = async (data: LogInPayload): Promise<LogInResponse> => {
  const res = await axiosInstance.post(LOG_IN, data);
  return res?.data;
};
