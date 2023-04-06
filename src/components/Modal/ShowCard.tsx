/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from './Modal.module.scss';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { readingMap } from '@/@recoil/readingMap';
import { Card } from '@/@recoil/usersState';
import { FC } from 'react';

interface Props {
  cards?: Card[];
}

const ShowCard: FC<Props> = ({ cards }) => {
  const setMapData = useSetRecoilState(readingMap);

  useEffect(() => {
    async function fetchAndSetCard() {
      const mapPosition = cards[0].mapData;
      setMapData(mapPosition);
    }
    fetchAndSetCard();
  }, [cards, setMapData]);
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
