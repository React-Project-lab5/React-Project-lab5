import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import classes from './Search.module.scss';
import { db } from '@/firebase/firestore/index';
import { authImagState } from '@/states/authImgState';
import defaultAvatar from '/public/assets/defaultAvatars.svg';
import { collection, query, where, getDocs } from '@firebase/firestore';

export const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const imageUrl = useRecoilValue(authImagState);

  //로그인된 사용자 정보 찾기
  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());

        console.log(doc.data().imageUrl);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchForm}>
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>사용자를 찾을 수 없습니다</span>}
      {user && (
        <div className={classes.userChat}>
          {imageUrl ? (
            <img src={imageUrl} alt="로그인된 사용자 프로필" />
          ) : (
            <img src={defaultAvatar} alt="로그인된 사용자 프로필" />
          )}
          <div className={classes.userChatInfo}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
