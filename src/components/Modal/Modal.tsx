import React from 'react';
import classes from './Modal.module.scss';

interface Props {
  children?: React.ReactNode;
}

export const Modal = ({ children }: Props) => {
  return <div className={classes.modalRealContent}>{children}</div>;
};
