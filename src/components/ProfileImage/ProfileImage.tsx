import classes from './ProfileImage.module.scss';
import { getDownloadURL, uploadBytes, ref } from '@firebase/storage';
import { storage } from '@/firebase/storage/index';
import { useState } from 'react';

function fileInput() {
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
}

export function ProfileImage() {
  const [imageURL, setImageURL] = useState<string>(
    '/public/assets/avatar_1.svg'
  );

  const onImageChange = (
    e: React.ChangeEvent<EventTarget & HTMLInputElement>
  ) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file) return null;

    const storageRef = ref(storage, `file/${file[0].name}`);
    const uploadTask = uploadBytes(storageRef, file[0]);

    uploadTask.then((snapshot) => {
      e.target.value = '';
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File availabel at', downloadURL);
        setImageURL(downloadURL);
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
          src={imageURL}
          alt="프로필사진"
          title="프로필사진 변경하기"
        />
      </button>
    </div>
  );
}
