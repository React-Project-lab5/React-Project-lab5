import { atom } from 'recoil';

export const currentPageState = atom<number>({
  key: 'currentPageState',
  default: 1,
});

export const postsState = atom<number[]>({
  key: 'postsState',
  default: [],
});
