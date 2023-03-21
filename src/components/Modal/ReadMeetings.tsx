import { MapContainer } from './../../utils/MapContainer';
import { Button, ModalPotal, Modal } from '@/components/index';
import classes from './Modal.module.scss';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firestore/index';
import { collection, getDocs, query, where } from '@firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Suspense } from 'react';

interface Props {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (p: boolean) => void;
}

export const ReadMeetings = ({ openModal, setOpenModal }: Props) => {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = query(
    collection(db, 'makeMeetings'),
    where(
      firebase.firestore.FieldPath.documentId(),
      '==',
      localStorage.getItem('Unique ID')
    )
  );

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
    <div key={index} className={classes.showUsers}>
      <span>{value.title}</span>
      <span>{value.address}</span>
      <span> {value.detail}</span>
      <span> {value.cardData.slice(0, 15)}</span>
      <span className={classes.lastSpan}> {value.cardData.slice(16)}</span>
    </div>
  ));

  return (
    <div>
      <Suspense fallback={<div role="alert">LOADING...</div>}>
        {openModal && (
          <ModalPotal closePortal={handleClose}>
            <Modal>
              <h2 className={classes.popupTitle}>모임 만들기</h2>
              <div className={classes.popupContent}>
                <MapContainer />

                <form
                  onSubmit={handleRegister}
                  className={classes['modalForm']}
                >
                  <div className={classes['modalSearch']}>
                    {showUsers}
                    <Button
                      maxWidthValue={300}
                      heightValue={50}
                      text={'탈퇴하기'}
                      backgroundColor={'red'}
                      className={classes.signupButton}
                      onClick={handleRegister}
                    />
                  </div>
                </form>
              </div>
            </Modal>
          </ModalPotal>
        )}
      </Suspense>
    </div>
  );
};
