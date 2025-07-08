import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Upload } from 'antd';
import { whenOr } from 'src/utils';

import { ChatUserModel, SELF_USER_ID } from '../models';
import styles from './index.module.scss';

type Value = ChatUserModel;

export interface ChatUserProps {
  value?: Value;
  onChange?: (_: Value) => void;
  onRemove?: () => void;
}

export default function ChatUser(props: ChatUserProps) {
  const { value, onChange, onRemove } = props;
  const { name, avatar, userId } = value || {};

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
              ...value,
              avatar: base64,
            } as Value;
            onChange?.(newUser);
          });
          return false;
        }}
        itemRender={() => void 0}
      >
        <div className={styles.uploader}>
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
            {userId !== SELF_USER_ID && (
              <Button
                className={styles.operation}
                type="primary"
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.();
                }}
              >
                删除用户
              </Button>
            )}
            <Button className={styles.operation} type="primary">
              更换头像
            </Button>
          </Flex>
        </div>
      </Upload>
      <Input
        className={styles.nameInput}
        value={name}
        placeholder="用户名"
        onChange={(e) => {
          const newUser = {
            ...value,
            name: e.target.value,
          } as Value;
          onChange?.(newUser);
        }}
      />
    </Flex>
  );
}
