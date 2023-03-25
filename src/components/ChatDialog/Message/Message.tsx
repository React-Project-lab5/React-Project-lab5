import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import classes from './Message.module.scss';
import { authImagState } from '@/states/authImgState';
import defaultAvatar from '/public/assets/defaultAvatars.svg';

interface MessageProps {
  message: {
    text: string;
    photoURL: string;
  };
}

export function Message({ message }: MessageProps) {
  const imageUrl = useRecoilValue(authImagState);

  return (
    <div className={classNames(classes.message, classes.owner)}>
      <div className={classes.messageInfo}>
        {imageUrl ? (
          <img src={imageUrl} alt="로그인된 사용자 프로필" />
        ) : (
          <img src={defaultAvatar} alt="로그인된 사용자 프로필" />
        )}
      </div>
      <div className={classes.messageContent}>
        {message.photoURL && <img src={message.photoURL} alt={'채팅 이미지'} />}
        <p>{message.text}</p>
      </div>
    </div>
  );
}
