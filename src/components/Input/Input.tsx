import React from 'react';
import classes from './Input.module.scss';
import classNames from 'classnames';

interface Props {
  maxWidthValue: string | number;
  heightValue: string | number;
  labelText: string;
  placeHolder: string;
  isA11yHidden: boolean;
  onChange?: () => void;
}

export function Input({
  maxWidthValue,
  heightValue,
  labelText,
  placeHolder,
  isA11yHidden,
  onChange,
}: Props) {
  const inputStyle = {
    maxWidth: maxWidthValue,
    height: heightValue,
  };

  return (
    <React.Fragment>
      <label
        htmlFor={labelText}
        aria-label={labelText + ' 라벨'}
        className={classNames(classes.inputLabel, {
          ['a11yHidden']: isA11yHidden,
        })}
      >
        {labelText}
      </label>
      <input
        type="text"
        id={labelText}
        aria-label={labelText + ' 입력'}
        className={classNames(classes['inputList'], className)}
        style={inputStyle}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </React.Fragment>
  );
}
