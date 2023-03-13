import { Message } from '../index';
import classes from './Messages.module.scss';
export const Messages = () => {
  return (
    <div className={classes.messages}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};
