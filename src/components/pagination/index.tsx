import { Pagination as _Pagination, PaginationProps } from 'antd';
import React from 'react';

import styles from './index.module.scss';

export default function Pagination(props: PaginationProps) {
  return (
    <_Pagination
      className={styles.pagination}
      showTotal={(total) => {
        return (
          <span>
            共<span className={styles.totalNumber}>{total}</span>项
          </span>
        );
      }}
      showQuickJumper
      hideOnSinglePage
      {...props}
    ></_Pagination>
  );
}
