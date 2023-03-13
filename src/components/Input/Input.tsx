import classes from './Input.module.scss';

export default function Input({ maxWidthValue }) {
  const inputStyle = {
    maxWidth: maxWidthValue,
  };
  return (
    <input type="text" className={classes['input-list']} style={inputStyle} />
  );
}
