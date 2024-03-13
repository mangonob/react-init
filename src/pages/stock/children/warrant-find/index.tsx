import { Flex, Form, Select } from 'antd';
import React, { useEffect } from 'react';
import Searcher from 'src/components/searcher';
import { useSalesOptions, useStockOptions } from '../../hooks';
import NumberRange from '../number-range';
import { fetchWarrant } from './api';

export default function WarrantFind() {
  const salesOptions = useSalesOptions();
  const stockOptions = useStockOptions();

  useEffect(() => {
    fetchWarrant({});
  }, []);

  return (
    <Flex vertical>
      <Searcher
        onSearch={(q) => {
          console.info(q);
        }}
      >
        <Form.Item name="stock" label="追踪正股" required>
          <Select showSearch options={stockOptions} />
        </Form.Item>
        <Form.Item name="saler" label="发行人" required>
          <Select options={salesOptions} />
        </Form.Item>
        <Form.Item name="type" label="沽 / 购">
          <Select
            options={[
              {
                value: 'CALL',
                label: '认购',
              },
              {
                value: 'PUT',
                label: '认沽',
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="price" label="行使价">
          <NumberRange />
        </Form.Item>
        <Form.Item name="dqr" label="到期日">
          <Select
            options={[
              {
                value: '<30',
                label: '一个月以内',
              },
              {
                value: '30~90',
                label: '一至三个月',
              },
              {
                value: '>90',
                label: '三个月以上',
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="actual-rate" label="实际杠杆">
          <NumberRange />
        </Form.Item>
        <Form.Item name="overprice" label="溢价">
          <NumberRange />
        </Form.Item>
        <Form.Item name="iv" label="引申波幅">
          <NumberRange />
        </Form.Item>
        <Form.Item name="change-stock-rate" label="换股比率">
          <NumberRange />
        </Form.Item>
      </Searcher>
    </Flex>
  );
}
