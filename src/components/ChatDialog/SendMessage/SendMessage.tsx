import classes from './SendMessage.module.scss';
import Img from '/public/assets/chatImagePlaceholder.svg';
import { BsFillSendFill } from 'react-icons/bs';
import { useContext, useState } from 'react';
import { collection, addDoc, serverTimestamp } from '@firebase/firestore';
import { AuthContext } from '@/context/AuthContext';
import { db } from '@/firebase/app';
import { MutableRefObject } from 'react';

interface Props {
  scroll: MutableRefObject<HTMLDivElement | null>;
}

export function SendMessage({ scroll }: Props) {
  const { currentUser } = useContext(AuthContext);

  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('메시지를 입력하세요');
      return;
    }
    const { uid, displayName } = currentUser;
    await addDoc(collection(db, 'messages'), {
      text: input,
      name: displayName,
      uid,
      createdAt: serverTimestamp(),
    });
    setInput('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form className={classes.input} onSubmit={sendMessage}>
      <div>
        <label htmlFor="message" className="a11yHidden">
          메세지 입력
        </label>
        <input
          type="text"
          placeholder="메시지를 입력하세요."
          name="text"
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className={classes.send}>
        <input type="file" style={{ display: 'none' }} id="file" name="file" />
        <label htmlFor="file">
          <img src={Img} alt="이미지 업로드" />
        </label>

        <button type="submit">
          <BsFillSendFill />
        </button>
      </div>
    </form>
  );
}
