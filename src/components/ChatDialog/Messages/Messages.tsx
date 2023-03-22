import { db } from '@/firebase/app';
import classes from './Messages.module.scss';
import { Message, SendMessage } from '../index';
import { useEffect, useRef, useState } from 'react';
import { query, collection, orderBy, onSnapshot } from '@firebase/firestore';

export const Messages = () => {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);

  // 메세지 생성 -----------------------------------------------------------------
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  // 메세지 생성 시 스크롤 이동 ----------------------------------------------------------
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className={classes.messages} ref={messageBoxRef}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </div>
      <SendMessage />
    </>
  );
};
