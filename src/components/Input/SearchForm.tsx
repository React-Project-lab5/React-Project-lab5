import classes from './SearchFrom.module.scss';
import { Input } from './Input';
import { InputSelector } from '../InputSelector/InputSelector';
import { Button } from '../Button';
import { ModalTotal } from '@/components/index';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { debounce } from 'lodash';
import { db } from '@/firebase/firestore/index';
import { collection, query, where, getDocs } from '@firebase/firestore';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usersState } from '@/states/usersState';
import { addressState } from '@/states/addressState';

export function SearchFrom({ createUsers, getUsers }: SearchFormProps) {
  const [searchTitle, setSearchTitle] = useState('');
  const setUsers = useSetRecoilState(usersState);
  const address = useRecoilValue(addressState);
  const movePage = useNavigate();

  const goChatPage = () => {
    movePage('/chat');
  };

  const handleSearch = async () => {
    const usersCollectionRef = query(
      collection(db, 'makeMeetings'),
      where('title', '==', searchTitle),
      where('address', '==', address.slice(6, 9))
    );

    try {
      const querySnapshot = await getDocs(usersCollectionRef);
      querySnapshot.forEach((doc) => {
        setUsers([doc.data()]);
      });
    } catch (err) {
      throw 'Error 404';
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
        <form onSubmit={handleRegister} role="search">
          <div className={classes['mainInput']}>
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
                type="search"
                className={classes.searchFormInput}
                onKeyDown={handleKey}
                onChange={writeTitle}
                defaultValue={searchTitle}
              />
              <button
                className={classes['searchButton']}
                type="submit"
                aria-label="검색 버튼"
              >
                <img src="/public/assets/search.svg" alt="검색 버튼" />
              </button>
            </div>
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
        </form>
      </div>
    </>
  );
}
