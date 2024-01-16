import LoadingScreen from '@/components/loading-screen';
import { ElementType, Suspense, lazy } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const LogInPage = Loadable(lazy(() => import('../pages/LogInPage')));
export const SubAdminPage = Loadable(lazy(() => import('../pages/SubAdminPage')));
export const PageNotFound = Loadable(lazy(() => import('../pages/404')));
