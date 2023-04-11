import { Card } from '../Card';
import { useRecoilValue } from 'recoil';
import classes from './FoodList.module.scss';
import spinner from '/public/assets/loading.svg';
import { useEffect, useMemo, useState } from 'react';
import { loadingState } from '@/@recoil/loadingState';
import { searchTermState } from '@/@recoil/searchTermState';
import FoodItems from './FoodItems';

interface Food {
  지역명: string;
  식당명: string;
  '음식이미지(URL)': string;
}

interface Props {
  posts: Food[];
  loading: boolean;
}

export function FoodList({ posts }: Props) {
  const [showCards, setShowCards] = useState<boolean>(false);
  const searchTerm = useRecoilValue(searchTermState);
  const loading = useRecoilValue(loadingState);

  useEffect(() => {
    // 페이지가 바뀔 때마다 0.2초 뒤에 카드 보이기
    setShowCards(false);
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [posts]);

  // 검색어와 일치하는 포스트만 필터링하여 보여줍니다.
  const filteredPosts = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return posts.filter(
      (post) =>
        post['지역명'].toLowerCase().includes(lowerCaseSearchTerm) ||
        post['식당명'].toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [posts, searchTerm]);

  // 검색 결과가 없다면 해당 메시지를 보여줍니다.
  if (!filteredPosts.length) {
    return (
      <div className={classes.loading}>
        <p>검색 결과가 없습니다.🥲</p>
      </div>
    );
  }

  // 로딩 중이거나 카드를 보여줄 준비가 되지 않았다면 로딩 이미지를 보여줍니다.
  if (loading || !showCards) {
    return (
      <div className={classes.loading}>
        <img src={spinner} alt="로딩 이미지" />
      </div>
    );
  }

  return (
    <>
      <h3 className="a11yHidden"> 음식점 리스트</h3>
      <div className={classes.store}>
        {showCards && <FoodItems posts={posts} />}
      </div>
    </>
  );
}
