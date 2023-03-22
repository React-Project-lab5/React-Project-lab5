import { atom } from 'recoil';
import { db } from '@/firebase/firestore/index';
import { doc, deleteDoc } from '@firebase/firestore';

export const deleteUsers = atom({
  key: 'deleteUsers',
  default: async (id) => {
    // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
    const userDoc = doc(db, 'makeMeetings', id);
    // deleteDoc을 이용해서 삭제
    await deleteDoc(userDoc);
    localStorage.setItem('Unique ID', null);
  },
});
