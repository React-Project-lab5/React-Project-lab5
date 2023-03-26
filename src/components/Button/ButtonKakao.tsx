import classNames from 'classnames';
import classes from './Button.module.scss';
import kakao from '/public/assets/kakaoLogo.svg';

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

  const handleKakaoSignIn = () => {
    console.log('handleKakaoSignIn');
  };

  return (
    <button
      type="button"
      aria-label={'Kakao 로그인 버튼'}
      className={classNames(classes.button, className)}
      style={buttonStyle}
      onClick={handleKakaoSignIn}
    >
      <img src={kakao} alt="Kakao 로고 이미지" />
      Kakao 로그인
    </button>
  );
}
