import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Steps } from 'antd';
import { nanoid } from 'nanoid';
import { memo } from 'react';
import { SELF_USER_ID } from '../user-editor/models';
import { useMessages } from './hooks';
import styles from './index.module.scss';
import MessageItem from './message-item';

export default function MessageEditor() {
  const { add, remove, messages, update } = useMessages();

  const renderMessages = () => {
    return messages.map((message, index) => {
      const { id } = message;
      return (
        <Steps.Step
          key={id}
          title={
            <_MessageItem
              onRemove={() => remove(index)}
              value={message}
              onChange={(m) => update(index, m)}
            />
          }
        />
      );
    });
  };

  return (
    <Steps
      direction="vertical"
      progressDot
      className={styles.messageEditor}
      current={messages.length - 1}
    >
      {renderMessages()}
      <Steps.Step
        key="add-message"
        title={
          <Button
            className={styles.addMessage}
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              add({
                id: nanoid(),
                type: 'text',
                sender: SELF_USER_ID,
              });
            }}
          >
            添加消息
          </Button>
        }
      />
    </Steps>
  );
}

const _MessageItem = memo(MessageItem, (lhs, rhs) => lhs.value === rhs.value);
