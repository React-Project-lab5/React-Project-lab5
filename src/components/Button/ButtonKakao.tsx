import classes from './Button.module.scss';
import kakao from '/public/assets/kakaoLogo.svg';

interface Props {
  text: '로그인' | '회원가입';
}
export function ButtonKakao({ text }: Props) {
  const resgi = () => {
    console.log('클릭');
  };

  const login = () => {
    console.log('클릭2');
  };

  return (
    <button
      type="button"
      aria-label={'Kakao' + text + '버튼'}
      className={classes.button}
      onClick={text === '회원가입' ? resgi : login}
    >
      <img src={kakao} alt="Kakao 로고 이미지" />
      Kakao {text}
    </button>
  );
}
