import { atom } from 'recoil';

export const authImagState = atom<string>({
  key: 'authImagState',
  default: '',
});
