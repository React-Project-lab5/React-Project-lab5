import classes from './Button.module.scss';
import google from '/public/assets/googleLogo.svg';
import { GoogleAuthProvider, signInWithRedirect } from '@firebase/auth';
import { auth } from '@/firebase/auth';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  text: '로그인' | '회원가입';
  widthValue?: string | number;
  maxWidthValue?: string | number;
  heightValue?: string | number;
  className?: string;
}

export function ButtonGoogle({
  text,
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

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    navigate('/mainpage');
  };

  const handleGoogleSignUp = () => {
    console.log('handleGoogleSignUp');
  };

  return (
    <>
      <button
        type="button"
        aria-label={'Google ' + text + ' 버튼'}
        className={classNames(classes.button, className)}
        style={buttonStyle}
        onClick={text === '회원가입' ? handleGoogleSignUp : handleGoogleSignIn}
      >
        <img src={google} alt="Google 로고 이미지" />
        Google {text}
      </button>
    </>
  );
}
