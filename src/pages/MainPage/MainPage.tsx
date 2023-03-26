/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '@/firebase/firestore/index';
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  getDoc,
  orderBy,
  doc,
} from '@firebase/firestore';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cardDataState } from '@/@recoil/cardDataState';
import { mapState } from '@/@recoil/mapState';
import { titleMainState } from '@/@recoil/titleMainState';
import { addressMainState } from '@/@recoil/addressMainState';
import { detailMainState } from '@/@recoil/detailMainState';
import { usersState } from '@/@recoil/usersState';
import { auth } from '@/firebase/auth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useState } from 'react';
import { Banner } from '@/components/index';
import { SearchFrom } from '@/components/Input/SearchForm';
import { ShowMeetings } from '@/components/index';

export default function MainPage() {
  useDocumentTitle('슬기로운 N밥생활 | 모임');

  const title = useRecoilValue(titleMainState);
  const address = useRecoilValue(addressMainState);
  const detail = useRecoilValue(detailMainState);
  const cardData = useRecoilValue(cardDataState);
  const mapData = useRecoilValue(mapState);
  const [users, setUsers] = useRecoilState(usersState);
  const [name, setName] = useState('');
  const [userImg, setUserImg] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserRef = doc(collection(db, 'users'), user.uid);
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            console.log(userData);
            setName(userData.displayName);
            setUserImg(userData.photoURL);
          }
        });
      }
    });
    return unsub;
  }, []);

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
      title: title.split(' '),
      address: address,
      detail: detail,
      cardData: cardData,
      mapData: mapData,
      timestamp: serverTimestamp(),
      userName: name,
      userImg: userImg,
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
