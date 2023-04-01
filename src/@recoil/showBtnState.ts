import { atom } from 'recoil';

export const showBtnState = atom<boolean>({
  key: 'showBtnState',
  default: false,
});
