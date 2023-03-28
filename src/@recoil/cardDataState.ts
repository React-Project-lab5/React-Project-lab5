import { atom } from 'recoil';

export const cardDataState = atom<string>({
  key: 'cardDataState',
  default: '',
});
