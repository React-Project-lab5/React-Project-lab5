/* modal.tsx */
import classes from './Modal.module.scss';
import { createPortal } from 'react-dom';

const portalElement = document.getElementById('overlays');

export function Modal({ children }) {
  console.log(children);
  return (
    <div>
      {createPortal(
        <div className={classes['modal-wrap']}>
          <div className={classes['modal-top']}>
            <button
              type="button"
              aria-label="닫기버튼"
              className={classes['close']}
            >
              <img
                className={classes.img}
                src="../assets/close.svg"
                alt="닫기 버튼"
              />
            </button>
          </div>
        </div>,
        portalElement
      )}
      <div style={{ color: 'red', fontSize: '100px' }}>{children}</div>
    </div>
  );
}
