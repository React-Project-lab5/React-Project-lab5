import google from '../../assets/googleLogo.svg';

export function ButtonGoogle() {
  return (
    <button type="button" aria-label="Google 회원가입 버튼">
      <img src={google} alt="Google 로고 이미지" />
      Google 회원가입
    </button>
  );
}
