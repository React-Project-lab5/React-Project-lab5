/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { LogoIconandText } from '@/components/LogoIconandText/LogoIconandText';
import { Nav } from '@/components/Nav/Nav';
import classes from './Header.module.scss';
import { useSetRecoilState } from 'recoil';
import { isActive } from '@/@recoil/isActive';

export function Header() {
  const setActive = useSetRecoilState(isActive);

  const clickHamburger = () => {
    setActive((current) => !current);
  };

  const reload = () => window.location.replace('/mainPage');

  return (
    <header className={classes.header}>
      <div onClick={reload} className={classes.headerDiv}>
        <LogoIconandText small={true} />
      </div>
      <Nav onClick={clickHamburger} />
    </header>
  );
}
