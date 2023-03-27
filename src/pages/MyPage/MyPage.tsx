import classes from './MyPage.module.scss';
import { Input, ProfileImage } from '@/components';
import { useState, useEffect, useCallback } from 'react';
import {
  signOut,
  deleteUser,
  updateProfile,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from '@firebase/auth';
import { auth } from '@/firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  doc,
  collection,
  getDoc,
  setDoc,
  deleteDoc,
} from '@firebase/firestore';
import { db } from '@/firebase/app';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function MyPage() {
  useDocumentTitle('슬기로운 N밥 생활 | 마이 페이지');

  const navigation = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const user = auth.currentUser;

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
          } else {
            user.providerData.forEach((profile) => {
              setName(profile.displayName);
              setEmail(profile.email);
            });
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

  /* ------------------------------- '회원정보수정' 클릭 ------------------------------ */
  const handleEditClick = () => {
    if (user.providerData[0].providerId === 'google.com') {
      alert('구글 및 카카오 사용자는 회원정보수정이 불가합니다!');
    } else {
      setIsEditing(!isEditing);
    }
  };

  /* -------------------------------- 수정 완료 클릭 -------------------------------- */
  const handleSaveClick = () => {
    /* ----- Firestore 업데이트 ----- */
    const getUserRef = doc(collection(db, 'users'), user.uid);
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

    /* ----- currentUser 업데이트 (displayName, email) ----- */
    updateProfile(user, { displayName: name })
      .then(() => {
        console.log('사용자 이름 변경 완료!');
      })
      .catch((error) => {
        console.log('사용자 이름 변경 실패', error);
      });

    updateEmail(user, email)
      .then(() => {
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userProvidedPassword = doc.data().password;

            const credential = EmailAuthProvider.credential(
              user.email,
              userProvidedPassword
            );
            reauthenticateWithCredential(user, credential)
              .then(() => {
                console.log('재인증에 성공하였습니다.');
                alert('회원 정보가 수정되었습니다!');
              })
              .catch((error) => {
                console.log('재인증에 실패하였습니다.', error);
              });
          }
        });
        console.log('사용자 이메일 변경 완료!');
      })
      .catch((error) => {
        console.log('사용자 이메일 변경 실패!', error);
      });
  };

  /* ---------------------------------- 로그아웃 ---------------------------------- */
  const handleSignOut = () => {
    signOut(auth);
    alert('로그아웃이 되었습니다.');
    navigation('/');
  };
  /* ---------------------------------- 회원탈퇴 ---------------------------------- */
  const handleSignDropOut = () => {
    const user = auth.currentUser;

    deleteDoc(doc(db, 'users', user.uid));

    deleteUser(user)
      .then(() => {
        alert('회원 탈퇴 성공!');
        navigation('/');
      })
      .catch((error) => {
        console.log('회원 탈퇴 실패!', error);
      });
  };

  /* -------------------------- debounce 함수 직접 제작 코드 -------------------------- */
  const debounceFunction = (callback, delay) => {
    let timer;
    return (...args) => {
      // 실행한 함수(setTimeout())를 취소
      clearTimeout(timer);
      // delay가 지나면 callback 함수를 실행
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const printValue = useCallback(
    debounceFunction((value) => console.log(value), 500),
    []
  );

  const editName = (e: React.ChangeEvent<HTMLInputElement>) => {
    printValue(e.target.value);
    setName(e.target.value);
  };

  const editEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    printValue(e.target.value);
    setEmail(e.target.value);
  };

  const editPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    printValue(e.target.value);
    setPhoneNumber(e.target.value);
  };

  const editAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    printValue(e.target.value);
    setAddress(e.target.value);
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
                  onChange={editName}
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
                  onChange={editEmail}
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
                  onChange={editPhoneNumber}
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
                  onChange={editAddress}
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
          <button className={classes.userAbleItem} onClick={handleSignDropOut}>
            회원탈퇴
          </button>
        </div>
      </div>
    </section>
  );
}
