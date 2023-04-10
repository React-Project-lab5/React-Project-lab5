import { atom } from 'recoil';

export const searchEmailState = atom<string>({
  key: 'searchEmailState',
  default: '',
});
