/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Input } from './Input';
import { SetStateAction, useEffect, useState } from 'react';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import classes from './SearchForm.module.scss';
import { ModalTotal } from '@/components/index';
import { db } from '@/firebase/firestore/index';
import { addressState } from '@/@recoil/addressState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { InputSelector } from '../InputSelector/InputSelector';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from '@firebase/firestore';
import { usersState } from '@/@recoil/usersState';
import { Card } from '@/@recoil/usersState';
import searchButton from '/public/assets/search.svg';
import closeButton from '/public/assets/close.svg';

export function SearchFrom({ createUsers, getUsers }: SearchFormProps) {
  const [searchTitle, setSearchTitle] = useState('');
  const setUsers = useSetRecoilState(usersState);
  const [address, setAddress] = useRecoilState(addressState);
  const movePage = useNavigate();
  const [arrayTitle, setArraytitle] = useState([]);
  const [inputFlag, setInputFlag] = useState(false);

  useEffect(() => {
    searchTitle ? setInputFlag(true) : setInputFlag(false);
  }, [searchTitle]);

  const goChatPage = () => {
    movePage('/chat');
  };

  const handleSearch = async () => {
    let usersCollectionRef = null;

    if (address) {
      usersCollectionRef = query(
        collection(db, 'makeMeetings'),
        where('address', 'in', [
          address.slice(6, 8),
          address.slice(6, 9),
          address.slice(6, 10),
        ]),
        where('title', 'array-contains-any', arrayTitle)
      );
    } else {
      usersCollectionRef = query(
        collection(db, 'makeMeetings'),
        where('title', 'array-contains-any', arrayTitle)
      );
    }

    try {
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersData = querySnapshot.docs.map((doc) => doc.data()) as Card[];
      setUsers(
        usersData.sort((a, b) => {
          if (a.timestamp.seconds < b.timestamp.seconds) return 1;
          if (a.timestamp.seconds > b.timestamp.seconds) return -1;
          return 0;
        })
      );
    } catch (err) {
      throw new Error('Error 404');
    }
  };

  const handleKey = (e: { code: string }) => {
    e.code === 'Enter' && handleSearch();
  };

  const writeTitle = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTitle(e.target.value);
    setArraytitle([...searchTitle]);
  };

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleSearch();
  };

  const resetButton = () => {
    setSearchTitle('');
    getUsers();
    setAddress(null);
  };

  return (
    <>
      <div className={classes['InputContainer']}>
        <div className={classes['mainInput']}>
          <form
            className={classes['formInput']}
            onSubmit={handleRegister}
            role="search"
          >
            <InputSelector
              maxWidthValue={200}
              heightValue={75}
              className={classes.searchFormInputSelector}
            />
            <div className={classes['inputSearchButton']}>
              <Input
                maxWidthValue={'35rem'}
                heightValue={'75px'}
                labelText="검색창"
                placeHolder="제목을 검색하세요"
                isA11yHidden
                className={classes.searchFormInput}
                onKeyDown={handleKey}
                onChange={writeTitle}
                defaultValue={searchTitle}
              />
              {inputFlag && (
                <button
                  type="reset"
                  aria-label="초기화 버튼"
                  onClick={resetButton}
                >
                  <img
                    className={classes.closeButton}
                    src={closeButton}
                    alt="초기화 버튼"
                    tabIndex={0}
                  />
                </button>
              )}
              <button type="submit" aria-label="검색 버튼">
                <img
                  className={classes.searchButton}
                  src={searchButton}
                  alt="검색 버튼"
                  tabIndex={0}
                />
              </button>
            </div>
            <ModalTotal createUsers={createUsers} getUsers={getUsers} />
          </form>

          <Button
            maxWidthValue={'190px'}
            heightValue={'75px'}
            text="채팅 하기"
            backgroundColor={'orange'}
            className={classes.ChatButton}
            onClick={goChatPage}
          />
        </div>
      </div>
    </>
  );
}
