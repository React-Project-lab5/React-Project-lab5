import classes from './Navbar.module.scss';
import { signOut } from '@firebase/auth';
import { auth } from '@/firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
export function Navbar() {
  const navigation = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth);
    navigation('/');
  };

  return (
    <div className={classes.navbar}>
      <p className={classes.logo}>슬기로운 N밥생활</p>
      <div className={classes.user}>
        <img
          src="https://avatars.githubusercontent.com/u/104710243?v=4"
          alt="사용자"
        />
        <p>{currentUser.displayName}</p>
        <button type="button" onClick={handleSignOut}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
