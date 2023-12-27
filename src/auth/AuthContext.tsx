import { ReactNode, createContext, useEffect, useState } from 'react';
import { AuthContextType } from './types';
import { getSessionStorage, setSessionStorage } from '@/utils';
import { LogInResponse } from '@/api/auth';

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const initialize = async () => {
    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 2000);
    });

    setIsInitialized(true);
    const accessToken = getSessionStorage('accessToken');
    setIsAuthenticated(!!accessToken);
  };

  const handleLogIn = (payload: LogInResponse) => {
    setIsAuthenticated(true);
    setSessionStorage('accessToken', payload.accessToken);
  };

  const handleLogOut = () => {};

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ isInitialized, isAuthenticated, handleLogIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
}
