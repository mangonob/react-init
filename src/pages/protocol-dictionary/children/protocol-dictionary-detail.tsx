import { Descriptions, Flex, Modal, ModalProps, Table } from 'antd';
import React, { useState } from 'react';

export interface ProtocolDictionaryDetailProps extends ModalProps {
  id: string;
}

export default function ProtocolDictionaryDetail(
  props: ProtocolDictionaryDetailProps
) {
  const [fileInfoItems] = useState([
    {
      key: 'filename',
      label: '文件名称',
      children: '账户确认',
    },
    {
      key: 'filecode',
      label: '文件代码',
      children: '02',
    },
    {
      key: 'notes',
      label: '备注',
      children:
        '账户确认数据项见下表，各字段是否必须根据业务类型而不同，详见前述各章节。',
      span: 2,
    },
  ]);

  return (
    <Modal width="80%" {...props}>
      <Flex vertical gap={20}>
        <Descriptions
          title="文件信息"
          column={2}
          bordered
          items={fileInfoItems}
        />
        <Flex vertical>
          <Descriptions title="字段信息" />
          <Table bordered pagination={false} scroll={{ y: 800 }} size="small">
            <Table.Column key="filename" title="文件名称" />
            <Table.Column key="fileCode" title="文件代码" />
            <Table.Column key="bizName" title="类型" />
            <Table.Column key="bizCode" title="长度" />
            <Table.Column key="required" title="是否必须" />
            <Table.Column key="notes" title="备注" />
          </Table>
        </Flex>
      </Flex>
    </Modal>
  );
}
