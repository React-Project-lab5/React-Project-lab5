import classes from './Input.module.scss';

export function Input({ widthValue, heightValue, labelText, placeHolder }) {
  const inputStyle = {
    width: widthValue,
    height: heightValue,
  };

  return (
    <div className={classes['inputContainer']}>
      <label htmlFor={labelText} className={classes['inputLabel']}>
        {labelText ? labelText : null}
      </label>
      <input
        type="text"
        className={classes['inputList']}
        style={inputStyle}
        placeholder={placeHolder}
      />
    </div>
  );
}
