import { atom } from 'recoil';

export const detailMainState = atom<string>({
  key: 'detailMainState',
  default: '',
});
