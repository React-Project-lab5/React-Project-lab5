import { Card, Meeting } from '@/components/index';
import classes from './Modal.module.scss';
import { useState } from 'react';
import { ReadMeetings } from './ReadMeetings';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usersState } from '@/@recoil/usersState';
import { searchDetailCardState } from '@/@recoil/searchDetailCardState';
import { searchAddressState } from '@/@recoil/searchAddressState';

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
