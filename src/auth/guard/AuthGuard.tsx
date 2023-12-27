import { ReactNode } from 'react';
import useAuthContext from '../useAuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import LoadingScreen from '@/components/loading-screen';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isInitialized, isAuthenticated } = useAuthContext();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOG_IN} replace={true} />;
  }
  return children;
}
