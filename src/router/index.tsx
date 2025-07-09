import criteriaLoader from '@/loader/criteriaLoader';
import { lazy } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const SuccessfulPage = lazy(() => import('@/pages/SuccessfulPage'));
export const ROUTE_NAMES = {
  HOME: '/',
  SUCCESS: 'successful-submission',
};

const routes: RouteObject[] = [
  { path: ROUTE_NAMES.HOME, element: <Home />, loader: criteriaLoader },
  {
    path: ROUTE_NAMES.SUCCESS,
    element: <SuccessfulPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
