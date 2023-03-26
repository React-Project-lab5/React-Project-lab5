import classNames from 'classnames';
import classes from './Card.module.scss';

interface Props {
  className?: string;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[];
}

export function Card({ children, className, onClick }: Props) {
  return (
    <div className={classNames(classes['card'], className)}>
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
