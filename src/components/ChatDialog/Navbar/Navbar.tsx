import classes from './Navbar.module.scss';
import { signOut } from '@firebase/auth';
import { auth } from '@/firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '@/firebase/app';
import { doc, getDoc, collection } from '@firebase/firestore';
import { useRecoilState } from 'recoil';
import { authImagState } from '@/states/authImgState';

export function Navbar() {
  const [imageUrl, setImageUrl] = useRecoilState(authImagState);

  const navigation = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth);
    navigation('/');
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserRef = doc(collection(db, 'users'), user.uid);
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setImageUrl(userData.imageUrl);
          }
        });
      }
    });
    return unsub;
  });

  return (
    <div className={classes.navbar}>
      <p className={classes.logo}>슬기로운 N밥생활</p>
      <div className={classes.user}>
        <img src={imageUrl} alt="사용자" />
        <p>{currentUser.displayName}</p>
        <button type="button" onClick={handleSignOut}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
