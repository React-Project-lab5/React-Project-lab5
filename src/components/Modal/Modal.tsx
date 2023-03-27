import React from 'react';
import classNames from 'classnames';
import classes from './Modal.module.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
  role?: React.AriaRole;
}

export const Modal = ({ children, className, role }: Props) => {
  return (
    <div
      role={role}
      className={classNames(classes['modalRealContent'], className)}
      tabIndex={0}
      aria-modal="true"
    >
      {children}
    </div>
  );
};
