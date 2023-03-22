import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Chat from '@/pages/Chat/Chat';
import MyPage from '@/pages/MyPage/MyPage';
import NotFound from '@/pages/NotFound/NotFound';
import MainPage from '@/pages/MainPage/MainPage';
import Recommend from '@/pages/Recommend/Recommend';
import RootLayout, { BaseLayout } from './pages/Layout/Layout';

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
  return <RouterProvider router={router} />;
}

export default App;
