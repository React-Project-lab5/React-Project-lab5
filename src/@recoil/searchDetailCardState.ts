import { atom } from 'recoil';

export const searchDetailCardState = atom<string>({
  key: 'searchDetailCardState',
  default: '',
});
