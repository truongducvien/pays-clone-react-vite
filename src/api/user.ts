import { axiosInstance } from '@/utils';

export interface UserResponse {
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

export interface AccountResponse {
  id: 0;
  userName: string;
  name: string;
  emailAddress: string;
  countryCode: string;
  phoneNumber: string;
  createdDate: string;
  gender: string;
  dateOfBirth: string;
  permissionList: [string];
  roleList: [string];
  isActive: true;
}

export const USER_ENDPOINT = {
  USER_PROFILE: 'api/services/app/User/Profile',
  ACCOUNT_INFO: 'api/services/app/Account/GetCurrentUserInfo',
};

export const getUserProfile = async (): Promise<UserResponse> => {
  const res = await axiosInstance.get(USER_ENDPOINT.USER_PROFILE);
  return res?.data;
};

export const getUserAccount = async (): Promise<AccountResponse> => {
  const res = await axiosInstance.get(USER_ENDPOINT.ACCOUNT_INFO);
  return res?.data;
};
