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
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from '@/firebase/auth';
import { Banner } from '@/components/index';
import { Card } from '@/@recoil/usersState';
import { mapState } from '@/@recoil/mapState';
import { ShowMeetings } from '@/components/index';
import { usersState } from '@/@recoil/usersState';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { cardDataState } from '@/@recoil/cardDataState';
import { titleMainState } from '@/@recoil/titleMainState';
import { SearchFrom } from '@/components/Input/SearchForm';
import { detailMainState } from '@/@recoil/detailMainState';
import { addressMainState } from '@/@recoil/addressMainState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ScrollButton } from '@/components/Button/ScrollButton/ScrollButton';

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
      setUsers(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Card[]
      );
    });
  };

  useEffect(() => {
    console.log(users);
    getUsers();
  }, [title, detail, cardData, name, userImg]);

  const createUsers = async () => {
    const user = auth.currentUser;

    await addDoc(collection(db, 'makeMeetings'), {
      title: [...title],
      address: address,
      detail: detail,
      cardData: cardData,
      mapData: mapData,
      timestamp: serverTimestamp(),
      userName: name || user.providerData[0].displayName,
      userImg: userImg || user.providerData[0].photoURL,
    });
  };

  const searchFormProps = {
    createUsers: createUsers,
    getUsers: getUsers,
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Banner />
      <SearchFrom {...searchFormProps} />
      <ShowMeetings />

      <ScrollButton />
    </>
  );
}
