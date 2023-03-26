/* eslint-disable react/prop-types */
import { Card } from '@/states/cardsState';
import classes from './Modal.module.scss';

interface Props {
  cards?: Card[];
}

export function UserContainer({ cards }: Props) {
  return (
    <div className={classes['authorContainer']}>
      <img
        src={cards[0]?.userImg}
        alt="프로필 사진"
        className={classes['authorImg']}
      />
      <div className={classes['nicName']}>{cards[0]?.userName}</div>
    </div>
  );
}
