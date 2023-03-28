import { atom } from 'recoil';

export const readingMap = atom<number[]>({
  key: 'readingMap',
  default: [33.450701, 126.570667],
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        console.log('현재 지도 위치 정보:', newValue);
      });
    },
  ],
});
