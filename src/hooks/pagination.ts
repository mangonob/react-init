import { useCallback, useState } from 'react';

export function usePagination(config?: { pageNo?: number; pageSize?: number }) {
  const { pageSize: initialPageSize = 10, pageNo: initialPageNo = 0 } =
    config || {};

  const [pageNo, setPageNo] = useState(initialPageNo);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const onChange = useCallback(
    (newPageNo: number, newPageSize: number) => {
      if (newPageSize != pageSize) {
        setPageNo(0);
        setPageSize(newPageSize);
      } else {
        setPageNo(newPageNo);
      }
    },
    [pageSize]
  );

  const resetPage = useCallback(() => {
    setPageNo(0);
  }, []);

  return {
    pageSize,
    pageNo,
    onChange,
    resetPage,
  };
}
