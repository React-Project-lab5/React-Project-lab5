import classes from './NotFound.module.scss';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
export default function NotFound() {
  useDocumentTitle('404 Page');

  return (
    <>
      <h2 className="a11yHidden">존재 하지 않는 페이지</h2>
      <div className={classes.container}>
        <span>🚫 404 Error 🚫</span>
        <h1>404</h1>
        <p>존재 하지 않는 페이지 입니다..</p>
      </div>
    </>
  );
}
