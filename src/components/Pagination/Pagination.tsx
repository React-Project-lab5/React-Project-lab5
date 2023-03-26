/* eslint-disable no-unused-vars */
import classes from './Pagination.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { FC, MouseEvent, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrev = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
    paginate(previousPage);
  };

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    paginate(nextPage);
  };

  return (
    <nav>
      <ul className={classes.pagination}>
        <button type="button" onClick={handlePrev}>
          <IoIosArrowBack />
        </button>
        {pageNumbers.map((number) => (
          <li key={number} className={classes.pageItem}>
            <a
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(number);
                paginate(number);
              }}
              href="/recommend/#"
              role="button"
            >
              {number}
            </a>
          </li>
        ))}
        <button type="button" onClick={handleNext}>
          <IoIosArrowForward />
        </button>
      </ul>
    </nav>
  );
};
