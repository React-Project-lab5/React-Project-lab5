import { authImagState } from '@/states/authImgState';
import classNames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import classes from './Message.module.scss';

interface MessageProps {
  message: {
    text: string;
  };
}

export function Message({ message }: MessageProps) {
  const imageUrl = useRecoilValue(authImagState);

  return (
    <div className={classNames(classes.message, classes.owner)}>
      <div className={classes.messageInfo}>
        <img src={imageUrl} alt="" />
      </div>
      <div className={classes.messageContent}>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
