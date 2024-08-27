'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ basePath, currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(currentPage);

  const handlePageChange = useCallback(
    (newPage: number) => {
      router.push(`${basePath}?page=${newPage}`);
      setPage(newPage);
    },
    [basePath, router],
  );

  useEffect(() => {
    const currentPage = Number(searchParams.get('page')) || 1;
    setPage(currentPage);
  }, [searchParams]);

  return (
    <div className="mx-auto my-8 w-full max-w-md px-4">
      <div className="mb-2 flex items-center justify-between">
        <Button
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          aria-label="이전 페이지로 이동"
        >
          이전
        </Button>
        <span className="text-lg font-semibold">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          aria-label="다음 페이지로 이동"
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
