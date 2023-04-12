/* eslint-disable no-unused-vars */
import { atom } from 'recoil';

export const totalPageNumState = atom<(posts: []) => void>({
  key: 'totalPageNumState',
  default: (posts) => {
    Math.ceil(posts.length / 24);
  },
});
