import classes from './Footer.module.scss';
import { LogoText, SocialIconGroup } from '../index';
import { Link } from 'react-router-dom';

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
            <dd>
              <Link to="#">투자 정보</Link>
            </dd>
            <dd>
              <Link to="#">브랜드 가이드라인</Link>
            </dd>
            <dd>
              <Link to="#">혼밥 비즈니스</Link>
            </dd>
            <dd>
              <Link to="#">광고 문의</Link>
            </dd>
          </dl>
          <dl className={classes.infoList}>
            <dt className={classes.listTitle}>공지사항</dt>
            <dd>
              <Link to="#">이용약관</Link>
            </dd>
            <dd>
              <Link to="#">개인정보처리방침</Link>
            </dd>
            <dd>
              <Link to="#">위치기반서비스 이용약관</Link>
            </dd>
            <dd>
              <Link to="#">커뮤니티 가이드라인</Link>
            </dd>
            <dd>
              <Link to="#">청소년보호정책</Link>
            </dd>
            <dd>
              <Link to="#">문의하기</Link>
            </dd>
          </dl>
          <dl className={classes.infoList}>
            <dt className={classes.listTitle}>SNS</dt>
            <dd>
              <Link to="#">Discord</Link>
            </dd>
            <dd>
              <Link to="#">Instagram</Link>
            </dd>
            <dd>
              <Link to="#">Twitter</Link>
            </dd>
            <dd>
              <Link to="#">Facebook</Link>
            </dd>
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
