import { Chatting } from '@/components/ChatDialog/Chatting/Chatting';
import { Sidebar } from '@/components/ChatDialog/Sidebar/Sidebar';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import classes from './Chat.module.scss';

export default function Chat() {
  useDocumentTitle('슬기로운 N밥 생활 | 채팅');

  return (
    <div className={classes.chat}>
      <Sidebar />
      <Chatting />
    </div>
  );
}
