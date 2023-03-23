import classes from './MyPage.module.scss';
import { Input, ProfileImage } from '@/components';
import { useState, useEffect } from 'react';
import { signOut } from '@firebase/auth';
import { auth } from '@/firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigation = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfoEdit, setUserInfoEdit] = useState<string>('회원정보수정');

  useEffect(() => {
    const userController = document.getElementById('memberController');

    if (isEditing) {
      setUserInfoEdit('수정 완료');
      userController.style.color = 'red';
    } else {
      setUserInfoEdit('회원정보수정');
      userController.style.color = 'black';
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
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
                  disabled={!isEditing}
                />
              </form>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Email"
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
                  disabled={!isEditing}
                />
              </form>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Address"
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
            onClick={handleEditClick}
          >
            {userInfoEdit}
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
