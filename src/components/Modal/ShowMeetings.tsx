import { useState } from 'react';
import classes from './Modal.module.scss';
import { ReadMeetings } from './ReadMeetings';
import { usersState } from '@/@recoil/usersState';
import { Card, Meeting } from '@/components/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchAddressState } from '@/@recoil/searchAddressState';
import { searchDetailCardState } from '@/@recoil/searchDetailCardState';

export function ShowMeetings() {
  const users = useRecoilValue(usersState);
  const [openModal, setOpenModal] = useState(false);
  const setSearchCard = useSetRecoilState(searchDetailCardState);
  const setSearchTitle = useSetRecoilState(searchAddressState);

  return (
    <div className={classes['meetingCardContainer']}>
      {users.map((value, index) => (
        <div key={index} className={classes['meetingCard']}>
          <Card
            className={classes.mainPageCard}
            onClick={() => {
              setOpenModal(true);
              localStorage.setItem('Unique ID', value.id || '1');
              console.log(value);
              setSearchCard(value.detail);
              setSearchTitle(value.address);
              console.log('showmeetings', value);
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
  );
}
