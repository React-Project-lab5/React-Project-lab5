import avatar from '/public/assets/chatAvatars.svg';
import message from '/public/assets/chatMessage.svg';
import classes from './Chatting.module.scss';
import { ChattingInput, Messages } from '../index';

export function Chatting() {
  return (
    <div className={classes.chatting}>
      <div className={classes.chattingInfo}>
        <img
          src="https://avatars.githubusercontent.com/u/38703262?v=4"
          alt="사용자 프로필"
        />
        <span>김서현</span>
        <div className={classes.chatIcons}>
          <img src={avatar} alt="마이 페이지로 가기" />
          <img src={message} alt="메세지 창으로 가기" />
        </div>
      </div>
      <Messages />
      <ChattingInput />
    </div>
  );
}
