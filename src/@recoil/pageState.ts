import { atom } from 'recoil';

export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});

export const postsState = atom({
  key: 'postsState',
  default: [],
});
