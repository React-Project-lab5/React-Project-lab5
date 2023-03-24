import classes from './ProfileImage.module.scss';
import { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { storage } from '@/firebase/storage/index';
import { doc, collection, getDoc, setDoc } from '@firebase/firestore';
import { auth } from '@/firebase/auth';
import { db } from '@/firebase/app';
import { updateProfile } from '@firebase/auth';

function fileInput() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
}

export function ProfileImage() {
  const [imageURL, setImageURL] = useState<string>('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserRef = doc(collection(db, 'users'), user.uid);
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setImageURL(userData.photoURL);
          }
        });
      }
    });
    return unsub;
  });

  const onImageChange = (
    e: React.ChangeEvent<EventTarget & HTMLInputElement>
  ) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file) return null;

    const storageRef = ref(storage, `file/${file[0].name}`);
    const uploadTask = uploadBytes(storageRef, file[0]);
    const currentUserUid = auth.currentUser?.uid;

    uploadTask.then((snapshot) => {
      e.target.value = '';
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File availabel at', downloadURL);
        setImageURL(downloadURL);

        // Firestore에 이미지 URL 저장
        const setUserRef = doc(collection(db, 'users'), currentUserUid);
        setDoc(setUserRef, { photoURL: downloadURL }, { merge: true });

        // currentUser에 이미지 URL 업데이트
        updateProfile(auth.currentUser, { photoURL: downloadURL })
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
      >
        <img
          className={classes.userPicture}
          src={imageURL || '/public/assets/defaultImage.svg'}
          alt="프로필사진"
          title="프로필사진 변경하기"
        />
      </button>
    </div>
  );
}
