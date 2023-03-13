import { LogoText } from '@/components/index';
import logo from '@/assets/logo.svg';
import classes from './LogoIconandText.module.scss';

export function LogoIconandText({ small }) {
  const logoTextSmall = small;
  let logoTextClass = null;

  if (logoTextSmall) {
    logoTextClass = classes.logoTextSmall;
  } else {
    logoTextClass = classes.logoIconandText;
  }

  return (
    <div className={logoTextClass}>
      <img src={logo} alt="logo" />
      <LogoText small={logoTextSmall} />
    </div>
  );
}
