import classes from './Modal.module.scss';
import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { readingMap } from '@/states/readingMap';

export default function ShowCard({ cards }) {
  const setMapData = useSetRecoilState(readingMap);

  useLayoutEffect(() => {
    async function fetchAndSetCard() {
      const mapPosition = await cards[0].mapData;
      setMapData(mapPosition);
    }
    fetchAndSetCard();
  }, [cards, setMapData]);
  return cards.map((value, index: number) => (
    <div key={index} className={classes.showUsers}>
      <span>{value.title.join(' ')}</span>
      <span>{value.address}</span>
      <span>{value.detail}</span>
      <span>{value.cardData.slice(0, 15)}</span>
      <span className={classes.lastSpan}> {value.cardData.slice(16)}</span>
    </div>
  ));
}
