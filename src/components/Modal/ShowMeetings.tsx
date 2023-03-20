import { Card, Meeting } from '@/components/index';
import classes from './Modal.module.scss';
import { useState } from 'react';
import { ReadMeetings } from './ReadMeetings';

// eslint-disable-next-line react/prop-types
export function ShowMeetings({ users }) {
  const [openModal, setOpenModal] = useState(false);

  // eslint-disable-next-line react/prop-types
  const showCard = users.map((value, index) => (
    <div key={index}>
      <Card
        className={classes.mainPageCard}
        onClick={() => {
          setOpenModal(true);
          localStorage.setItem('Unique ID', JSON.stringify(value.id));
          console.log(value);
        }}
      >
        <Meeting
          title={value.title}
          town={value.address}
          place={value.detail}
          time={value.cardData}
        />
      </Card>
    </div>
  ));

  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      {showCard}
      {openModal ? (
        <ReadMeetings openModal={openModal} setOpenModal={setOpenModal} />
      ) : (
        console.log('false')
      )}
    </div>
  );
}
