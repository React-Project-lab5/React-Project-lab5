import { auth } from '@/firebase/auth';
import { Input } from '../Input/Input';
import classes from './SignIn.module.scss';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Button, ButtonGoogle, ButtonKakao } from '../Button';
import { LogoIconandText } from '../LogoIconandText/LogoIconandText';

export default function SignIn() {
  const inputProps = {
    maxWidthValue: '400px',
    heightValue: '50',
    isA11yHidden: true,
  };

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인 성공!');
      navigate('/mainPage');
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
        <LogoIconandText small={false} />
        <form onSubmit={handleSubmit} className={classes['signInForm']}>
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
            maxWidthValue={400}
            heightValue={'50'}
            colorValue={'white'}
            text={'로그인'}
            type={'submit'}
          />
          {err && (
            <span className={classes.error}>🚫 다시 입력해 주세요 🚫</span>
          )}
        </form>
        <ButtonGoogle
          maxWidthValue={400}
          className={classes['signInButtonGoogle']}
        />
        <ButtonKakao
          maxWidthValue={400}
          className={classes['signInButtonKakao']}
        />
        <p>
          로그인 계정이 없으신가요?
          <span> 회원가입</span>
        </p>
      </div>
    </div>
  );
}
