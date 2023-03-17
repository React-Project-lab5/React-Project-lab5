import classes from './Card.module.scss';
import classNames from 'classnames';

interface Props {
  children: React.ReactElement | string;
  className?: string;
}

export function Card({ children, className }: Props) {
  return (
    <div className={classNames(classes['card'], className)}>{children}</div>
  );
}
