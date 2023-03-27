import { atom } from 'recoil';

export const isActive = atom<boolean>({
  key: 'isActive',
  default: false,
});
