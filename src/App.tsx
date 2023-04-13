import RootLayout, { BaseLayout } from './pages/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

/* PAGES -------------------------------------------------------------------- */

const Home = lazy(() => import('./pages/Home/Home'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Chat = lazy(() => import('./pages/Chat/Chat'));
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
const Recommend = lazy(() => import('./pages/Recommend/Recommend'));

/* ROUTES ------------------------------------------------------------------- */

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'mainPage',
        element: (
          <BaseLayout>
            <MainPage />
          </BaseLayout>
        ),
      },
      {
        path: 'recommend',
        element: (
          <BaseLayout>
            <Recommend />
          </BaseLayout>
        ),
      },
      {
        path: 'chat',
        element: (
          <BaseLayout>
            <Chat />
          </BaseLayout>
        ),
      },
      {
        path: 'myPage',
        element: (
          <BaseLayout>
            <MyPage />
          </BaseLayout>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
