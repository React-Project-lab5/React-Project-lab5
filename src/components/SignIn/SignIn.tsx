import classes from './SignIn.module.scss';
import { Input } from '../Input/Input';
import { LogoIconandText } from '../LogoIconandText/LogoIconandText';
import { Button, ButtonGoogle, ButtonKakao } from '../Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '@/firebase/auth';
export default function SignIn() {
  const inputProps = {
    maxWidthValue: '30',
    heightValue: '50',
    isA11yHidden: true,
  };

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('성공');
      navigate('/mainPage');
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
        <LogoIconandText small={false} />
        <form onSubmit={handleSubmit}>
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
          <Button
            backgroundColor={'orange'}
            isSmall={false}
            widthValue={'310'}
            heightValue={'50'}
            colorValue={'white'}
            text={'로그인'}
            type={'submit'}
          />
          {err && (
            <span className={classes.error}>🚫 다시 입력해 주세요 🚫</span>
          )}
        </form>
        <ButtonGoogle text="로그인" />
        <ButtonKakao text="로그인" />
        <p>
          로그인 계정이 없으신가요?
          <span> 회원가입</span>
        </p>
      </div>
    </div>
  );
}
