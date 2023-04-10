import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import classes from './ScrollButton.module.scss';
import { showBtnState } from '@/@recoil/showBtnState';

export function ScrollButton() {
  const [showButton, setShowButton] = useRecoilState(showBtnState);

  // ScrollToTop Button
  const handleScrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, [setShowButton]);

  return (
    <>
      {showButton && (
        <div className={classes.scroll}>
          <button
            type="button"
            aria-label="페이지 상단으로 이동"
            className={classes.button}
            onClick={handleScrollToTop}
            tabIndex={0}
          >
            Top
          </button>
        </div>
      )}
    </>
  );
}
