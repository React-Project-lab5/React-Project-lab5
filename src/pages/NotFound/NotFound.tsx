import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import classes from './NotFound.module.scss';
export default function NotFound() {
  useDocumentTitle('404 Page');

  return (
    <>
      <div className={classes.container}>
        <span className={classes.span}>🚫 404 Error 🚫</span>
        <h1 className={classes.title}>404</h1>
        <p className={classes.content}>존재 하지 않는 페이지 입니다..</p>
      </div>
    </>
  );
}
