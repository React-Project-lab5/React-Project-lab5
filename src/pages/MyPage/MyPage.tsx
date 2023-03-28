import {
  signOut,
  deleteUser,
  updateEmail,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from '@firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
} from '@firebase/firestore';
import { debounce } from 'lodash';
import { db } from '@/firebase/app';
import { auth } from '@/firebase/auth';
import classes from './MyPage.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, ProfileImage } from '@/components';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function MyPage() {
  useDocumentTitle('슬기로운 N밥 생활 | 마이 페이지');

  const navigation = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    // 사용자 정보, 전화번호 또는 주소가 존재할 경우, 로딩 상태 false로 설정
    if (user && (phoneNumber || address)) {
      setIsLoading(false);
    }
  }, [address, phoneNumber, user]);

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
            // Firestore 문서 정보가 없다면? ➡️ 로딩 상태 false로 설정
            setIsLoading(false);
          }
        });
      }
    });
    return unsub;
  }, []);

  /* ------------------------------- '회원정보수정' 클릭 ------------------------------ */
  const handleEditClick = () => {
    if (
      user.providerData[0].providerId === 'google.com' ||
      user.providerData[0].photoURL.includes('kakao')
    ) {
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

  const deleteDocument = (member: string) => {
    const user = auth.currentUser;
    deleteDoc(doc(db, 'users', user.uid));
    deleteUser(user)
      .then(() => {
        alert(`${member} 되었습니다.`);
        navigation('/');
      })
      .catch((error) => {
        console.log(`${member} 실패!`, error);
      });
  };

  /* ---------------------------------- 로그아웃 ---------------------------------- */
  const handleSignOut = () => {
    if (user.providerData[0].photoURL.includes('kakao')) {
      deleteDocument('로그아웃');
    } else {
      signOut(auth);
      alert('로그아웃이 되었습니다.');
      navigation('/');
    }
  };
  /* ---------------------------------- 회원탈퇴 ---------------------------------- */
  const handleSignDropOut = () => {
    deleteDocument('회원 탈퇴');
  };

  /* -------------------------------- debounce -------------------------------- */
  const editName = debounce((e) => {
    console.log(e.target.value);
    setName(e.target.value);
  }, 500);

  const editEmail = debounce((e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }, 500);

  const editPhoneNumber = debounce((e) => {
    console.log(e.target.value);
    setPhoneNumber(e.target.value);
  }, 500);

  const editAddress = debounce((e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  }, 500);

  if (isLoading) {
    return <div role="alert"> 사용자 정보 로딩 중... </div>;
  }

  return (
    <section className={classes.myPageSection}>
      <div className={classes.myPageContainer}>
        <h1 className={classes.myPageTitle}>마이페이지</h1>
        <div className={classes.userContainer}>
          <ProfileImage />
          <div className={classes.inputContainer}>
            <div className={classes.userInfoContainer}>
              <div>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Name"
                  defaultValue={user.displayName || undefined}
                  onChange={editName}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Email"
                  defaultValue={user.email}
                  onChange={editEmail}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className={classes.userInfoContainer}>
              <div>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Phone"
                  defaultValue={phoneNumber}
                  onChange={editPhoneNumber}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Address"
                  defaultValue={address}
                  onChange={editAddress}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.userAbleContainer}>
          <button
            className={classes.userAbleItem}
            style={isEditing ? { color: 'red' } : { color: 'black' }}
            onClick={isEditing ? handleSaveClick : handleEditClick}
            tabIndex={0}
          >
            {isEditing ? '수정 완료' : '회원정보수정'}
          </button>
          <span>|</span>
          <button
            className={classes.userAbleItem}
            onClick={handleSignOut}
            tabIndex={0}
          >
            로그아웃
          </button>
          <span>|</span>
          <button
            className={classes.userAbleItem}
            onClick={handleSignDropOut}
            tabIndex={0}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </section>
  );
}
