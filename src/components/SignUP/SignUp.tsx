import classes from './SignUp.module.scss';
import { Input } from '../Input/Input';
import { LogoIconandText } from '../LogoIconandText/LogoIconandText';
import { InputSelector } from '../InputSelector/InputSelector';
import { useState } from 'react';
export default function SignUp() {
  const [err, setErr] = useState(false);

  const inputProps = {
    maxWidthValue: '300px',
    heightValue: '45px',
    isA11yHidden: true,
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
        <LogoIconandText small={false} />
        <form>
          <Input
            type={'email'}
            labelText={'이메일'}
            placeHolder={'이메일을 입력하세요.'}
            {...inputProps}
          />
          <button type="button" className={classes.button}>
            이메일 인증
          </button>
          <Input
            type={'password'}
            labelText={'비밀번호'}
            placeHolder={'비밀번호를 입력하세요.'}
            {...inputProps}
          />
          <Input
            type={'password'}
            labelText={'비밀번호'}
            placeHolder={'비밀번호를 한번 더 입력하세요.'}
            {...inputProps}
          />
          <button type="button" className={classes.button}>
            중복 확인
          </button>
          <Input
            type={'name'}
            labelText={'이름'}
            placeHolder={'이름을 입력하세요.'}
            {...inputProps}
          />
          <InputSelector
            maxWidthValue={300}
            heightValue={50}
            onChange={undefined}
            className={classes.selector}
          />

          <button type="button" className={classes.button}>
            회원가입
          </button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          <span>로그인</span> 계정이 있으신가요?
        </p>
      </div>
    </div>
  );
}
