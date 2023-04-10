import { Card } from '../Card';
import classes from './FoodList.module.scss';

interface Food {
  지역명: string;
  식당명: string;
  '음식이미지(URL)': string;
}

interface Props {
  posts: Food[];
}

const FoodItems = ({ posts }: Props) => {
  return (
    <>
      {posts.map((food: Food, index: number) => (
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
    </>
  );
};

export default FoodItems;
