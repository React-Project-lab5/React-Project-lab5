/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import axios from 'axios';
import { Banner, Input } from '@/components';
import { useEffect, useState } from 'react';
import classes from './Recommend.module.scss';
import { FoodList } from '@/components/FoodList/FoodList';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Pagination } from '@/components/Pagination/Pagination';
import { ScrollButton } from '@/components/Button/ScrollButton/ScrollButton';
import search from '/public/assets/search.svg';
import { useRecoilState } from 'recoil';
import { searchTermState } from '@/@recoil/searchTermState';
import { loadingState } from '@/@recoil/loadingState';
export default function Recommend() {
  useDocumentTitle('슬기로운 N밥 생활 | 추천');

  const postsPerPage = 24;

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  const API_URL = `https://api.odcloud.kr/api/15097008/v1/uddi:1e5a6f2e-3f79-49bd-819b-d17541e6df78?page=3&perPage=96&serviceKey=${
    import.meta.env.VITE_SERVICE_KEY
  }`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(API_URL);

        setPosts(data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [API_URL, currentPage, setLoading]);

  // 현재 게시물 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 검색어를 상태에 업데이트
  const handlerSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Banner />
      <h1 className={classes.title}> 서울 맛집 추천</h1>
      <div className={classes['InputContainer']}>
        <div className={classes['mainInput']}>
          <form
            className={classes['formInput']}
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          >
            <div className={classes['inputSearchButton']}>
              <Input
                maxWidthValue={'35rem'}
                heightValue={'75px'}
                labelText="검색창"
                placeHolder="제목을 검색하세요."
                isA11yHidden
                className={classes.searchFormInput}
                value={searchTerm} // 검색어 상태를 value 속성에 전달
                onChange={handlerSearchTerm}
              />
              <button
                className={classes['searchButton']}
                type="submit"
                aria-label="검색 버튼"
                tabIndex={0}
              >
                <img src={search} alt="검색 버튼" tabIndex={0} />
              </button>
            </div>
          </form>
        </div>
      </div>
      <FoodList posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <ScrollButton />
    </>
  );
}
