import { useEffect } from 'react';
import classes from './Chat.module.scss';
import { useLocation } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Sidebar } from '@/components/ChatDialog/Sidebar/Sidebar';
import { Chatting } from '@/components/ChatDialog/Chatting/Chatting';

export default function Chat() {
  useDocumentTitle('슬기로운 N밥생활 | 채팅');

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <>
      <h2 className="a11yHidden">채팅</h2>
      <div className={classes.chat}>
        <Sidebar />
        <Chatting />
      </div>
    </>
  );
}
