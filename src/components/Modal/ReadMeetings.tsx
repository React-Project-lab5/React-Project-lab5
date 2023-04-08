/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from '@firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classes from './Modal.module.scss';
import firebase from 'firebase/compat/app';
import { useEffect } from 'react';
import { db } from '@/firebase/firestore/index';
import { usersState } from '@/@recoil/usersState';
import { deleteUsers } from '@/@recoil/deleteUsers';
import { MapContainer } from '../../utils/MapContainer/MapContainer';
import { Button, ModalPotal, Modal } from '@/components/index';
import { UserContainer } from './UserContainer';
import { useNavigate } from 'react-router-dom';
import { lazyMinLoadTime } from './lazyMinLoadTime';
import React from 'react';

const ShowCard = lazyMinLoadTime(() => import('./ShowCard'), 1000);
import { Card } from '@/@recoil/usersState';
import { readingCardState } from '@/@recoil/readingCardState';

interface Props {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (p: boolean) => void;
}
export const ReadMeetings = ({ openModal, setOpenModal }: Props) => {
  const setUsers = useSetRecoilState(usersState);
  const deleteCard = useRecoilValue(deleteUsers);
  const [cards, setCards] = useRecoilState(readingCardState);

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
      setCards(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Card[]
      );
    });
  };

  const getAfterDelete = async () => {
    await getDocs(usersCollectionRenderRef).then((data) => {
      setUsers(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Card[]
      );
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
                <UserContainer />
              </div>
              <form onSubmit={handleClose} className={classes['modalForm']}>
                <div className={classes['modalSearch']}>
                  <React.Suspense fallback={<div>로딩 중...</div>}>
                    <ShowCard />
                  </React.Suspense>
                  <div className={classes.buttonContainer}>
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
                      className={classes.deleteButton}
                      onClick={handleDelete}
                    />
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </ModalPotal>
      )}
    </div>
  );
};
