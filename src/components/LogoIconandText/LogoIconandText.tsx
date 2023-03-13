import { LogoText } from '@/components/index';
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
      <img src="../assets/logo.svg" alt="logo" />
      <LogoText small={logoTextSmall} />
    </div>
  );
}
