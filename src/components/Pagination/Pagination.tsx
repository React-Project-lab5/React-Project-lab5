/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import classes from './Pagination.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
    paginate(previousPage);
  };

  const handleNext = () => {
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
              onClick={() => {
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
