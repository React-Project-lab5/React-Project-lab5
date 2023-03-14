import classes from './Card.module.scss';

interface Props {
  children: React.ReactElement | string;
}

export default function Card({ children }: Props) {
  return <div className={classes.card}>{children}</div>;
}
