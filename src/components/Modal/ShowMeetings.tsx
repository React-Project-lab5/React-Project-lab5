import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import classes from './Modal.module.scss';
import { ReadMeetings } from './ReadMeetings';
import { usersState } from '@/@recoil/usersState';
import { Card, Meeting } from '@/components/index';

export function ShowMeetings() {
  const users = useRecoilValue(usersState);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <h3 className="a11yHidden">모임 목록</h3>
      <div className={classes['meetingCardContainer']}>
        {users.map((value, index) => (
          <div key={index} className={classes['meetingCard']}>
            <Card
              className={classes.mainPageCard}
              onClick={() => {
                setOpenModal(true);
                localStorage.setItem('Unique ID', value.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setOpenModal(true);
                  localStorage.setItem('Unique ID', value.id);
                  console.log('showmeetings', value);
                }
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
    </>
  );
}
