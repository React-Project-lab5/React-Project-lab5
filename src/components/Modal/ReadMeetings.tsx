import { MapContainer } from './../../utils/MapContainer';
import { Button, ModalPotal, Modal } from '@/components/index';
import classes from './Modal.module.scss';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firestore/index';
import { collection, getDocs, orderBy, query } from '@firebase/firestore';

interface Props {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (p: boolean) => void;
}

export const ReadMeetings = ({ openModal, setOpenModal }: Props) => {
  const usersCollectionRef = query(
    collection(db, 'makeMeetings'),
    orderBy('timestamp', 'asc')
  );

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await getDocs(usersCollectionRef).then((data) => {
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleRegister = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const showUsers = users.map((value, index) => (
    <div key={index}>
      <h1>title: {value.title}</h1>
      <h1>detail: {value.detail}</h1>
    </div>
  ));

  console.log(users[0]);
  console.log(localStorage.getItem('Unique ID'));

  return (
    <div>
      {openModal && (
        <ModalPotal closePortal={handleClose}>
          <Modal>
            <div className={classes.popupContent}>
              <MapContainer />
              {localStorage.getItem('Unique ID')}
              <div>
                <Button
                  widthValue={300}
                  heightValue={50}
                  text={'탈퇴하기'}
                  backgroundColor={'red'}
                  className={classes.signupButton}
                  onClick={handleRegister}
                />
              </div>
            </div>
          </Modal>
        </ModalPotal>
      )}
    </div>
  );
};
