import classes from './NotFound.module.scss';
export default function NotFound() {
  return (
    <>
      <div className={classes.container}>
        <span>🚫 404 Error 🚫</span>
        <h1>404</h1>
        <p>존재 하지 않는 페이지 입니다..</p>
      </div>
    </>
  );
}
