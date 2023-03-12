import { LogoIconandText } from '@/components/LogoIconandText/LogoIconandText';
import { Nav } from '@/components/Nav/Nav';
import classes from './Header.module.scss';

export function Header() {
  return (
    <header className={classes.header}>
      <LogoIconandText small={true} />
      <Nav />
    </header>
  );
}
