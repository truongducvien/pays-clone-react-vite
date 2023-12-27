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

export const logIn = async (data: LogInPayload): Promise<LogInResponse> => {
  const res = await axiosInstance.post(ENDPOINT.LOG_IN, data);
  return res?.data.result;
};
