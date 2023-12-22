import { LogInPayload } from '@/api/auth';

export interface AuthContextType {
    isAuthenticated: boolean;
    role?: 'Admin' | null;
    logIn?: (payload: LogInPayload) => void;
    logOut?: (payload: unknown) => void;
}
