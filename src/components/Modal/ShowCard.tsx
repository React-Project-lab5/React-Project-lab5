/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from './Modal.module.scss';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { readingMap } from '@/@recoil/readingMap';
import { Card } from '@/@recoil/usersState';
import { FC } from 'react';
import { searchDetailCardState } from '@/@recoil/searchDetailCardState';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '@/firebase/firestore/index';
import { readingCardState } from '@/@recoil/readingCardState';
import { searchAddressState } from '@/@recoil/searchAddressState';
import { searchEmailState } from '@/@recoil/searchEmailState';

interface Props {
  cards?: Card[];
}

const ShowCard: FC<Props> = () => {
  const setMapData = useSetRecoilState(readingMap);
  const searchCardDetail = useRecoilValue(searchDetailCardState);
  const searchAddress = useRecoilValue(searchAddressState);
  const [cards, setCards] = useRecoilState(readingCardState);
  const setSearchEmail = useSetRecoilState(searchEmailState);

  useEffect(() => {
    //무한루프.랜더링 예방 -> cards가 [] 빈배열 일때에만 실행되도록 함.
    if (localStorage.getItem('Unique ID') === '1' && cards.length === 0) {
      const usersCollectionRef = query(
        collection(db, 'makeMeetings'),
        where('detail', '==', searchCardDetail),
        where('address', '==', searchAddress)
      );

      const getUsers = async () => {
        await getDocs(usersCollectionRef).then((data) => {
          setCards(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Card[]
          );
        });
      };
      getUsers();
    }

    async function fetchAndSetCard() {
      if (cards[0]) {
        const mapPosition = cards[0].mapData;
        setMapData(mapPosition);
        setSearchEmail(cards[0].email);
      }
    }

    fetchAndSetCard();
  }, [
    cards,
    searchAddress,
    searchCardDetail,
    setCards,
    setMapData,
    setSearchEmail,
  ]);
  return (
    <>
      {cards.map((value, index: number) => (
        <div key={index} className={classes.showUsers}>
          <span>{value.title}</span>
          <span>{value.address}</span>
          <span>{value.detail}</span>
          <span>{value.cardData.slice(0, 15)}</span>
          <span className={classes.lastSpan}> {value.cardData.slice(16)}</span>
        </div>
      ))}
    </>
  );
};
export default ShowCard;
