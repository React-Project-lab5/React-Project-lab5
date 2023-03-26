import { atom } from 'recoil';

export interface Card {
  userImg?: string;
  userName?: string;
}

export const usersState = atom<Card[]>({
  key: 'usersState',
  default: [],
});
