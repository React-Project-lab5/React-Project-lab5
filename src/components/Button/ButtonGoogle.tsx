import classes from './Button.module.scss';
import google from '/public/assets/googleLogo.svg';

interface Props {
  text: '로그인' | '회원가입';
  widthValue?: string | number;
  maxWidthValue?: string | number;
  heightValue?: string | number;
}

export function ButtonGoogle({
  text,
  widthValue,
  maxWidthValue,
  heightValue,
}: Props) {
  const buttonStyle = {
    width: widthValue,
    maxWidth: maxWidthValue,
    height: heightValue,
  };

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
        style={buttonStyle}
        onClick={text === '회원가입' ? handleGoogleSignUp : handleGoogleSignIn}
      >
        <img src={google} alt="Google 로고 이미지" />
        Google {text}
      </button>
    </>
  );
}
