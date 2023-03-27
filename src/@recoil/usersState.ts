import { atom } from 'recoil';

export interface Card {
  title: [];
  address: string;
  detail: string;
  mapData?: [number, number];
  cardData: string;
  userImg?: string;
  userName?: string;
}

export const usersState = atom<Card[]>({
  key: 'usersState',
  default: [],
});
