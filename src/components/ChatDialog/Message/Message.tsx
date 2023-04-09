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
  const [displayName, setDisplayName] = useState<string>('익명');

  const [name, setName] = useState('');
  const [userImg, setUserImg] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserRef = doc(collection(db, 'users'), user.uid);
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setName(userData.displayName);
            setUserImg(userData.photoURL);
          }
        });
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!message.uid) {
      return;
    }

    const userRef = doc(collection(db, 'users'), message.uid);

    //해당 데이터를 필요로 하지 않는 경우, unsubscribe()를 호출하여 해당 데이터의 수신을 중단
    let unsubscribe: (() => void) | undefined;

    const getUserDoc = async () => {
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setPhotoURL(userData.photoURL || defaultAvatar);
        setDisplayName(userData.displayName || '');
      }
    };

    // Firestore에서 실시간으로 유저 데이터를 가져와서 displayName 필드를 업데이트,
    // 변경 사항이 발생할 때마다 콜백 함수를 실행.
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
  const getImageUrl = () => {
    if (imageUrl) {
      return isCurrentUser() ? imageUrl : photoURL;
    } else {
      return defaultAvatar;
    }
  };

  // 현재 사용자가 메시지 작성자인지 확인
  const isCurrentUser = () => {
    return auth.currentUser?.uid === message.uid;
  };

  // 작성자에 따라 오른쪽 또는 왼쪽 정렬 클래스를 반환
  const getMessageAlignment = () => {
    return isCurrentUser() ? classes.owner : classes.guest;
  };

  return (
    <div className={classNames(classes.message, getMessageAlignment())}>
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
