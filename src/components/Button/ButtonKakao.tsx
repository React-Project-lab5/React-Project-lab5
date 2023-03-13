import kakao from '../../assets/kakaoLogo.svg';

export default function ButtonKakao() {
  return (
    <button type="button" aria-label="Kakao 회원가입 버튼">
      <img src={kakao} alt="Kakao 로고 이미지" />
      Kakao 회원가입
    </button>
  );
}
