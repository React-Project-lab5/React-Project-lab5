import { Banner, ShowMeetings } from '@/components/index';
import { SearchFrom } from '@/components/Input/SearchForm';
import classes from './MainPage.module.scss';
import { db } from '@/firebase/firestore/index';
import { collection, getDocs, addDoc } from '@firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { cardDataState } from './../../states/cardDataState';

export default function MainPage() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');

  const cardData = useRecoilValue(cardDataState);

  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, 'makeMeetings');

  // 이따가 users 추가하고 삭제하는거 진행을 도와줄 state
  const [users, setUsers] = useState([]);

  // 비동기로 데이터 받을준비
  const getUsers = async () => {
    // getDocs로 컬렉션안에 데이터 가져오기
    const data = await getDocs(usersCollectionRef);

    // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, [cardData]);

  const createUsers = async () => {
    // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
    await addDoc(usersCollectionRef, {
      title: title,
      address: address,
      detail: detail,
      cardData: cardData,
    });
  };

  const searchFormProps = {
    setTitle: setTitle,
    setAddress: setAddress,
    setDetail: setDetail,
    createUsers: createUsers,
    getUsers: getUsers,
  };

  return (
    <>
      <Banner />
      <SearchFrom {...searchFormProps} />
      <div className={classes['meetingContainer']}>
        <ShowMeetings users={users} />
      </div>
    </>
  );
}
