import { atom } from 'recoil';

export const addressState = atom<string>({
  key: 'addressState',
  default: '',
});
