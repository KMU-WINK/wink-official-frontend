import React, { Dispatch, SetStateAction } from 'react';

interface TablePagingProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
}

export const TablePaging: React.FC<TablePagingProps> = ({ page, setPage, maxPage }) => {
  const getPaginationRange = (current: number, max: number) => {
    if (max <= 5) return Array.from({ length: max }, (_, i) => i + 1);
    if (current === 1 || current == 2) return [1, 2, 3, 4, 5];
    if (current === max - 1) return [max - 4, max - 3, max - 2, max - 1, max];
    if (current === max) return [max - 4, max - 3, max - 2, max - 1, max];
    return [current - 2, current - 1, current, current + 1, current + 2];
  };

  const paginationRange = getPaginationRange(page, maxPage);

  return (
    <div className="mt-4 flex justify-center items-center space-x-2">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded-md transition duration-300 bg-white text-wink-500 hover:bg-wink-100 disabled:opacity-50"
      >
        &lt;
      </button>
      {paginationRange.map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          className={`px-3 py-1 rounded-md transition duration-300 ${
            page === number ? 'bg-wink-500 text-white' : 'bg-white text-wink-500 hover:bg-wink-100'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, maxPage))}
        disabled={page === maxPage}
        className="px-3 py-1 rounded-md transition duration-300 bg-white text-wink-500 hover:bg-wink-100 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};
