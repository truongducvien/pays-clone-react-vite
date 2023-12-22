import { ROUTES } from '@/constants';
import { useRoutes } from 'react-router-dom';

export default function Router() {
  return useRoutes([
    {
      path: ROUTES.AUTH,
      element: <h2>Auth</h2>,
      children: [],
    },
    {
      path: ROUTES.ROOT,
      element: null,
      children: [],
    },
  ]);
}
