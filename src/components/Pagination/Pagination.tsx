/* eslint-disable no-unused-vars */
import classes from './Pagination.module.scss';
import { FC, MouseEvent, useState } from 'react';

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
    <nav className={classes.pagination}>
      <ul>
        <button type="button" onClick={handlePrev} tabIndex={0}>
          〈
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
              className={currentPage === number ? classes.selected : ''}
              tabIndex={0}
            >
              {number}
            </a>
          </li>
        ))}
        <button type="button" onClick={handleNext} tabIndex={0}>
          〉
        </button>
      </ul>
    </nav>
  );
};
