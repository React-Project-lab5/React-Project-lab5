import classes from './MyPage.module.scss';
import { Input } from '@/components';

export default function MyPage() {
  return (
    <section className={classes.myPageSection}>
      <div className={classes.myPageContainer}>
        <h1 className={classes.myPageTitle}>마이페이지</h1>
        <div className={classes.userContainer}>
          <img
            className={classes.userPicture}
            src="/public/assets/avatar_1.svg"
            alt="프로필 사진"
            width={300}
            height={300}
          />
          <div className={classes.inputContainer}>
            <div className={classes.userInfoContainer}>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Name"
                />
              </form>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Email"
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
                />
              </form>
              <form>
                <Input
                  className={classes.inputMobile}
                  maxWidthValue={290}
                  heightValue={80}
                  labelText="Address"
                />
              </form>
            </div>
          </div>
        </div>
        <div className={classes.userAbleContainer}>
          <span>회원정보수정</span>
          <span>|</span>
          <span>로그아웃</span>
          <span>|</span>
          <span>회원탈퇴</span>
        </div>
      </div>
    </section>
  );
}
