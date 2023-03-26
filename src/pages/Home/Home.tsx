import {
  LogoIconandText,
  ButtonGoogle,
  ButtonKakao,
  Button,
  HomeBanner,
} from '@/components/index';
import { useRecoilState } from 'recoil';
import classes from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import SignUp from '@/components/SignUP/SignUp';
import SignIn from '@/components/SignIn/SignIn';
import { Modal } from '@/components/Modal/Modal';
import { ModalPotal } from '@/components/Modal/ModalPotal';
import { siginState, siginUpState } from '@/@recoil/signState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle('슬기로운 N밥생활 | 홈');

  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useRecoilState(siginState);
  const [openSignUp, setOpenSignUp] = useRecoilState(siginUpState);

  const navigateToPage = () => {
    navigate('/mainpage');
  };

  const handleOpenModal = () => {
    setOpenLogin(true);
  };
  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleOpenSignupModal = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  return (
    <div className={classes['divContainer']}>
      <HomeBanner className={classes['homeBanner']} />

      <div className={classes.contents}>
        <LogoIconandText small={false} />
        <h2 className={classes.startText}>지금 시작하세요!</h2>
        <ButtonGoogle widthValue={'330px'} />
        <ButtonKakao widthValue={'330px'} />
        <span className={classes.startText}>또는</span>
        <Button
          maxWidthValue={'330px'}
          text="이메일 회원가입"
          className={classes.joinButton}
          onClick={handleOpenSignupModal}
        />
        <span className={classes.startText}>회원이신가요?</span>
        <Button
          maxWidthValue={'330px'}
          text="로그인"
          className={classes.loginButton}
          onClick={handleOpenModal}
        />
        <Button
          maxWidthValue={'330px'}
          heightValue={'93px'}
          text="게스트로 입장"
          className={classes.guestButton}
          onClick={navigateToPage}
        />
      </div>
      {openLogin && (
        <ModalPotal closePortal={handleClose}>
          <Modal className={classes['showLoginModal']}>
            <SignIn />
          </Modal>
        </ModalPotal>
      )}

      {openSignUp && (
        <ModalPotal closePortal={handleCloseSignUp}>
          <Modal className={classes['showLoginModal']}>
            <SignUp />
          </Modal>
        </ModalPotal>
      )}
    </div>
  );
}
