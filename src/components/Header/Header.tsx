import { LogoIconandText } from '@/components/LogoIconandText/LogoIconandText';
import { Link } from 'react-router-dom';
import { Nav } from '@/components/Nav/Nav';
import classes from './Header.module.scss';

export function Header() {
  return (
    <header className={classes.header}>
      <Link to="/">
        <LogoIconandText small={true} />
      </Link>
      <Nav />
    </header>
  );
}
