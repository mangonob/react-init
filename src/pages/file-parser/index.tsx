/**
 * @description 文件解析
 * @author 高炼
 */

import { InboxOutlined } from '@ant-design/icons';
import { Button, Flex, Table, Upload } from 'antd';
import React from 'react';

import styles from './index.module.scss';

export default function FileParser() {
  return (
    <Flex className={styles.fileParser} vertical align="center" gap={20}>
      <Upload.Dragger>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽上传文件</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Upload.Dragger>
      <Button type="primary">开始解析</Button>
      <Table className={styles.table}>
        <Table.Column key="filename" title="文件名" />
        <Table.Column key="protocol" title="文件协议" />
        <Table.Column key="message" title="文件报文" />
        <Table.Column key="filetype" title="文件类型" />
        <Table.Column key="created" title="文件生成日期" />
        <Table.Column key="sender" title="发送方" />
        <Table.Column key="receiver" title="接收方" />
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
                }}
              >
                详情
              </a>
            );
          }}
        />
      </Table>
    </Flex>
  );
}
