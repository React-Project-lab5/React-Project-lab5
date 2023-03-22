import { MapReading } from '@/utils/MapReading';
import classes from './Modal.module.scss';

export default function ShowCard({ cards }) {
  return cards.map((value, index: number) => (
    <div key={index} className={classes.showUsers}>
      <MapReading mapPosition={value.mapData} />
      <span>{value.title}</span>
      <span>{value.address}</span>
      <span>{value.detail}</span>
      <span>{value.cardData.slice(0, 15)}</span>
      <span className={classes.lastSpan}> {value.cardData.slice(16)}</span>
    </div>
  ));
}
