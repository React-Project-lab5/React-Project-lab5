import classes from './Card.module.scss';
import classNames from 'classnames';

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
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
