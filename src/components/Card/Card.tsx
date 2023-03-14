import classes from './Card.module.scss';

interface Props {
  children?: React.ReactNode;
}

export default function Card({ children }: Props) {
  return <div className={classes.card}>{children}</div>;
}
