/* eslint-disable jsx-a11y/anchor-is-valid */
import { LogoIconandText } from '@/components/LogoIconandText/LogoIconandText';
import { Link } from 'react-router-dom';
import { Nav } from '@/components/Nav/Nav';
import classes from './Header.module.scss';
import { useSetRecoilState } from 'recoil';
import { isActive } from '@/states/isActive';

export function Header() {
  const setActive = useSetRecoilState(isActive);

  const clickHamburger = () => {
    setActive((current) => !current);
  };

  return (
    <header className={classes.header}>
      <Link to="/mainPage">
        <LogoIconandText small={true} />
      </Link>
      <Nav onClick={clickHamburger} />
    </header>
  );
}
