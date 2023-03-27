import { atom } from 'recoil';

export const signState = atom({
  key: 'signState',
  default: false,
});

export const signUpState = atom({
  key: 'signUpState',
  default: false,
});
