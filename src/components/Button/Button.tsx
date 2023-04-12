import classNames from 'classnames';
import classes from './Button.module.scss';

interface Props {
  backgroundColor?: 'orange' | 'red';
  isSmall?: boolean;
  maxWidthValue?: string | number;
  heightValue?: string | number;
  colorValue?: string;
  text: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
}

export function Button({
  backgroundColor,
  isSmall,
  maxWidthValue,
  heightValue,
  colorValue,
  text,
  type = 'button',
  className,
  onClick,
}: Props) {
  const buttonStyle = {
    maxWidth: maxWidthValue,
    height: heightValue,
    color: colorValue,
  };

  return (
    <button
      type={type}
      aria-label={text + ' 버튼'}
      className={classNames(
        className,
        classes.button,
        classes[backgroundColor],
        { [classes.small]: isSmall }
      )}
      style={buttonStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
