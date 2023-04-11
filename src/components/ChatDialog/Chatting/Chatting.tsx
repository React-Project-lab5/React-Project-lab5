/* eslint-disable jsx-a11y/anchor-is-valid */
import { Messages } from '../index';
import { Link } from 'react-router-dom';
import classes from './Chatting.module.scss';

export function Chatting() {
  return (
    <div className={classes.chatting}>
      <div className={classes.chattingInfo}>
        <img src="../assets/logo.svg" alt=" " />
        <p>밥조</p>
        <div className={classes.chatIcons}>
          <Link to={'/myPage'}>
            <img src="../assets/chatAvatars.svg" alt="마이 페이지로 가기" />
          </Link>
          <img src="../assets/chatMessage.svg" alt=" " />
        </div>
      </div>

      <Messages />
    </div>
  );
}
