import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import MainPage from '@/pages/MainPage/MainPage';
import Recommend from '@/pages/Recommend/Recommend';
import Chat from '@/pages/Chat/Chat';
import MyPage from '@/pages/MyPage/MyPage';
import NotFound from '@/pages/NotFound/NotFound';
import { Header, Footer, Banner, ModalTotal } from '@/components/index';
import { Desktop, Tablet } from './utils/mediaQuery';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Banner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/notFound" element={<NotFound />} />
        </Routes>
        <ModalTotal />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
