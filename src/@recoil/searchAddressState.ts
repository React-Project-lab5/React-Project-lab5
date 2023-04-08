import { atom } from 'recoil';

export const searchAddressState = atom<string>({
  key: 'searchAddressState',
  default: '',
});
