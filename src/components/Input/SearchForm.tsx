/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Input } from './Input';
import { useState } from 'react';
import { debounce } from 'lodash';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import classes from './SearchFrom.module.scss';
import { ModalTotal } from '@/components/index';
import { db } from '@/firebase/firestore/index';
import { addressState } from '@/@recoil/addressState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { InputSelector } from '../InputSelector/InputSelector';
import { collection, query, where, getDocs } from '@firebase/firestore';
import { usersState } from '@/@recoil/usersState';

export function SearchFrom({ createUsers, getUsers }: SearchFormProps) {
  const [searchTitle, setSearchTitle] = useState('');
  const setUsers = useSetRecoilState(usersState);
  const address = useRecoilValue(addressState);
  const movePage = useNavigate();

  const goChatPage = () => {
    movePage('/chat');
  };

  const handleSearch = async () => {
    let usersCollectionRef = null;

    if (address) {
      usersCollectionRef = query(
        collection(db, 'makeMeetings'),
        where('address', '==', address.slice(6, 9)),
        where('title', 'array-contains-any', searchTitle.split(' '))
      );
      console.log('된다');
    } else {
      usersCollectionRef = query(
        collection(db, 'makeMeetings'),
        where('title', 'array-contains', searchTitle)
      );
      console.log('안된다');
    }

    try {
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersData = querySnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    } catch (err) {
      throw new Error('Error 404');
    }
  };

  const handleKey = (e: { code: string }) => {
    e.code === 'Enter' && handleSearch();
  };

  const writeTitle = debounce((e) => {
    setSearchTitle(e.target.value);
  }, 500);

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('제목 검색');
    handleSearch();
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
              <button
                className={classes['searchButton']}
                type="submit"
                aria-label="검색 버튼"
                tabIndex={0}
              >
                <img
                  src="/public/assets/search.svg"
                  alt="검색 버튼"
                  tabIndex={0}
                />
              </button>
            </div>
          </form>
          <ModalTotal createUsers={createUsers} getUsers={getUsers} />

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
