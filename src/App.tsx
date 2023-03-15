import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import MainPage from '@/pages/MainPage/MainPage';
import Recommend from '@/pages/Recommend/Recommend';
import Chat from '@/pages/Chat/Chat';
import MyPage from '@/pages/MyPage/MyPage';
import NotFound from '@/pages/NotFound/NotFound';
import { Header, Footer, ModalTotal, ShowMeetings } from '@/components/index';
import { db } from '@/firebase/app';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');

  console.log(title, address);

  // 비동기로 데이터 받을준비
  const getUsers = async () => {
    // getDocs로 컬렉션안에 데이터 가져오기
    const data = await getDocs(usersCollectionRef);
    // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, [title]);

  // 이따가 users 추가하고 삭제하는거 진행을 도와줄 state
  const [users, setUsers] = useState([]);

  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, 'makeMeetings');

  const createUsers = async () => {
    // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
    await addDoc(usersCollectionRef, { title: title, address: address });
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <ShowMeetings users={users} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/notFound" element={<NotFound />} />
        </Routes>
        <ModalTotal
          createUsers={createUsers}
          getUsers={getUsers}
          setTitle={setTitle}
          setAddress={setAddress}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
