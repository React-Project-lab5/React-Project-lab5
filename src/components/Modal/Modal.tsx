import React from 'react';
import classes from './Modal.module.scss';

export const Modal = ({ children }) => {
  return <div className={classes.modalRealContent}>{children}</div>;
};
