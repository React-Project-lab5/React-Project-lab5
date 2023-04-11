import { db } from '@/firebase/app';
import { auth } from '@/firebase/auth';
import { useRecoilState } from 'recoil';
import classes from './Navbar.module.scss';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { signOut } from '@firebase/auth';
import { authImagState } from '@/@recoil/authImgState';
import defaultAvatar from '/public/assets/chatAvatars.svg';
import { doc, getDoc, collection } from '@firebase/firestore';

export function Navbar() {
  const [imageUrl, setImageUrl] = useRecoilState(authImagState);

  const navigation = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const user = auth.currentUser;

  const handleSignOut = async () => {
    await signOut(auth);

    if (user.providerData[0].photoURL.includes('kakao')) {
      const { Kakao, location } = window;
      const CLIENT_ID = import.meta.env.VITE_KAKAO_API_KEY;
      const LOGOUT_REDIRECT_URI = 'http://localhost:3000';

      // Kakao API 토큰 만료 설정
      await Kakao.Auth.logout();

      // Kakao 계정 로그아웃 설정
      location.replace(
        `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
      );
    } else {
      alert('로그아웃이 되었습니다.');
      navigation('/');
    }
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
