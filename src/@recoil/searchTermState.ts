import { atom } from 'recoil';

export const searchTermState = atom<string>({
  key: 'searchTermState',
  default: '',
});
