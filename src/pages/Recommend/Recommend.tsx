import axios from 'axios';
import { Card } from '@/components';
import { useEffect, useState } from 'react';
import classes from './Recommend.module.scss';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useFetch } from '@/hooks/useFetch';

export default function Recommend() {
  useDocumentTitle('슬기로운 N밥 생활 | 추천');

  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // function useFoods({page = 1}) {
  //   return useFetch(
  //     `https://api.odcloud.kr/api/15097008/v1/uddi:1e5a6f2e-3f79-49bd-819b-d17541e6df78?page=${page}&perPage=${perPage}&serviceKey=${
  //       import.meta.env.VITE_SERVICE_KEY
  //     }`
  //   );
  // }

  const url = `https://api.odcloud.kr/api/15097008/v1/uddi:1e5a6f2e-3f79-49bd-819b-d17541e6df78?page=${page}&perPage=${perPage}&serviceKey=${
    import.meta.env.VITE_SERVICE_KEY
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setFoods(response.data.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else {
          console.log(error.message);
        }
      }
    };

    fetchData();
  }, [url]);

  return (
    <>
      <h1>추천</h1>
      <div className={classes.store}>
        {foods.map((food, index) => (
          <Card key={index}>
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
    </>
  );
}
