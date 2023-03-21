import { Message, SendMessage } from '../index';
import classes from './Messages.module.scss';
import { db } from '@/firebase/app';
import { useEffect, useRef, useState } from 'react';
import { query, collection, orderBy, onSnapshot } from '@firebase/firestore';
export const Messages = () => {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

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

  console.log(messages);
  return (
    <>
      <div className={classes.messages}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </div>
      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  );
};
