import Home from '@/pages/Home';
import SuccessfulPage from '@/pages/SuccessfulPage';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

export const ROUTE_NAMES = {
  HOME: '/',
  SUCCESS: 'successful-submission',
};

const routes: RouteObject[] = [
  { path: ROUTE_NAMES.HOME, element: <Home /> },
  {
    path: ROUTE_NAMES.SUCCESS,
    element: <SuccessfulPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
