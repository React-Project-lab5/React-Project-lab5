import classes from './LogoText.module.scss';

export function LogoText({ small }) {
  const logoTextSmall = small;
  let logoTextClass = null;

  if (logoTextSmall) {
    logoTextClass = classes.logoTextSmall;
  } else {
    logoTextClass = classes.logoText;
  }

  return (
    <div className={logoTextClass}>
      <span>슬기로운</span>
      <span> N밥생활</span>
    </div>
  );
}
