import classes from './Button.module.scss';
import kakao from '/public/assets/kakaoLogo.svg';

export function ButtonKakao() {
  return (
    <button
      type="button"
      aria-label="Kakao 회원가입 버튼"
      className={classes.button}
    >
      <img src={kakao} alt="Kakao 로고 이미지" />
      Kakao 회원가입
    </button>
  );
}
