import { SwapOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Outlet } from 'react-router';

export default function Scaffold() {
  const [inOrder, setInOrder] = useState(false);

  return (
    <>
      <Space direction="vertical">
        <Button
          onClick={() => {
            setInOrder(!inOrder);
          }}
          type="primary"
        >
          交换方向
        </Button>
        <AnimatePresence>
          <Space>
            <motion.div layout key={inOrder ? 'aaa' : 'bbb'}>
              {inOrder ? 'AAAAAAAAAA' : 'BBB'}
            </motion.div>
            <motion.div layout>
              <SwapOutlined />
            </motion.div>
            <motion.div layout key={inOrder ? 'bbb' : 'aaa'}>
              {inOrder ? 'BBB' : 'AAAAAAAAAA'}
            </motion.div>
          </Space>
        </AnimatePresence>
      </Space>
      <Outlet />
    </>
  );
}
