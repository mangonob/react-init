import { CloudUploadOutlined } from '@ant-design/icons';
import { Flex, Input, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { whenOr } from 'src/utils';
import { ChatUserModel } from '../models';
import styles from './index.module.scss';

type Value = Omit<ChatUserModel, 'userId'>;
export interface ChatUserProps {
  value?: Value;
  onChange?: (_: Value) => void;
}

export default function ChatUser(props: ChatUserProps) {
  const { value, onChange } = props;
  const [user, setUser] = useState<Value>();
  const { name, avator } = user || {};

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
              avator: base64,
            };
            setUser(newUser);
            onChange?.(newUser);
          });
          return false;
        }}
        itemRender={() => void 0}
      >
        <div className={styles.uploader}>
          {whenOr(
            avator,
            <img src={avator} />,
            <CloudUploadOutlined className={styles.uploadIcon} />
          )}
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
