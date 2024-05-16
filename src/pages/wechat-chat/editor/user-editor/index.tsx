import { Form } from 'antd';
import React from 'react';
import ChatUser from './chat-user';
import { useChatUsers } from './hooks';
import { ChatUserModel } from './models';

export default function UserEditor() {
  const { users, setUsers } = useChatUsers();

  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={{ users }}
      onValuesChange={(values: { users: ChatUserModel[] }) => {
        setUsers(values.users);
      }}
    >
      <Form.List name="users">
        {(fields) => {
          return fields.map((field) => {
            return (
              <Form.Item name={field.name} key={field.key}>
                <ChatUser />
              </Form.Item>
            );
          });
        }}
      </Form.List>
    </Form>
  );
}
