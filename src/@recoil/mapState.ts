import { atom } from 'recoil';

export const mapState = atom<number[]>({
  key: 'mapState',
  default: [0, 0],
});
