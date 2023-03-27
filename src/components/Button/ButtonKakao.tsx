import classNames from 'classnames';
import { auth } from '@/firebase/auth';
import KakaoLogin from 'react-kakao-login';
import classes from './Button.module.scss';
import { useNavigate } from 'react-router-dom';
import kakao from '/public/assets/kakaoLogo.svg';
import { LoginResponse, UserProfile } from 'kakao-sdk';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';

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
  const navigate = useNavigate();

  const handleKakaoLogin = (response: {
    response: LoginResponse;
    profile?: UserProfile;
  }) => {
    if (response === undefined) {
      return; // 로그인 실패
    }

    const displayName = response.profile.properties.nickname;
    const email = response.profile.kakao_account.email;
    const password = response.profile.id.toString();
    const photoURL = response.profile.kakao_account.profile.profile_image_url;

    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/mainpage');
      }
    });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <KakaoLogin
      token={import.meta.env.VITE_KAKAO_API_KEY}
      onSuccess={handleKakaoLogin}
      onFail={(error) => console.log(error)}
      render={({ onClick }) => (
        <button
          type="button"
          aria-label={'Kakao 로그인 버튼'}
          className={classNames(classes.button, className)}
          style={buttonStyle}
          onClick={onClick}
        >
          <img src={kakao} alt="Kakao 로고 이미지" />
          Kakao 로그인
        </button>
      )}
    />
  );
}
