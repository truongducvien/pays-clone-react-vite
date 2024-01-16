import { ACCOUNT_INFO, SYSTEM_PERMISSION, USER_BY_ROLE, USER_PROFILE } from '@/constants';
import { axiosInstance } from '@/utils';

export interface UserResponse {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  gender: string;
  dateOfBirth: string;
  avatarUrl: string;
  enableBiometric: true;
  countryCode: string;
}

export type Permission = (typeof SYSTEM_PERMISSION)[keyof typeof SYSTEM_PERMISSION];

export interface AccountResponse {
  id: number;
  userName: string;
  name: string;
  emailAddress: string;
  countryCode: string;
  phoneNumber: string;
  createdDate: string;
  gender: string;
  dateOfBirth: string;
  permissionList: Permission[];
  roleList: string[];
  isActive: true;
}

export type UserRoles = 'Admin' | 'SubAdmin' | 'Merchant' | 'User' | 'None';

export interface UserByRoleParams {
  keyword?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  role: UserRoles;
  skipCount?: number;
  maxResultCount?: number;
}

export interface UserByRoleResponse {
  items: AccountResponse[];
  totalCount: number;
}

export const getUserProfile = async (): Promise<UserResponse> => {
  const res = await axiosInstance.get(USER_PROFILE);
  return res?.data;
};

export const getUserAccount = async (): Promise<AccountResponse> => {
  const res = await axiosInstance.get(ACCOUNT_INFO);
  return res?.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUsersByRole = async (params: UserByRoleParams): Promise<UserByRoleResponse> => {
  const res = await axiosInstance.get(USER_BY_ROLE, { params });
  return res?.data;
};
