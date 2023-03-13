import classes from './Button.module.scss';

function Button({
  backgroundColor,
  isSmall,
  widthValue,
  heightValue,
  colorValue,
  text,
}) {
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
        isSmall
          ? `${classes[backgroundColor]} ${classes.small}`
          : classes[backgroundColor]
      }
      style={buttonStyle}
    >
      {text}
    </button>
  );
}

export default Button;
