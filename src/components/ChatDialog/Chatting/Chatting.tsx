import avatar from '/public/assets/chatAvatars.svg';
import message from '/public/assets/chatMessage.svg';
import classes from './Chatting.module.scss';
import { SendMessage, Messages } from '../index';
import { Link } from 'react-router-dom';

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
          <Link to={'/myPage'}>
            <img src={avatar} alt="마이 페이지로 가기" />
          </Link>
          <img src={message} alt="메세지 창으로 가기" />
        </div>
      </div>
      <Messages />
      <SendMessage />
    </div>
  );
}
