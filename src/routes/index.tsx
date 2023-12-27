import { AuthGuard } from '@/auth/guard';
import { ROUTES } from '@/constants';
import { Navigate, useRoutes } from 'react-router-dom';
import { LogInPage } from './element';
import AuthLayout from '@/layout/auth/AuthLayout';
import GuestGuard from '@/auth/guard/GuestGuard';

export default function Router() {
  return useRoutes([
    {
      path: ROUTES.AUTH,
      children: [
        { element: <Navigate to={ROUTES.ROOT} replace />, index: true },
        {
          element: <AuthLayout />,
          children: [
            {
              path: ROUTES.LOG_IN,
              element: (
                <GuestGuard>
                  <LogInPage />
                </GuestGuard>
              ),
            },
          ],
        },
      ],
    },
    {
      path: ROUTES.ROOT,
      element: (
        <AuthGuard>
          <h2>Root</h2>
        </AuthGuard>
      ),
      children: [],
    },
  ]);
}
