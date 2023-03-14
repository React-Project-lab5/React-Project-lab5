import React from 'react';
import classes from './Input.module.scss';

interface Props {
  widthValue: string | number;
  heightValue: string | number;
  labelText: string;
  placeHolder: string;
  isA11yHidden: boolean;
}

export function Input({
  widthValue,
  heightValue,
  labelText,
  placeHolder,
  isA11yHidden,
}: Props) {
  const inputStyle = {
    width: widthValue,
    height: heightValue,
  };

  return (
    <React.Fragment>
      <label
        htmlFor={labelText}
        aria-label={labelText + ' 라벨'}
        className={
          isA11yHidden === true
            ? `${classes.inputLabel} ${'a11yHidden'}`
            : `${classes.inputLabel}`
        }
      >
        {labelText}
      </label>
      <input
        type="text"
        id={labelText}
        aria-label={labelText + ' 입력'}
        className={classes['inputList']}
        style={inputStyle}
        placeholder={placeHolder}
      />
    </React.Fragment>
  );
}
