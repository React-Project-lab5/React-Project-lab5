import classNames from 'classnames';
import { auth } from '@/firebase/auth';
import KakaoLogin from 'react-kakao-login';
import classes from './Button.module.scss';
import { useNavigate } from 'react-router-dom';
import kakao from '/public/assets/kakaoLogo.svg';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { useEffect } from 'react';

interface Props {
  widthValue?: string | number;
  maxWidthValue?: string | number;
  heightValue?: string | number;
  className?: string;
}

export function ButtonKakao({
  widthValue,
  maxWidthValue,
  heightValue,
  className,
}: Props) {
  const buttonStyle = {
    width: widthValue,
    maxWidth: maxWidthValue,
    height: heightValue,
  };
  const navigate = useNavigate();

  const handleKakaoLogin = async (response: KakaoLoginResponse) => {
    if (response === undefined) {
      return; // 로그인 실패
    }

    const displayName = response.profile.properties.nickname;
    const email = response.profile.kakao_account.email || 'yamoo9@naver.com';
    const password = response.profile.id.toString();
    const photoURL = response.profile.kakao_account.profile.profile_image_url;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => console.log(error.message));

    return;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        });

        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        const userData = {
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        };
        setDoc(userDocRef, userData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log(user);

      if (user) {
        navigate('/mainpage');
      }
    });
  }, [navigate]);

  return (
    <KakaoLogin
      token={import.meta.env.VITE_KAKAO_API_KEY}
      onSuccess={handleKakaoLogin}
      onFail={(error) => console.log(error)}
      render={({ onClick }) => (
        <button
          type="button"
          aria-label={'Kakao 로그인 버튼'}
          className={classNames(classes.button, className)}
          style={buttonStyle}
          onClick={onClick}
        >
          <img src={kakao} alt="Kakao 로고 이미지" />
          Kakao 로그인
        </button>
      )}
    />
  );
}
