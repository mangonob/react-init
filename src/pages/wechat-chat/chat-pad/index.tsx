import { Flex } from 'antd';
import React, { Ref } from 'react';
import { ChatMessage } from '../models';
import ChatContents from './chat-contents';
import styles from './index.module.scss';
import InputBar from './input-bar';
import NavigationBar from './navigation-bar';

export interface ChatPadProps {
  title?: string;
  unreadCount?: number;
  messages?: ChatMessage[];
  padRef?: Ref<HTMLDivElement>;
}

export default function ChatPad(props: ChatPadProps) {
  const { title, unreadCount, messages, padRef } = props;

  return (
    <div className={styles.chatPad} ref={padRef}>
      <Flex className={styles.wrapper} vertical>
        <NavigationBar title={title} unreadCount={unreadCount} />
        <ChatContents className={styles.chatContents} messages={messages} />
        <InputBar />
      </Flex>
    </div>
  );
}
