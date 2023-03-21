import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Chat from '@/pages/Chat/Chat';
import MyPage from '@/pages/MyPage/MyPage';
import RootLayout from './pages/Layout/Layout';
import NotFound from '@/pages/NotFound/NotFound';
import MainPage from '@/pages/MainPage/MainPage';
import Recommend from '@/pages/Recommend/Recommend';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'mainPage', element: <MainPage /> },
      { path: 'recommend', element: <Recommend /> },
      { path: 'chat', element: <Chat /> },
      { path: 'myPage', element: <MyPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
