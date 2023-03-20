import classes from './Button.module.scss';
import google from '/public/assets/googleLogo.svg';

interface Props {
  text: '로그인' | '회원가입';
}

export function ButtonGoogle({ text }: Props) {
  const handleGoogleSignIn = () => {
    console.log('handleGoogleSignIn');
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
    </>
  );
}
