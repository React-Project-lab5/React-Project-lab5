import classNames from 'classnames';
import classes from './Message.module.scss';
export const Message = () => {
  return (
    <div className={classNames(classes.message, classes.owner)}>
      <div className={classes.messageInfo}>
        <img
          src="https://avatars.githubusercontent.com/u/38703262?v=4"
          alt=""
        />
        <span>지금</span>
      </div>
      <div className={classes.messageContent}>
        <p>안녕하세요☺️</p>
        <img
          src="https://avatars.githubusercontent.com/u/38703262?v=4"
          alt=""
        />
      </div>
    </div>
  );
};
