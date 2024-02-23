/**
 * @description 协议字典
 * @author 高炼
 */

import { Flex, Form, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import { Pagination, Searcher } from 'src/components';
import { usePagination } from 'src/hooks/pagination';
import { showModal } from 'src/utils';
import ProtocolDictionaryDetail from './children/protocol-dictionary-detail';

export default function ProtocolDictionary() {
  const { pageNo, pageSize, onChange } = usePagination();

  const [dataSource] = useState(
    Array.from({ length: 10 }).map((_, i) => {
      return {
        key: i,
        name: `胡彦斌${i}`,
        age: 32,
        address: '西湖区湖底公园1号',
      };
    })
  );

  return (
    <Flex vertical className="ag-theme-quartz">
      <Searcher
        initialValues={{ dictType: 'file', 'file-type': 'worthManage' }}
        onSearch={(d) => {
          console.info(d);
        }}
      >
        <Form.Item name="dictType" label="字典类型">
          <Select
            options={[
              {
                value: 'file',
                label: '文件字典',
              },
              {
                value: 'biz',
                label: '业务字典',
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="file-type" label="文件类型">
          <Select
            options={[
              {
                value: 'worthManage',
                label: '理财登',
              },
              {
                value: 'csdc',
                label: '中登',
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="filename" label="文件名称">
          <Input />
        </Form.Item>
        <Form.Item name="code" label="文件代码">
          <Input />
        </Form.Item>
      </Searcher>
      <Table
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 800 }}
        bordered
        size="middle"
      >
        <Table.Column title="文件名称" dataIndex="name" key="name" />
        <Table.Column title="文件代码" dataIndex="age" key="age" />
        <Table.Column
          align="center"
          width={100}
          title="操作"
          key="action"
          render={(_, data) => {
            return (
              <a
                onClick={() => {
                  void 0 && data;
                  showModal(ProtocolDictionaryDetail, { id: '' });
                }}
              >
                详情
              </a>
            );
          }}
        />
      </Table>
      <Pagination
        total={100}
        pageSize={pageSize}
        current={pageNo}
        onChange={onChange}
      />
    </Flex>
  );
}
