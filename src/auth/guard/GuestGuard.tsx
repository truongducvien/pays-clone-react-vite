import { ReactNode } from 'react';
import useAuthContext from '../useAuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import LoadingScreen from '@/components/loading-screen';

export default function GuestGuard({ children }: { children: ReactNode }) {
  const { isInitialized, isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.ROOT} replace={true} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return children;
}
