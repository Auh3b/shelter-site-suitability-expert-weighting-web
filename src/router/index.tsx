import Home from '@/pages/Home';
import SuccessfulPage from '@/pages/SuccessfulPage';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  {
    path: 'successful-submission',
    element: <SuccessfulPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
