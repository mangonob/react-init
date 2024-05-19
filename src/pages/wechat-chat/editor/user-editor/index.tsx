import { Flex, Form, Space } from 'antd';
import React from 'react';
import ChatUser from './chat-user';
import { useChatUsers } from './hooks';
import { ChatUserModel } from './models';
import { UserAddOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default function UserEditor() {
  const { users, setUsers } = useChatUsers();

  const [form] = Form.useForm();

  return (
    <Form
      className={styles.userEditor}
      form={form}
      initialValues={{ users }}
      onValuesChange={(values: { users: ChatUserModel[] }) => {
        setUsers(values.users);
      }}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => {
          return (
            <Flex wrap="wrap" align="center" gap={20}>
              {fields.map((field) => {
                return (
                  <Form.Item
                    className={styles.formItem}
                    name={field.name}
                    key={field.key}
                  >
                    <ChatUser />
                  </Form.Item>
                );
              })}
              <Space
                direction="vertical"
                onClick={() =>
                  add({
                    userId: `user-${fields.length}`,
                    name: `用户${fields.length}`,
                  })
                }
              >
                <UserAddOutlined className={styles.addIcon} />
                <span>添加用户</span>
              </Space>
            </Flex>
          );
        }}
      </Form.List>
    </Form>
  );
}
