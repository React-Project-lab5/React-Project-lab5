import { Card, Meeting } from '@/components/index';
import classes from './Modal.module.scss';

// 띄워줄 데이터 key값에 고유ID를 넣어준다.
export function ShowMeetings({ users }) {
  console.log(users);
  return users.map((value, index) => (
    <div key={index}>
      <Card className={classes.mainPageCard}>
        <Meeting
          title={value.title}
          town={value.address}
          place={value.detail}
        />
      </Card>
    </div>
  ));
}
