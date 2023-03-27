/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '@/firebase/firestore/index';
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  getDoc,
  orderBy,
  doc,
} from '@firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from '@/firebase/auth';
import { Banner } from '@/components/index';
import { mapState } from '@/@recoil/mapState';
import { IoIosArrowUp } from 'react-icons/io';
import { ShowMeetings } from '@/components/index';
import { usersState } from '@/@recoil/usersState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cardDataState } from '@/@recoil/cardDataState';
import classes from '../Recommend/Recommend.module.scss';
import { titleMainState } from '@/@recoil/titleMainState';
import { SearchFrom } from '@/components/Input/SearchForm';
import { detailMainState } from '@/@recoil/detailMainState';
import { addressMainState } from '@/@recoil/addressMainState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Pagination } from '@/components/Pagination/Pagination';

export default function MainPage() {
  useDocumentTitle('슬기로운 N밥생활 | 모임');

  const title = useRecoilValue(titleMainState);
  const address = useRecoilValue(addressMainState);
  const detail = useRecoilValue(detailMainState);
  const cardData = useRecoilValue(cardDataState);
  const mapData = useRecoilValue(mapState);
  // const setUsers = useSetRecoilState(usersState);
  const [name, setName] = useState('');
  const [userImg, setUserImg] = useState('');

  const [users, setUsers] = useRecoilState(usersState);
  const [currentPost, setCurrentPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 6; // 페이지당 게시물 수

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserRef = doc(collection(db, 'users'), user.uid);
        getDoc(getUserRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            console.log(userData);
            setName(userData.displayName);
            setUserImg(userData.photoURL);
          }
        });
      }
    });
    return unsub;
  }, []);

  const usersCollectionRef = query(
    collection(db, 'makeMeetings'),
    orderBy('timestamp', 'desc')
  );

  const getUsers = async () => {
    await getDocs(usersCollectionRef).then((data) => {
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUsers();
  }, [mapData]);

  const createUsers = async () => {
    const user = auth.currentUser;

    await addDoc(collection(db, 'makeMeetings'), {
      title: title.split(' '),
      address: address,
      detail: detail,
      cardData: cardData,
      mapData: mapData,
      timestamp: serverTimestamp(),
      userName: name || user.providerData[0].displayName,
      userImg: userImg || user.providerData[0].photoURL,
    });
  };

  const searchFormProps = {
    createUsers: createUsers,
    getUsers: getUsers,
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Get current posts
  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPost(currentPosts);
  }, [currentPage, users, postsPerPage]);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <Banner />
      <SearchFrom {...searchFormProps} />
      <ShowMeetings />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={users.length}
        paginate={paginate}
      />
      <div className={classes.container}>
        <button
          type="button"
          className={classes.button}
          onClick={handleScrollToTop}
          tabIndex={0}
        >
          <IoIosArrowUp size={30} />
        </button>
      </div>
    </>
  );
}
