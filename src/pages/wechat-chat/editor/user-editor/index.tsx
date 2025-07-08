import { UserAddOutlined } from '@ant-design/icons';
import { Flex, Form, Space } from 'antd';
import cc from 'classcat';
import { nanoid } from 'nanoid';
import { memo } from 'react';
import ChatUser from './chat-user';
import { useChatUsers } from './hooks';
import styles from './index.module.scss';
import { ChatUserModel } from './models';

export interface UserEditorProps {
  className?: string;
}

export default function UserEditor(props: UserEditorProps) {
  const { className } = props;

  const { users, setUsers } = useChatUsers();
  const [form] = Form.useForm();

  return (
    <Form
      className={cc([styles.userEditor, className])}
      form={form}
      initialValues={{ users }}
      onValuesChange={() => {
        const { users } = form.getFieldsValue() as { users: ChatUserModel[] };
        setUsers(users);
      }}
    >
      <Form.List name="users">
        {(fields, { add, remove }) => {
          return (
            <Flex wrap="wrap" align="center" gap={20}>
              {fields.map((field, index) => {
                const { userId } = form.getFieldValue([
                  'users',
                  index,
                ]) as ChatUserModel;

                return (
                  <Form.Item
                    className={styles.formItem}
                    name={field.name}
                    key={userId}
                  >
                    <_ChatUser onRemove={() => remove(index)} />
                  </Form.Item>
                );
              })}
              <Space
                className={styles.addOperation}
                align="center"
                direction="vertical"
                size={2}
                onClick={() =>
                  add({
                    userId: `user${nanoid(8)}`,
                    name: `用户${nanoid(4)}`,
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

const _ChatUser = memo(ChatUser, (lhs, rhs) => lhs.value === rhs.value);
