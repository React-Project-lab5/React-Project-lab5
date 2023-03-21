import classes from './Footer.module.scss';
import { LogoText, SocialIconGroup } from '../index';

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerTop}>
        <div className={classes.logoAndSlogan}>
          <LogoText small={true} />
          <span className={classes.slogan}>Eat, Share, Be Happy</span>
          <SocialIconGroup />
        </div>
        <div className={classes.infoGroup}>
          <dl className={classes.infoList}>
            <dt className={classes.listTitle}>회사소개</dt>
            <dd>투자 정보</dd>
            <dd>브랜드 가이드라인</dd>
            <dd>혼밥 비즈니스</dd>
            <dd>광고 문의</dd>
          </dl>
          <dl className={classes.infoList}>
            <dt className={classes.listTitle}>공지사항</dt>
            <dd>이용약관</dd>
            <dd>개인정보처리방침</dd>
            <dd>위치기반서비스 이용약관</dd>
            <dd>커뮤니티 가이드라인</dd>
            <dd>청소년보호정책</dd>
            <dd>문의하기</dd>
          </dl>
          <dl className={classes.infoList}>
            <dt className={classes.listTitle}>SNS</dt>
            <dd>Discord</dd>
            <dd>Instagram</dd>
            <dd>Twitter</dd>
            <dd>Facebook</dd>
          </dl>
        </div>
      </div>
      <div className={classes.footerBottom}>
        <ul>
          <li>© 2023 BobJo. All rights reserved</li>
          <li className={classes.companyInfo}>
            서울특별시 강남구 봉은사로 479
          </li>
          <li>공동대표: 김서현 김대웅 변혜빈 빈운기 원다함</li>
          <li className={classes.companyInfo}>
            사업자 등록번호: 777-77-77777 [사업자정보확인]
          </li>
        </ul>
      </div>
      <div className={classes.contents}>{/* <h1>푸더</h1> */}</div>
    </footer>
  );
}
