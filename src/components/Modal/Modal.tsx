import classNames from 'classnames';
import React from 'react';
import classes from './Modal.module.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const Modal = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(classes['modalRealContent'], className)}
      aria-modal="true"
    >
      {children}
    </div>
  );
};
