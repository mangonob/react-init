import { Flex } from 'antd';
import React from 'react';
import { SizeWith } from 'src/components/size-with';

import styles from './index.module.scss';

export default function Examples() {
  return (
    <div className={styles.example}>
      <Flex gap={20} vertical>
        <div className={styles.chess}></div>
        <SizeWith
          element={`.${styles.chess}`}
          className={styles.chess2}
        ></SizeWith>
      </Flex>
    </div>
  );
}
