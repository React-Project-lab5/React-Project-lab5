import classes from './Button.module.scss';
import google from '/public/assets/googleLogo.svg';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { auth } from '@/firebase/auth/index';
import { useState } from 'react';
interface Props {
  text: '로그인' | '회원가입';
}

export function ButtonGoogle({ text }: Props) {
  const [userData, setUserData] = useState(null);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console로 들어온 데이터 표시
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const resgi = () => {
    console.log('클릭');
  };

  // const login = () => {
  //   console.log('클릭2');
  // };

  return (
    <>
      <button
        type="button"
        aria-label={'Google ' + text + ' 버튼'}
        className={classes.button}
        onClick={text === '회원가입' ? resgi : handleGoogleLogin}
      >
        <img src={google} alt="Google 로고 이미지" />
        Google {text}
      </button>
      {userData ? userData.displayName : null}
    </>
  );
}
