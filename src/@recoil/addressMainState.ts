import { atom } from 'recoil';

export const addressMainState = atom<string>({
  key: 'addressMainState',
  default: '',
});
