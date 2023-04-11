import classes from './LogoText.module.scss';

interface Props {
  small?: boolean;
}

export function LogoText({ small }: Props) {
  const logoTextSmall = small;
  let logoTextClass = null;

  if (logoTextSmall) {
    logoTextClass = classes.logoTextSmall;
  } else {
    logoTextClass = classes.logoText;
  }

  return (
    <div className={logoTextClass}>
      <h1 className="a11yHidden">슬기로운 N밥생활</h1>
      <span>슬기로운</span>
      <span> N밥생활</span>
    </div>
  );
}
