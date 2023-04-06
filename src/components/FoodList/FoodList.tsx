import { Card } from '../Card';
import { useRecoilValue } from 'recoil';
import classes from './FoodList.module.scss';
import spinner from '/public/assets/loading.svg';
import { useEffect, useMemo, useState } from 'react';
import { loadingState } from '@/@recoil/loadingState';
import { searchTermState } from '@/@recoil/searchTermState';

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
    // 페이지가 바뀔 때마다 0.1초 뒤에 카드 보이기
    setShowCards(false);
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 100);
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

  // 로딩 중이거나 카드를 보여줄 준비가 되지 않았다면 로딩 이미지를 보여줍니다.
  if (loading || !showCards) {
    return (
      <div className={classes.loading}>
        <img src={spinner} alt="로딩 이미지" />
      </div>
    );
  }

  return (
    <div className={classes.store}>
      {showCards &&
        filteredPosts.map((food: Food, index: number) => (
          <Card key={index} className={classes.card}>
            <div className={classes.storeBox}>
              <p className={classes.LocalName}>{food['지역명']}</p>
              <p className={classes.storeName}>{food['식당명']}</p>
              <img
                src={food['음식이미지(URL)']}
                alt={'음식이미지'}
                width={150}
                height={150}
              />
            </div>
          </Card>
        ))}
    </div>
  );
}
