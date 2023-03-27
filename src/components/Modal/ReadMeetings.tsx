/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from '@firebase/firestore';
import React from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useRecoilState } from 'recoil';
import classes from './Modal.module.scss';
import firebase from 'firebase/compat/app';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firestore/index';
import { usersState } from '@/@recoil/usersState';
import { deleteUsers } from '@/@recoil/deleteUsers';
import { MapContainer } from './../../utils/MapContainer';
import { Button, ModalPotal, Modal } from '@/components/index';
import { lazyMinLoadTime } from './lazyMinLoadTime';
import { UserContainer } from './UserContainer';
import { Card } from '@/@recoil/usersState';
import { useNavigate } from 'react-router-dom';

const ShowCard = lazyMinLoadTime(() => import('./ShowCard'), 1000);

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

  const movePage = useNavigate();

  const goChatPage = () => {
    movePage('/chat');
  };

  const handleJoin = async () => {
    setOpenModal(false);
    goChatPage();
  };

  return (
    <div>
      {openModal && (
        <ModalPotal closePortal={handleClose}>
          <Modal role="popup" aria-labelledby="modal-reading">
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
                    maxWidthValue={250}
                    heightValue={50}
                    text={'참여하기'}
                    backgroundColor={'orange'}
                    className={classes.signupButton}
                    onClick={handleJoin}
                  />
                  <Button
                    maxWidthValue={250}
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
