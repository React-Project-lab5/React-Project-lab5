import { atom } from 'recoil';

export const timeMainState = atom<string>({
  key: 'timeMainState',
  default: '',
});
