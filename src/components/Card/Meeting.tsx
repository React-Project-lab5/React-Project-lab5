import classes from './Card.module.scss';
import avatar from '/public/assets/avatar_1.svg';

export function Meeting({ toDate, time, town, place, title }) {
  return (
    <>
      {/* <div className={classes['cardContainer']}> */}
      <div className={classes['cardWrap']}>
        <div className={classes['dateContainer']}>
          <div className={classes['toDate']}>{toDate}</div>
          <div>|</div>
          <div>{time}</div>
        </div>

        <div className={classes['meetingContainer']}>
          <div className={classes['town']}>{town}</div>
          <div className={classes['place']}>{place}</div>
          <div className={classes['title']}>{title}</div>
        </div>

        <div className={classes['authorContainer']}>
          <img
            src={avatar}
            alt="프로필 사진"
            className={classes['authorImg']}
          />
          <div className={classes['nicName']}>닉네임</div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
