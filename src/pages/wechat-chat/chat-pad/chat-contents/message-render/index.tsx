import { Flex } from 'antd';
import React, { HTMLAttributes, createContext, useMemo } from 'react';
import Reversed from 'src/components/reversed';
import { ChatMessage } from 'src/pages/wechat-chat/models';
import styles from './index.module.scss';
import classNames from 'classnames';
import TextMessage from '../messages/text-message';
import ImageMessage from '../messages/image-message';
import { useChatUsers } from 'src/pages/wechat-chat/editor/user-editor/hooks';

export interface MessageContextValue {
  direction: 'left' | 'right';
}

export const MessageContext = createContext<MessageContextValue>({
  direction: 'left',
});

export interface MessageRenderProps extends HTMLAttributes<HTMLDivElement> {
  message?: ChatMessage;
}

export default function MessageRender(props: MessageRenderProps) {
  const { message, className, ...extra } = props;

  const direction: 'left' | 'right' =
    message?.sender === '__SELF__' ? 'right' : 'left';

  const renderMessage = () => {
    if (message) {
      switch (message.type) {
        case 'image':
          return <ImageMessage url={message.url} />;
        case 'text':
          return <TextMessage content={message.content} />;
      }
    } else {
      return void 0;
    }
  };

  const [user] = useChatUsers((s) =>
    s.users.filter((u) => u.userId === message?.sender)
  );

  const avator = useMemo(() => {
    if (user) {
      return user.avator;
    }
  }, [user]);

  return (
    <Flex
      className={classNames(className, styles[direction], styles.messageRender)}
      justify="flex-start"
      gap={36}
      {...extra}
    >
      <Reversed reversed={direction === 'right'}>
        <div className={styles.avator}>
          <img src={avator}></img>
        </div>
        <MessageContext.Provider value={{ direction }}>
          {renderMessage()}
        </MessageContext.Provider>
      </Reversed>
    </Flex>
  );
}
