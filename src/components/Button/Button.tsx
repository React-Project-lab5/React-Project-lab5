import classes from './Button.module.scss';

interface Props {
  backgroundColor: 'orange' | 'red';
  isSmall: boolean;
  widthValue: string | number;
  heightValue: string | number;
  colorValue: string;
  text: string;
}

export function Button({
  backgroundColor,
  isSmall,
  widthValue,
  heightValue,
  colorValue,
  text,
}: Props) {
  const buttonStyle = {
    width: widthValue,
    height: heightValue,
    color: colorValue,
  };

  return (
    <button
      type="button"
      aria-label={text + ' 버튼'}
      className={
        isSmall === true
          ? `${classes.button} ${classes[backgroundColor]} ${classes.small}`
          : `${classes.button} ${classes[backgroundColor]}`
      }
      style={buttonStyle}
    >
      {text}
    </button>
  );
}
