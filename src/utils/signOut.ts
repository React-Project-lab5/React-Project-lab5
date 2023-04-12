import { signOut } from '@firebase/auth';
import { Auth, User } from '@firebase/auth';
import { NavigateFunction } from 'react-router-dom';

export const handleSignOut = async (
  auth: Auth,
  user: User,
  navigation: NavigateFunction
): Promise<void> => {
  await signOut(auth);

  if (user.providerData[0].photoURL.includes('kakao')) {
    const { Kakao, location } = window;
    const CLIENT_ID = import.meta.env.VITE_KAKAO_API_KEY;
    const LOGOUT_REDIRECT_URI = 'http://localhost:3000';

    // Kakao API 토큰 만료 설정
    await Kakao.Auth.logout();

    // Kakao 계정 로그아웃 설정
    location.replace(
      `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
    );
  } else {
    alert('로그아웃이 되었습니다.');
    navigation('/');
  }
};
