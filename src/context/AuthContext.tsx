import { auth } from '@/firebase/auth';
import { onAuthStateChanged } from '@firebase/auth';
import { createContext, useState, useEffect, ReactNode } from 'react';

export const AuthContext = createContext({
  currentUser: null,
});

type Props = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    //현재 로그인한 사용자 가져오기
    const unSub = onAuthStateChanged(auth, (user) => {
      // currentUser 속성을 사용하여 현재 로그인한 사용자를 가져올 수도 있습니다.
      // 사용자가 로그인 상태가 아니라면 currentUser 값이 null입니다.
      setCurrentUser(user);

      if (user) {
        localStorage.setItem('navUid', user.uid);
      }
    });

    return unSub;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
