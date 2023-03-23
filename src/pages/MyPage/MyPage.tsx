import classes from './MyPage.module.scss';
import { Input, ProfileImage } from '@/components';
import { useState, useEffect } from 'react';
import { signOut } from '@firebase/auth';
import { auth } from '@/firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, setDoc } from '@firebase/firestore';
import { db } from '@/firebase/app';

export default function MyPage() {
  const navigation = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserRef = doc(collection(db, 'users'), user.uid);
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setName(userData.displayName);
            setEmail(userData.email);
            setPhoneNumber(userData.phoneNumber);
            setAddress(userData.address);
          }
        });
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const userController = document.getElementById('memberController');

    if (isEditing) {
      userController.style.color = 'red';
    } else {
      userController.style.color = 'black';
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    const getUserRef = doc(collection(db, 'users'), auth.currentUser.uid);
    setDoc(
      getUserRef,
      {
        displayName: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      },
      { merge: true }
    ).then(() => {
      setIsEditing(false);
    });
  };

  const handleSignOut = () => {
    signOut(auth);
    navigation('/');
  };

  return (
    <section className={classes.myPageSection}>
      <div className={classes.myPageContainer}>
        <h1 className={classes.myPageTitle}>마이페이지</h1>
        <div className={classes.userContainer}>
          <ProfileImage />
          <div className={classes.inputContainer}>
            <div className={classes.userInfoContainer}>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </form>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </form>
            </div>
            <div className={classes.userInfoContainer}>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={!isEditing}
                />
              </form>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                />
              </form>
            </div>
          </div>
        </div>
        <div className={classes.userAbleContainer}>
          <button
            id="memberController"
            className={classes.userAbleItem}
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? '수정 완료' : '회원정보수정'}
          </button>
          <span>|</span>
          <button className={classes.userAbleItem} onClick={handleSignOut}>
            로그아웃
          </button>
          <span>|</span>
          <button className={classes.userAbleItem}>회원탈퇴</button>
        </div>
      </div>
    </section>
  );
}
