import { db } from '@/firebase/app';
import { auth } from '@/firebase/auth';
import { useRecoilState } from 'recoil';
import { signOut, deleteUser } from '@firebase/auth';
import classes from './Navbar.module.scss';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { authImagState } from '@/@recoil/authImgState';
import defaultAvatar from '/public/assets/chatAvatars.svg';
import { doc, getDoc, collection, deleteDoc } from '@firebase/firestore';

export function Navbar() {
  const [imageUrl, setImageUrl] = useRecoilState(authImagState);

  const navigation = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const user = auth.currentUser;

  const deleteDocument = (member: string) => {
    deleteDoc(doc(db, 'users', user.uid));
    deleteUser(user)
      .then(() => {
        alert(`${member} 되었습니다.`);
        navigation('/');
      })
      .catch((error) => {
        console.log(`${member} 실패!`, error);
      });
  };

  const handleSignOut = () => {
    signOut(auth);
    if (user.providerData[0].photoURL.includes('kakao')) {
      deleteDocument('로그아웃');
    }
    navigation('/');
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserRef = doc(collection(db, 'users'), user.uid);
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setImageUrl(userData.photoURL);
          } else {
            setImageUrl(user.providerData[0].photoURL);
          }
        });
      }
    });
    return unsub;
  }, [setImageUrl]);

  return (
    <div className={classes.navbar}>
      <p className={classes.logo}>슬기로운 N밥생활</p>
      <div className={classes.user}>
        <img src={imageUrl || defaultAvatar} alt="사용자" />
        <p>{currentUser.displayName}</p>
        <button type="button" onClick={handleSignOut}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
