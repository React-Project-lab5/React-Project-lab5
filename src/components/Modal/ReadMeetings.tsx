/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer } from './../../utils/MapContainer';
import { Button, ModalPotal, Modal } from '@/components/index';
import classes from './Modal.module.scss';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { deleteUsers } from '@/states/deleteUsers';
import { db } from '@/firebase/firestore/index';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from '@firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import React from 'react';
import { usersState } from '@/states/cardsState';
import { lazyMinLoadTime } from './lazyMinLoadTime';

const ShowCard = lazyMinLoadTime(() => import('./ShowCard'), 5000);
import { UserContainer } from './UserContainer';

interface Props {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (p: boolean) => void;
}
export const ReadMeetings = ({ openModal, setOpenModal }: Props) => {
  const [users, setUsers] = useRecoilState(usersState);
  const [deleteCard, setDeleteCard] = useRecoilState(deleteUsers);
  const [cards, setCards] = useState([]);

  const usersCollectionRef = query(
    collection(db, 'makeMeetings'),
    where(
      firebase.firestore.FieldPath.documentId(),
      '==',
      localStorage.getItem('Unique ID')
    )
  );

  const usersCollectionRenderRef = query(
    collection(db, 'makeMeetings'),
    orderBy('timestamp', 'desc')
  );

  const getUsers = async () => {
    await getDocs(usersCollectionRef).then((data) => {
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  console.log('cards', cards[0]);

  const getAfterDelete = async () => {
    await getDocs(usersCollectionRenderRef).then((data) => {
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDelete = async () => {
    setOpenModal(false);
    await deleteCard(localStorage.getItem('Unique ID'));
    getAfterDelete();
  };

  return (
    <div>
      {openModal && (
        <ModalPotal closePortal={handleClose}>
          <Modal>
            <div className={classes.popupContent}>
              <div>
                <MapContainer />
                <UserContainer cards={cards} />
              </div>
              <form onSubmit={handleClose} className={classes['modalForm']}>
                <div className={classes['modalSearch']}>
                  <React.Suspense fallback={<div>로딩 중...</div>}>
                    <ShowCard cards={cards} />
                  </React.Suspense>
                  <Button
                    maxWidthValue={300}
                    heightValue={50}
                    text={'삭제하기'}
                    backgroundColor={'red'}
                    className={classes.signupButton}
                    onClick={handleDelete}
                  />
                </div>
              </form>
            </div>
          </Modal>
        </ModalPotal>
      )}
    </div>
  );
};
