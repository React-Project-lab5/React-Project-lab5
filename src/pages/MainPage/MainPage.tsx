/* eslint-disable react-hooks/exhaustive-deps */
import { Banner, ShowMeetings } from '@/components/index';
import { SearchFrom } from '@/components/Input/SearchForm';
import classes from './MainPage.module.scss';
import { db } from '@/firebase/firestore/index';
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  orderBy,
} from '@firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cardDataState } from './../../states/cardDataState';
import { mapState } from '@/states/mapState';

export default function MainPage() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');

  const cardData = useRecoilValue(cardDataState);
  const [mapData, setMapData] = useRecoilState(mapState);
  console.log(typeof mapData);

  const [users, setUsers] = useState([]);

  const usersCollectionRef = query(
    collection(db, 'makeMeetings'),
    orderBy('timestamp', 'desc')
  );

  const getUsers = async () => {
    await getDocs(usersCollectionRef).then((data) => {
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUsers();
  }, [mapData]);

  const createUsers = async () => {
    await addDoc(collection(db, 'makeMeetings'), {
      title: title,
      address: address,
      detail: detail,
      cardData: cardData,
      mapData: mapData,
      timestamp: serverTimestamp(),
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
      <ShowMeetings users={users} />
    </>
  );
}
