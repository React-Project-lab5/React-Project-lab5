import classes from './Navbar.module.scss';
import { signOut } from '@firebase/auth';
import { auth } from '@/firebase/auth';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { db } from '@/firebase/firestore/index';
import { collection, getDocs, query, where } from '@firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export function Navbar() {
  const navigation = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [cards, setCards] = useState([]);

  const handleSignOut = () => {
    signOut(auth);
    navigation('/');
  };
  console.log('이거임', localStorage.getItem('navUid'));

  const usersCollectionRef = query(
    collection(db, 'users'),
    where(
      firebase.firestore.FieldPath.documentId(),
      '==',
      localStorage.getItem('navUid')
    )
  );

  const getUsers = async () => {
    await getDocs(usersCollectionRef).then((data) => {
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const showUserImage = cards.map((value, index: number) => (
    <div key={index} className={classes.navbar}>
      <p className={classes.logo}>슬기로운 N밥생활</p>
      <div className={classes.user}>
        <img src={value.imageUrl} alt="사용자" />
        <p>{currentUser.displayName}</p>
        <button type="button" onClick={handleSignOut}>
          로그아웃
        </button>
      </div>
    </div>
  ));

  return <div>{showUserImage}</div>;
}
