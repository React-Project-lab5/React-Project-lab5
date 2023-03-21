import classes from './Home.module.scss';
import {
  LogoIconandText,
  ButtonGoogle,
  ButtonKakao,
  Button,
  HomeBanner,
} from '@/components/index';

export default function Home() {
  return (
    <>
      <div className={classes['homeContainer']}>
        <div className={classes['homeLeftContent']}>
          <span>최소주문금액 채우기 힘드시다구요?</span>
          <HomeBanner />
        </div>

        <div className={classes.contents}>
          <LogoIconandText small={false} />
          <h2 className={classes.startText}>지금 시작하세요!</h2>
          <ButtonGoogle text="회원가입" widthValue={'330px'} />
          <ButtonKakao text="회원가입" widthValue={'330px'} />
          <span className={classes.startText}>또는</span>
          <Button
            widthValue={'330px'}
            colorValue={'#634718'}
            text="이메일 회원가입"
            className={classes.joinButton}
          />
          <span className={classes.startText}>회원이신가요?</span>
          <Button
            widthValue={'330px'}
            colorValue={'#634718'}
            text="로그인"
            className={classes.loginButton}
          />
          <Button
            widthValue={'330px'}
            heightValue={'93px'}
            colorValue={'#634718'}
            text="게스트로 입장"
            className={classes.guestButton}
          />
        </div>
      </div>
    </>
  );
}
