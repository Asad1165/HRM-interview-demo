import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// layouts
import MainLayout from 'src/layouts/main';

// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/pages/404'));

const IndexPage = lazy(() => import('src/pages/home'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: '404', element: <Page404 /> },
    ],
  },
];
