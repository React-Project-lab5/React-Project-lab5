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

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleSignUp = () => {
    console.log('handleGoogleSignUp');
  };

  return (
    <>
      <button
        type="button"
        aria-label={'Google ' + text + ' 버튼'}
        className={classes.button}
        onClick={text === '회원가입' ? handleGoogleSignUp : handleGoogleSignIn}
      >
        <img src={google} alt="Google 로고 이미지" />
        Google {text}
      </button>
      {userData ? userData.displayName : null}
    </>
  );
}
