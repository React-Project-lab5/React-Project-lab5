import { Card, Meeting } from '@/components/index';
import classes from './Modal.module.scss';
import { useState } from 'react';
import { ReadMeetings } from './ReadMeetings';
import { useRecoilState } from 'recoil';
import { usersState } from '@/@recoil/usersState';

// eslint-disable-next-line react/prop-types
export function ShowMeetings() {
  const [users, setUsers] = useRecoilState(usersState);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={classes['meetingCardContainer']}>
      {/* eslint-disable-next-line react/prop-types  */}
      {users.map((value, index) => (
        <div key={index} className={classes['meetingCard']}>
          <Card
            className={classes.mainPageCard}
            onClick={() => {
              setOpenModal(true);
              localStorage.setItem('Unique ID', value.id);
              console.log('showmeetings', value);
            }}
          >
            <Meeting
              title={value.title}
              town={value.address}
              place={value.detail}
              time={value.cardData}
              userName={value.userName}
              userImg={value.userImg}
            />
          </Card>
        </div>
      ))}
      {openModal ? (
        <ReadMeetings openModal={openModal} setOpenModal={setOpenModal} />
      ) : null}
    </div>
  );
}
