import { Meeting } from '@/components/Card';
import Card from '@/components/Card/Card';
import { Banner } from '@/components/index';
import { SearchFrom } from '@/components/Input/SearchForm';
import classes from './MainPage.module.scss';
export default function MainPage() {
  return (
    <>
      <Banner />
      <SearchFrom />
      <div className={classes['meetingContainer']}>
        <Card className={classes.mainPageCard}>
          <Meeting
            toDate="3월15일"
            time="12시"
            town="금천구"
            place="시흥사거리"
            title="모집합니다"
          />
        </Card>
        <Card className={classes.mainPageCard}>
          <Meeting
            toDate="3월15일"
            time="12시"
            town="금천구"
            place="시흥사거리"
            title="모집합니다"
          />
        </Card>
        <Card className={classes.mainPageCard}>
          <Meeting
            toDate="3월15일"
            time="12시"
            town="금천구"
            place="시흥사거리"
            title="모집합니다"
          />
        </Card>
        <Card className={classes.mainPageCard}>
          <Meeting
            toDate="3월15일"
            time="12시"
            town="금천구"
            place="시흥사거리"
            title="모집합니다"
          />
        </Card>
      </div>
    </>
  );
}
