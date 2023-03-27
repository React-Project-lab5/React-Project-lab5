/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import classNames from 'classnames';
import classes from './Card.module.scss';

interface Props {
  className?: string;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[];
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

export function Card({ children, className, onClick, onKeyDown }: Props) {
  return (
    <div
      className={classNames(classes['card'], className)}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <button
        type="button"
        aria-label={'카드 팝업창 열기'}
        onClick={onClick}
        className={classes['cardModalButton']}
      >
        {children}
      </button>
    </div>
  );
}
