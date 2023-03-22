import classNames from 'classnames';
import classes from './Message.module.scss';

interface MessageProps {
  message: {
    text: string;
  };
}

export function Message({ message }: MessageProps) {
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
    </div>
  );
}
