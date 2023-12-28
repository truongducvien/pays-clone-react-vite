import { AuthGuard } from '@/auth/guard';
import { ROUTES } from '@/constants';
import { Navigate, useRoutes } from 'react-router-dom';
import { LogInPage, PageNotFound } from './element';
import AuthLayout from '@/layout/auth/AuthLayout';
import GuestGuard from '@/auth/guard/GuestGuard';
import AdminLayout from '@/layout/admin/AdminLayout';

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
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: (
            <AuthGuard>
              <h2>Root</h2>
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.PAYMENT_METHOD,
          element: (
            <AuthGuard>
              <h2>PAYMENT_METHOD</h2>
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);
}
