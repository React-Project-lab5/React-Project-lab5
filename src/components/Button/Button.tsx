import classes from './Button.module.scss';
import classNames from 'classnames';

interface Props {
  backgroundColor: 'orange' | 'red';
  isSmall: boolean;
  widthValue: string | number;
  heightValue: string | number;
  colorValue: string;
  text: string;
  type: string;
  className?: string;
  onClick?: () => void;
}

export function Button({
  backgroundColor,
  isSmall,
  widthValue,
  heightValue,
  colorValue,
  text,
  type = 'button',
  className,
  onClick,
}: Props) {
  const buttonStyle = {
    width: widthValue,
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
