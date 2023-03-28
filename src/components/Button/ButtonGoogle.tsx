import classNames from 'classnames';
import { auth } from '@/firebase/auth';
import classes from './Button.module.scss';
import { useNavigate } from 'react-router-dom';
import google from '/public/assets/googleLogo.svg';
import { GoogleAuthProvider, signInWithRedirect } from '@firebase/auth';

interface Props {
  widthValue?: string | number;
  maxWidthValue?: string | number;
  heightValue?: string | number;
  className?: string;
}

export function ButtonGoogle({
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

  return (
    <>
      <button
        type="button"
        aria-label={'Google 로그인 버튼'}
        className={classNames(classes.button, className)}
        style={buttonStyle}
        onClick={handleGoogleSignIn}
      >
        <img src={google} alt="Google 로고 이미지" />
        Google 로그인
      </button>
    </>
  );
}
