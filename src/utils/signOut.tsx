// signOutUtils.ts

import { auth } from '@/firebase/auth';
import { signOut, deleteUser } from '@firebase/auth';
import { db } from '@/firebase/app';
import { doc, deleteDoc } from '@firebase/firestore';

const deleteDocument = async (member: string) => {
  const user = auth.currentUser;
  try {
    await deleteDoc(doc(db, 'users', user.uid));
    await deleteUser(user);
    alert(`${member} 되었습니다.`);
  } catch (error) {
    console.log(`${member} 실패!`, error);
  }
};

export const handleSignOut = () => {
  const user = auth.currentUser;
  if (user.providerData[0].photoURL.includes('kakao')) {
    deleteDocument('로그아웃');
  } else {
    signOut(auth);
    alert('로그아웃이 되었습니다.');
    window.location.href = '/';
  }
};
