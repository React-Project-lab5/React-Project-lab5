import classes from './Navbar.module.scss';
export function Navbar() {
  return (
    <div className={classes.navbar}>
      <p className={classes.logo}>슬기로운 N밥생활</p>
      <div className={classes.user}>
        <img
          src="https://avatars.githubusercontent.com/u/104710243?v=4"
          alt="사용자"
        />
        <p>변혜빈</p>
        <button type="button">로그아웃</button>
      </div>
    </div>
  );
}
