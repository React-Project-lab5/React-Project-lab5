import { atom } from 'recoil';

export const titleMainState = atom<string>({
  key: 'titleMainState',
  default: '',
});
