/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { useRef } from 'react';
import classes from './Message.module.scss';

export function Message({ message }) {
  const scroll = useRef();
  return (
    <div className={classNames(classes.message, classes.owner)}>
      <div className={classes.messageInfo}>
        <img
          src="https://avatars.githubusercontent.com/u/38703262?v=4"
          alt=""
        />
      </div>
      <div className={classes.messageContent}>
        <p>{message.text}</p>
      </div>
      <span ref={scroll}></span>
    </div>
  );
}
