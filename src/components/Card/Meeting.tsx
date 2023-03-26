import classes from './Card.module.scss';

interface Props {
  time: string;
  town: string;
  place: string;
  title: Array<string>;
  userName: string;
  userImg: string;
}

export function Meeting({
  time,
  town,
  place,
  title,
  userName,
  userImg,
}: Props) {
  return (
    <>
      {/* <div className={classes['cardContainer']}> */}
      <div className={classes['cardWrap']}>
        <div className={classes['dateContainer']}>
          <div>{time}</div>
        </div>

        <div className={classes['meetingContainer']}>
          <div className={classes['town']}>{town}</div>
          <div className={classes['place']}>{place}</div>
          <div className={classes['title']}>{title.join(' ')}</div>
        </div>

        <div className={classes['authorContainer']}>
          <img
            src={userImg}
            alt="프로필 사진"
            className={classes['authorImg']}
          />
          <div className={classes['nicName']}>{userName}</div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
