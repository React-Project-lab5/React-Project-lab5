import { atom } from 'recoil';
import { Card } from './usersState';

export const readingCardState = atom<Card[]>({
  key: 'readingCardState',
  default: [],
});
