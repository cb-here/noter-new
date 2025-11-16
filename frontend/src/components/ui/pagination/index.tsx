import React from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <StyledWrapper className={className}>
      <div className="pagination-container">
        <div className="info-text">
          Showing <span className="highlight">{startItem}</span> to{' '}
          <span className="highlight">{endItem}</span> of{' '}
          <span className="highlight">{totalItems}</span> results
        </div>

        <div className="pagination-controls">
          <button
            className="page-button nav-button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <ChevronsLeft size={18} />
          </button>

          <button
            className="page-button nav-button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="page-numbers">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`page-button ${
                  page === currentPage ? 'active' : ''
                } ${page === '...' ? 'ellipsis' : ''}`}
                onClick={() => handlePageClick(page)}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="page-button nav-button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>

          <button
            className="page-button nav-button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  margin-top: 32px;

  .pagination-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .info-text {
    font-size: 14px;
    color: var(--color-text-secondary, #9ca3af);

    .highlight {
      color: var(--color-text-primary, #fff);
      font-weight: 600;
    }
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .page-numbers {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .page-button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    color: var(--color-text-primary, #fff);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(193, 163, 98, 0.3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled):not(.ellipsis) {
      background: rgba(193, 163, 98, 0.2);
      border-color: var(--color-primary, #c1a362);
      transform: translateY(-2px);
    }

    &:active:not(:disabled):not(.ellipsis) {
      transform: translateY(0);
    }

    &.active {
      background: var(--color-primary, #c1a362);
      border-color: var(--color-primary, #c1a362);
      color: #212121;
      font-weight: 700;
    }

    &.nav-button {
      padding: 8px;
      min-width: 40px;
    }

    &.ellipsis {
      cursor: default;
      background: transparent;
      border-color: transparent;

      &:hover {
        transform: none;
        background: transparent;
      }
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;

      &:hover {
        transform: none;
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(193, 163, 98, 0.3);
      }
    }
  }
`;

export default Pagination;
