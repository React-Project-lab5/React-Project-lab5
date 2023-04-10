import { atom } from 'recoil';

export interface Card {
  email: string;
  timestamp: { seconds: number; nanoseconds: number };
  title: [];
  id: string;
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
