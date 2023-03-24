/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '@/firebase/firestore/index';
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  orderBy,
} from '@firebase/firestore';
import { useEffect } from 'react';
import { mapState } from '@/states/mapState';
import { usersState } from '@/states/usersState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { titleMainState } from '@/states/titleMainState';
import { Banner, ShowMeetings } from '@/components/index';
import { detailMainState } from '@/states/detailMainState';
import { SearchFrom } from '@/components/Input/SearchForm';
import { cardDataState } from './../../states/cardDataState';
import { addressMainState } from '@/states/addressMainState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function MainPage() {
  useDocumentTitle('슬기로운 N밥생활 | 모임');

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
