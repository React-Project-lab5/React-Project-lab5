import axios from 'axios';
import { useEffect, useState } from 'react';
import { FoodList } from '@/components/FoodList/FoodList';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Pagination } from '@/components/Pagination/Pagination';
import { Banner } from '@/components';
export default function Recommend() {
  useDocumentTitle('슬기로운 N밥 생활 | 추천');

  const [postsPerPage] = useState(12);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const url = `https://api.odcloud.kr/api/15097008/v1/uddi:1e5a6f2e-3f79-49bd-819b-d17541e6df78?page=5&perPage=60&serviceKey=${
    import.meta.env.VITE_SERVICE_KEY
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(url);
        console.log(data);
        setPosts(data.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.log(error.data);
          console.log(error.status);
        } else {
          console.error(error.message);
        }
      }
    };

    fetchData();
  }, [url]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Banner />
      <h1 className="a11yHidden"> 서울 음식점 추천</h1>
      <FoodList posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </>
  );
}
