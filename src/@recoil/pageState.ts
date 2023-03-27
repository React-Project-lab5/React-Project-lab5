import { atom } from 'recoil';

export const postsPerPageState = atom({
  key: 'postsPerPageState',
  default: 28,
});
