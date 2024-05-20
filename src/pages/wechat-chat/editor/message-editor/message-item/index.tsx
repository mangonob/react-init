import { MinusCircleFilled } from '@ant-design/icons';
import { Col, DatePicker, Flex, Form, Input, Row, Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import {
  ChatMessage,
  ChatMessageTypes,
  chatMessageTypeDescription,
} from 'src/pages/wechat-chat/models';
import { optional } from 'src/utils';
import styles from './index.module.scss';
import UserSelector from './user-selector';

export interface MessageItemProps {
  onRemove?: () => void;
  value?: ChatMessage;
  onChange?: (_: ChatMessage) => void;
}

export default function MessageItem(props: MessageItemProps) {
  const { onRemove, value, onChange } = props;
  const { type = 'text' } = value || {};

  const [options] = useState<DefaultOptionType[]>(
    ChatMessageTypes.map((t) => ({
      value: t,
      label: chatMessageTypeDescription(t),
    }))
  );

  const update = useCallback(
    (mutates: Partial<ChatMessage>) => {
      if (value) {
        onChange?.({
          ...value,
          ...mutates,
        });
      }
    },
    [onChange, value]
  );

  const [form] = Form.useForm();

  const renderMessageInputs = () => {
    switch (value?.type) {
      case 'image':
        return <p>Image</p>;
      case 'text':
        return (
          <Form.Item label="">
            <Input.TextArea
              value={value.content}
              autoSize
              onChange={(e) => update({ content: e.target.value })}
              className={styles.textArea}
              placeholder="请输入消息内容"
            />
          </Form.Item>
        );
    }
  };

  return (
    <Flex className={styles.messageItem} align="flex-start" gap={8}>
      <Form form={form} className={styles.form}>
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item label="用户" name="userId">
              <UserSelector
                value={value?.sender}
                onChange={(sender) => update({ sender })}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="消息类型">
              <Select
                options={options}
                value={type}
                onChange={(type) => update({ type })}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="消息时间">
              <DatePicker
                showTime
                className={styles.timePicker}
                value={optional(value?.createdAt, dayjs)}
                onChange={(date) =>
                  update({ createdAt: date?.toDate().getTime() })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        {<div className={styles[type]}>{renderMessageInputs()}</div>}
      </Form>
      <MinusCircleFilled
        className={styles.removeIcon}
        title="删除消息"
        onClick={onRemove}
      />
    </Flex>
  );
}
