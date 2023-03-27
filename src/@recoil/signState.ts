import { atom } from 'recoil';

export const signState = atom<boolean>({
  key: 'signState',
  default: false,
});

export const signUpState = atom<boolean>({
  key: 'signUpState',
  default: false,
});
