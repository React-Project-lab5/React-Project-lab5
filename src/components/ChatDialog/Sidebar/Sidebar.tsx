import { Chattings, Navbar, Search } from '../index';
import classes from './Sidebar.module.scss';

export function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <Navbar />
      <Search />
      <Chattings />
    </div>
  );
}
