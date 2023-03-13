import { Chatting } from '@/components/ChatDialog/Chatting/Chatting';
import { Sidebar } from '@/components/ChatDialog/Sidebar/Sidebar';
import classes from './Chat.module.scss';

export default function Chat() {
  return (
    <div className={classes.chat}>
      <Sidebar />
      <Chatting />
    </div>
  );
}
