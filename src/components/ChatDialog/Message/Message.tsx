import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import classes from './Message.module.scss';
import { authImagState } from '@/@recoil/authImgState';
import defaultAvatar from '/public/assets/defaultAvatars.svg';
import { collection, doc, getDoc } from '@firebase/firestore';
import { db } from '@/firebase/app';
import { auth } from '@/firebase/auth';

interface MessageProps {
  message: {
    text: string;
    photoURL: string;
    uid: string;
  };
}

export function Message({ message }: MessageProps) {
  const [photoURL, setPhotoURL] = useState<string>(defaultAvatar);
  const imageUrl = useRecoilValue(authImagState);

  useEffect(() => {
    async function getUserDoc() {
      const docRef = doc(collection(db, 'users'), message.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setPhotoURL(userData.photoURL || defaultAvatar);
      }
    }

    getUserDoc();
  }, [message.uid]);

  function getImageUrl() {
    if (message.photoURL) {
      return message.photoURL;
    }

    return isCurrentUser() ? imageUrl : photoURL;
  }

  function isCurrentUser() {
    return auth.currentUser?.uid === message.uid;
  }

  return (
    <div className={classNames(classes.message, classes.owner)}>
      <div className={classes.messageInfo}>
        <img
          src={getImageUrl()}
          alt={
            isCurrentUser()
              ? '로그인된 사용자의 프로필 이미지'
              : '메시지를 작성한 사용자의 프로필 이미지'
          }
        />
      </div>
      <div className={classes.messageContent}>
        {message.photoURL && <img src={message.photoURL} alt={'채팅 이미지'} />}
        <p>{message.text}</p>
      </div>
    </div>
  );
}
