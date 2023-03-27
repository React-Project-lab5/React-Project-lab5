import classes from './Chat.module.scss';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Sidebar } from '@/components/ChatDialog/Sidebar/Sidebar';
import { Chatting } from '@/components/ChatDialog/Chatting/Chatting';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Chat() {
  useDocumentTitle('슬기로운 N밥 생활 | 채팅');

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className={classes.chat}>
      <Sidebar />
      <Chatting />
    </div>
  );
}
