import classes from './Sidebar.module.scss';
import { Chattings, Navbar, Search } from '../index';

export function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <Navbar />
      <Search />
      <Chattings />
    </div>
  );
}
