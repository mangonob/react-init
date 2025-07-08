import { Flex } from 'antd';
import cc from 'classcat';
import { HTMLAttributes } from 'react';
import { ChatMessage } from '../../models';
import styles from './index.module.scss';
import MessageRender from './message-render';

interface ChatContentsProps extends HTMLAttributes<HTMLDivElement> {
  messages?: ChatMessage[];
}

export default function ChatContents(props: ChatContentsProps) {
  const { className, messages = [], ...extra } = props;

  const renderChats = () => {
    return messages.map((m, i) => {
      return (
        <MessageRender
          key={m.sender ? `${m.sender}-${i}` : `message-${i}`}
          message={m}
        />
      );
    });
  };

  return (
    <Flex
      className={cc([className, styles.chatContents])}
      vertical
      gap={36}
      {...extra}
    >
      {renderChats()}
      <div style={{ display: 'none' }}></div>
    </Flex>
  );
}
