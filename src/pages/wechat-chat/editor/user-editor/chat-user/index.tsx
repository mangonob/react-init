import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { whenOr } from 'src/utils';
import { ChatUserModel } from '../models';
import styles from './index.module.scss';
import classNames from 'classnames';

type Value = Omit<ChatUserModel, 'userId'>;

export interface ChatUserProps {
  value?: Value;
  onChange?: (_: Value) => void;
}

export default function ChatUser(props: ChatUserProps) {
  const { value, onChange } = props;
  const [user, setUser] = useState<Value>();
  const { name, avatar } = user || {};

  useEffect(() => {
    if (value) {
      setUser(value);
    }
  }, [value]);

  return (
    <Flex className={styles.chatUser} gap={10} vertical>
      <Upload
        multiple={false}
        beforeUpload={(file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener('load', () => {
            const base64 = reader.result as string;
            const newUser = {
              ...user,
              avatar: base64,
            };
            setUser(newUser);
            onChange?.(newUser);
          });
          return false;
        }}
        itemRender={() => void 0}
      >
        <div className={classNames(styles.uploader)}>
          {whenOr(
            avatar,
            <img src={avatar} />,
            <CloudUploadOutlined className={styles.uploadIcon} />
          )}
          <Flex
            vertical
            className={styles.operations}
            justify="center"
            align="stretch"
            gap={4}
          >
            <Button>更换头像</Button>
            <Button>删除用户</Button>
          </Flex>
        </div>
      </Upload>
      <Input
        className={styles.nameInput}
        value={name}
        onChange={(e) => {
          const newUser = {
            ...user,
            name: e.target.value,
          };
          setUser(newUser);
          onChange?.(newUser);
        }}
      />
    </Flex>
  );
}
