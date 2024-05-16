import { Input, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
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
    <div className={styles.chatUser}>
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
        onChange={({ file }) => {
          switch (file.status) {
            case 'done':
              console.info('Done');
              break;
            case 'error':
              console.info('Error');
              break;
            case 'removed':
              console.info('Removed');
              break;
            case 'uploading':
              console.info('Uploading');
              break;
          }
        }}
      >
        <div className={styles.uploader}>{avator && <img src={avator} />}</div>
      </Upload>
      <Input
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
    </div>
  );
}
