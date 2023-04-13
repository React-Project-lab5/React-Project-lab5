/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { useEffect } from 'react';
import classes from './Modal.module.scss';
import { Card } from '@/@recoil/usersState';
import { readingMap } from '@/@recoil/readingMap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { readingCardState } from '@/@recoil/readingCardState';
import { searchEmailState } from '@/@recoil/searchEmailState';

interface Props {
  cards?: Card[];
}

const ShowCard: FC<Props> = () => {
  const setMapData = useSetRecoilState(readingMap);
  const cards = useRecoilValue(readingCardState);
  const setSearchEmail = useSetRecoilState(searchEmailState);

  useEffect(() => {
    //무한루프.랜더링 예방 -> cards가 [] 빈배열 일때에만 실행되도록 함.

    async function fetchAndSetCard() {
      if (cards[0]) {
        const mapPosition = cards[0].mapData;
        setMapData(mapPosition);
        setSearchEmail(cards[0].email);
      }
    }

    fetchAndSetCard();
  }, [cards, setMapData, setSearchEmail]);
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
