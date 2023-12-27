import { LogInResponse } from '@/api/auth';

export interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  role?: 'Admin' | null;
  handleLogIn: (payload: LogInResponse) => void;
  handleLogOut: (payload: unknown) => void;
}
