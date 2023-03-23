import classes from './MyPage.module.scss';
import { Input, ProfileImage } from '@/components';
import { useState } from 'react';
import { signOut } from '@firebase/auth';
import { auth } from '@/firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigation = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [userInfoEdit, setUserInfoEdit] = useState<string>('회원정보수정');
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setUserInfoEdit('수정 완료');
    } else {
      setUserInfoEdit('회원정보수정');
    }
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
                  disabled={isEditing}
                />
              </form>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Email"
                  disabled={isEditing}
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
                  disabled={isEditing}
                />
              </form>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Address"
                  disabled={isEditing}
                />
              </form>
            </div>
          </div>
        </div>
        <div className={classes.userAbleContainer}>
          <ul>
            <li className={classes.userAbleItem} onClick={handleEditClick}>
              {userInfoEdit}
            </li>
            <li className={classes.userAbleItem} onClick={handleSignOut}>
              로그아웃
            </li>
            <li className={classes.userAbleItem}>회원탈퇴</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
