/* eslint-disable jsx-a11y/anchor-is-valid */
import { Messages } from '../index';
import { Link } from 'react-router-dom';
import logo from '/public/assets/logo.svg';
import classes from './Chatting.module.scss';
import avatar from '/public/assets/chatAvatars.svg';
import message from '/public/assets/chatMessage.svg';

export function Chatting() {
  return (
    <div className={classes.chatting}>
      <div className={classes.chattingInfo}>
        <img src={logo} alt="사용자 프로필" />
        <p>밥조</p>
        <div className={classes.chatIcons}>
          <Link to={'/myPage'}>
            <img src={avatar} alt="마이 페이지로 가기" />
          </Link>
          <img src={message} alt="메세지 창으로 가기" />
        </div>
      </div>

      <Messages />
    </div>
  );
}
