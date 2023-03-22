/* eslint-disable react-hooks/exhaustive-deps */
import { Banner, ShowMeetings } from '@/components/index';
import { SearchFrom } from '@/components/Input/SearchForm';
import { db } from '@/firebase/firestore/index';
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
} from '@firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cardDataState } from './../../states/cardDataState';
import { mapState } from '@/states/mapState';
import { titleMainState } from '@/states/titleMainState';
import { addressMainState } from '@/states/addressMainState';
import { detailMainState } from '@/states/detailMainState';
import { usersState } from '@/states/usersState';

export default function MainPage() {
  const title = useRecoilValue(titleMainState);
  const address = useRecoilValue(addressMainState);
  const detail = useRecoilValue(detailMainState);
  const cardData = useRecoilValue(cardDataState);
  const mapData = useRecoilValue(mapState);
  const [users, setUsers] = useRecoilState(usersState);

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
    createUsers: createUsers,
    getUsers: getUsers,
  };

  return (
    <>
      <Banner />
      <SearchFrom {...searchFormProps} />
      <ShowMeetings />
    </>
  );
}
