import { db } from '@/firebase/app';
import { auth } from '@/firebase/auth';
import { useState, useEffect } from 'react';
import { updateProfile } from '@firebase/auth';
import classes from './ProfileImage.module.scss';
import { storage } from '@/firebase/storage/index';
import defaultAvatar from '/public/assets/chatAvatars.svg';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { doc, collection, getDoc, setDoc } from '@firebase/firestore';

export function ProfileImage() {
  const [ImageUrl, setImageUrl] = useState<string>('');
  const user = auth.currentUser;

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserRef = doc(collection(db, 'users'), user.uid);
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setImageUrl(userData.photoURL);
          } else {
            setImageUrl(user.providerData[0].photoURL);
          }
        });
      }
    });
    return unsub;
  });

  function fileInput() {
    if (user.providerData[0].providerId === 'google.com') {
      alert('구글 및 카카오 사용자는 회원정보수정이 불가합니다!');
    } else {
      const fileInput = document.getElementById('fileInput');
      fileInput.click();
    }
  }

  const onImageChange = (
    e: React.ChangeEvent<EventTarget & HTMLInputElement>
  ) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file) return null;

    const storageRef = ref(storage, `file/${file[0].name}`);
    const uploadTask = uploadBytes(storageRef, file[0]);
    const currentUserUid = user?.uid;

    uploadTask.then((snapshot) => {
      e.target.value = '';
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File availabel at', downloadURL);
        setImageUrl(downloadURL);

        // Firestore에 이미지 URL 저장
        const setUserRef = doc(collection(db, 'users'), currentUserUid);
        setDoc(setUserRef, { photoURL: downloadURL }, { merge: true });

        // currentUser에 이미지 URL 업데이트
        updateProfile(user, { photoURL: downloadURL })
          .then(() => {
            console.log('프로필 사진 변경 완료!');
          })
          .catch((error) => {
            console.log('프로필 사진 변경 실패!', error);
          });
      });
    });
  };

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onImageChange}
      />
      <button
        className={classes.userPictureButton}
        type="button"
        onClick={fileInput}
        tabIndex={0}
      >
        <img
          className={classes.userPicture}
          src={ImageUrl || defaultAvatar}
          alt="프로필사진"
          title="프로필사진 변경하기"
        />
      </button>
    </div>
  );
}
