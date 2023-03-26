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
  getDoc,
  orderBy,
  doc,
} from '@firebase/firestore';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cardDataState } from '@/states/cardDataState';
import { mapState } from '@/states/mapState';
import { titleMainState } from '@/states/titleMainState';
import { addressMainState } from '@/states/addressMainState';
import { detailMainState } from '@/states/detailMainState';
import { usersState } from '@/states/cardsState';
import { auth } from '@/firebase/auth';

export default function MainPage() {
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
