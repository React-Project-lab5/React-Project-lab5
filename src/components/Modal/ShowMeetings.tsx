import { Card, Meeting } from '@/components/index';
import classes from './Modal.module.scss';
import { useState } from 'react';
import { ReadMeetings } from './ReadMeetings';

// 띄워줄 데이터 key값에 고유ID를 넣어준다.
export function ShowMeetings({ users }) {
  const [openModal, setOpenModal] = useState(false);
  const [a, setA] = useState(true);

  const toggleBool = () => {
    setOpenModal(true);
  };

  return (
    <div className={classes['meetingCardContainer']}>
      {/* eslint-disable-next-line react/prop-types  */}
      {users.map((value, index) => (
        <div key={index} className={classes['meetingCard']}>
          <Card className={classes.mainPageCard} onClick={toggleBool}>
            <Meeting
              title={value.title}
              town={value.address}
              place={value.detail}
              time={value.cardData}
            />
          </Card>
        </div>
      ))}
      {openModal ? (
        <ReadMeetings openModal={openModal} setOpenModal={setOpenModal} />
      ) : (
        console.log('false')
      )}
    </div>
  );
}
