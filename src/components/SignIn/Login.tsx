import classes from './Login.module.scss';
import { Input } from '../Input/Input';
import { LogoIconandText } from '../LogoIconandText/LogoIconandText';
import { Button, ButtonGoogle, ButtonKakao } from '../Button';
export default function Login() {
  const inputProps = {
    maxWidthValue: '30',
    heightValue: '50',
    isA11yHidden: true,
  };

  const buttonProps = {
    backgroundColor: 'orange',
    isSmall: false,
    widthValue: '310',
    heightValue: '50',
    colorValue: 'white',
    text: '로그인',
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
        <LogoIconandText small={false} />
        <form>
          <Input
            type={'email'}
            placeHolder={'이메일을 입력하세요.'}
            labelText={'email'}
            {...inputProps}
          />
          <Input
            type={'password'}
            labelText={'password'}
            placeHolder={'비밀번호를 입력하세요.'}
            {...inputProps}
          />
          <Button {...buttonProps} />
        </form>
        <ButtonGoogle text="로그인" />
        <ButtonKakao text="로그인" />
        <p>
          로그인 계정이 없으신가요?<span> 회원가입</span>
        </p>
      </div>
    </div>
  );
}
