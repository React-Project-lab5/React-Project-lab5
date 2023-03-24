// 이메일 검증
export const isValidEmail = (asValue) => {
  const regExpEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g;
  return regExpEmail.test(String(asValue).toLowerCase());
};

// 아이디 검증
export const isValidId = (asValue) => {
  const regExpId = /^[a-z]+[a-z0-9]{5,19}$/g;

  return regExpId.test(asValue);
};

//비밀번호 검증
export const isValidPw = (asValue) => {
  const regExpPw = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/g;

  return regExpPw.test(asValue);
};

// 휴대폰번호 검증
export const isValidTel = (asValue) => {
  const regExpTel = /^\d{3}\d{3,4}\d{4}$/g;

  return regExpTel.test(asValue);
};
