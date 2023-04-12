/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import 'firebase/compat/auth';
import ShowCard from './ShowCard';
import 'firebase/compat/firestore';
import classNames from 'classnames';
import { auth } from '@/firebase/auth';
import classes from './Modal.module.scss';
import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';
import { getUsers } from '@/utils/getUsers';
import { useNavigate } from 'react-router-dom';
import { UserContainer } from './UserContainer';
import { db } from '@/firebase/firestore/index';
import { deleteUsers } from '@/@recoil/deleteUsers';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MapContainer } from '../MapContainer/MapContainer';
import { readingCardState } from '@/@recoil/readingCardState';
import { searchEmailState } from '@/@recoil/searchEmailState';
import { Button, ModalPotal, Modal } from '@/components/index';
import { collection, query, where } from '@firebase/firestore';

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ReadMeetings = ({ openModal, setOpenModal }: Props) => {
  const [userState, setUserState] = useState(false);
  const [cards, setCards] = useRecoilState(readingCardState);
  const deleteCard = useRecoilValue(deleteUsers);
  const searchEmail = useRecoilValue(searchEmailState);

  const usersCollectionRef = query(
    collection(db, 'makeMeetings'),
    where(
      firebase.firestore.FieldPath.documentId(),
      '==',
      localStorage.getItem('Unique ID')
    )
  );

  useEffect(() => {
    getUsers(usersCollectionRef, setCards);
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDelete = async () => {
    setOpenModal(false);
    await deleteCard(localStorage.getItem('Unique ID'));
    alert('삭제 되었습니다.');
    window.location.replace('/mainPage');
  };

  const movePage = useNavigate();

  const goChatPage = () => {
    movePage('/chat');
  };

  const handleJoin = async () => {
    setOpenModal(false);
    goChatPage();
  };

  function isCurrentUser() {
    return searchEmail
      ? auth.currentUser?.email === searchEmail
      : auth.currentUser?.email === cards[0].email;
  }

  useEffect(() => {
    if (cards[0]) {
      // 현재 사용자가 메시지 작성자인지 확인

      setUserState(isCurrentUser());
      console.log(auth.currentUser?.email === searchEmail);
    }
  }, [searchEmail]);

  // 작성자에 따라 오른쪽 또는 왼쪽 정렬 클래스를 반환
  const getUserUI = () => {
    return userState ? classes.owner : classes.guest;
  };

  return (
    <div>
      {openModal && (
        <ModalPotal closePortal={handleClose}>
          <Modal role="popup" aria-labelledby="modal-reading">
            <div className={classNames(classes.popupContent, getUserUI())}>
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
