import { db } from '@/firebase/app';
import classNames from 'classnames';
import { auth } from '@/firebase/auth';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import classes from './Message.module.scss';
import { authImagState } from '@/@recoil/authImgState';
import defaultAvatar from '/public/assets/defaultAvatars.svg';
import { collection, doc, getDoc, onSnapshot } from '@firebase/firestore';

interface MessageProps {
  message: {
    text: string;
    photoURL: string;
    uid: string;
  };
}

export function Message({ message }: MessageProps) {
  const [photoURL, setPhotoURL] = useState<string>(defaultAvatar);

  //authImagState는 현재 로그인한 사용자의 프로필 이미지
  const imageUrl = useRecoilValue(authImagState);
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (!message.uid) {
      return;
    }

    const userRef = doc(collection(db, 'users'), message.uid);

    //해당 데이터를 필요로 하지 않는 경우, unsubscribe()를 호출하여 해당 데이터의 수신을 중단
    let unsubscribe: (() => void) | undefined;

    async function getUserDoc() {
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setPhotoURL(userData.photoURL || defaultAvatar);
        setDisplayName(userData.displayName || '');
      }
    }

    getUserDoc().then(() => {
      unsubscribe = onSnapshot(userRef, (docSnap) => {
        const userData = docSnap.data();

        if (userData?.displayName) {
          setDisplayName(userData.displayName);
        }
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [message.uid]);

  // 현재 메시지의 프로필 이미지 URL을 반환
  function getImageUrl() {
    if (imageUrl) {
      return isCurrentUser() ? imageUrl : photoURL;
    }

    return photoURL;
  }
  // 현재 사용자가 메시지 작성자인지 확인
  function isCurrentUser() {
    return auth.currentUser?.uid === message.uid;
  }

  return (
    <div className={classNames(classes.message, classes.owner)}>
      <div className={classes.messageInfo}>
        <p>{displayName}</p>
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
