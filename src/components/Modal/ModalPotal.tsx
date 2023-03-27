/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { createPortal } from 'react-dom';
import classes from './Modal.module.scss';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children?: React.ReactNode;
  closePortal: () => void;
}

export const ModalPotal = ({ children, closePortal }: Props) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);

    if (document) {
      const dom = document.getElementById('overlays');
      ref.current = dom;
    }
    return () => {
      setMounted(false);
    };
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      <div className={classes.modal}>
        <div
          className={classes.modalBackground}
          role="presentation"
          onClick={closePortal}
        />
        <div className={classes.modalContent}>
          <div className={classes.modalContentClose}>
            <button onClick={closePortal} type="button" aria-label="닫기버튼">
              <img
                src="/public/assets/close.svg"
                alt="닫기 버튼"
                tabIndex={0}
              />
              <div className={classes.closeTooltip}>닫기</div>
            </button>
          </div>
          <div className={classes.modalContentMain}>{children}</div>
        </div>
      </div>,
      ref.current
    );
  }
  return null;
};
