import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from '@firebase/storage';
import { db } from '@/firebase/app';
import { storage } from '@/firebase/storage';
import { BsFillSendFill } from 'react-icons/bs';
import classes from './SendMessage.module.scss';
import { AuthContext } from '@/context/AuthContext';
import { FormEvent, useContext, useState } from 'react';
import Img from '/public/assets/chatImagePlaceholder.svg';
import { collection, addDoc, serverTimestamp } from '@firebase/firestore';

export function SendMessage() {
  const { currentUser } = useContext(AuthContext);

  const [input, setInput] = useState('');
  const [img, setImg] = useState(null);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') {
      alert('메시지를 입력하세요');
      return;
    }
    const { uid, displayName } = currentUser;

    if (img) {
      const uniqueId = img.name;
      const storageRef = ref(storage, uniqueId);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, 'messages'), {
              text: input,
              name: displayName,
              uid,
              createdAt: serverTimestamp(),
              photoURL: downloadURL,
            });
          });
        }
      );
    } else {
      await addDoc(collection(db, 'messages'), {
        text: input,
        name: displayName,
        uid,
        createdAt: serverTimestamp(),
      });
    }

    setInput('');
    setImg(null);
  };

  return (
    <form className={classes.input} onSubmit={handleSendMessage}>
      <div>
        <img src={img} alt="" />
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
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          name="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
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
