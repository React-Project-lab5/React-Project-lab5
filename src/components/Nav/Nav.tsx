import { NavLink } from 'react-router-dom';
import classes from './Nav.module.scss';

export function Nav() {
  return (
    <nav className={classes.nav}>
      <div>
        <NavLink to="/mainPage">홈</NavLink>
      </div>
      <div>
        <NavLink to="/recommend">추천</NavLink>
      </div>
      <div>
        <NavLink to="/chat">채팅</NavLink>
      </div>
      <div>
        <NavLink to="/myPage">마이페이지</NavLink>
      </div>
    </nav>
  );
}
