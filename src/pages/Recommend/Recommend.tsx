/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import axios from 'axios';
import { useRecoilState } from 'recoil';
import ReactPaginate from 'react-paginate';
import { Banner, Input } from '@/components';
import classes from './Recommend.module.scss';
import search from '/public/assets/search.svg';
import { loadingState } from '@/@recoil/loadingState';
import { ChangeEvent, useEffect, useState } from 'react';
import { FoodList } from '@/components/FoodList/FoodList';
import { searchTermState } from '@/@recoil/searchTermState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ScrollButton } from '@/components/Button/ScrollButton/ScrollButton';

export default function Recommend() {
  useDocumentTitle('슬기로운 N밥생활 | 추천');

  const postsPerPage = 24;

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useRecoilState(loadingState);
  //검색어를 입력하면 searchTerm 상태 변수에 저장
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);

  const API_BASE_URL =
    'https://api.odcloud.kr/api/15097008/v1/uddi:1e5a6f2e-3f79-49bd-819b-d17541e6df78';
  const API_KEY = import.meta.env.VITE_SERVICE_KEY;
  const PER_PAGE = 168;

  const API_URL = `${API_BASE_URL}?page=1&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;

  //API 데이터를 가져와서 posts 상태 변수에 저장
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
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경
  const handlePageClick = ({ selected }): void => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 검색어를 상태에 업데이트
  const handlerSearchTerm = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // 총 페이지 수
  const totalPageNum = Math.ceil(posts.length / postsPerPage);

  return (
    <>
      <Banner />
      <h2 className="a11yHidden">추천</h2>
      <h3 className={classes.title}> 서울 맛집 추천</h3>
      <div className={classes['InputContainer']}>
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
              placeHolder="음식점을 검색하세요."
              isA11yHidden
              className={classes.searchFormInput}
              value={searchTerm} // 검색어 상태를 value 속성에 전달
              onChange={handlerSearchTerm}
            />
            <button
              className={classes['searchButton']}
              type="submit"
              aria-label="검색 버튼"
            >
              <img src={search} alt="검색 버튼" />
            </button>
          </div>
        </form>
      </div>
      <FoodList posts={currentPosts} loading={loading} />
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={totalPageNum}
        marginPagesDisplayed={2} //현재 페이지에서 양쪽으로 표시될 페이지 수
        pageRangeDisplayed={3} //페이지 버튼 그룹에서 표시될 페이지 수
        onPageChange={handlePageClick}
        containerClassName={classes.pagination} //페이지 버튼들을 감싸는 div에 적용될 클래스 이름
        activeClassName={classes.active} //현재 페이지에 해당하는 버튼에 적용될 클래스 이름
      />

      <ScrollButton />
    </>
  );
}
