import { useEffect, useState } from 'react';
import { Card } from '../Card';
import classes from './FoodList.module.scss';
import spinner from '/public/assets/loading.svg';

interface Food {
  지역명: string;
  식당명: string;
  '음식이미지(URL)': string;
}

interface Props {
  posts: Food[];
  loading: boolean;
}

export function FoodList({ posts, loading }: Props) {
  const [showCards, setShowCards] = useState<boolean>(false);

  useEffect(() => {
    // 페이지가 바뀔 때마다 0.2초 뒤에 카드 보이기
    setShowCards(false);
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [posts]);

  if (loading || !showCards) {
    return (
      <div role="alert" className={classes.loading}>
        <img src={spinner} alt="로딩 이미지" />
      </div>
    );
  }

  return (
    <div className={classes.store}>
      {showCards &&
        posts.map((food: Food, index: number) => (
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
