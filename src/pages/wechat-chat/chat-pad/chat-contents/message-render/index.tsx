import { Flex } from 'antd';
import cc from 'classcat';
import { HTMLAttributes, createContext } from 'react';
import Reversed from 'src/components/reversed';
import { useGeneralSettings } from 'src/pages/wechat-chat/editor/general-editor/hooks';
import { useChatUsers } from 'src/pages/wechat-chat/editor/user-editor/hooks';
import { SELF_USER_ID } from 'src/pages/wechat-chat/editor/user-editor/models';
import { ChatMessage } from 'src/pages/wechat-chat/models';
import ImageMessage from '../messages/image-message';
import TextMessage from '../messages/text-message';
import styles from './index.module.scss';

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
  const isInGroup = useGeneralSettings((s) => s.mode === 'group');
  const shouldShowName = message?.sender !== SELF_USER_ID && isInGroup;

  const direction: 'left' | 'right' =
    message?.sender === SELF_USER_ID ? 'right' : 'left';

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

  const user = useChatUsers((s) =>
    s.users.find((u) => u.userId === message?.sender)
  );
  const { name: userName, avatar } = user || {};

  return (
    <Flex
      className={cc([className, styles[direction], styles.messageRender])}
      justify="flex-start"
      gap={36}
      {...extra}
    >
      <Reversed reversed={direction === 'right'}>
        <div className={styles.avatar}>
          <img src={avatar}></img>
        </div>
        <MessageContext.Provider value={{ direction }}>
          <Flex
            vertical
            align={direction === 'left' ? 'flex-start' : 'flex-end'}
            gap={10}
          >
            {shouldShowName && userName && (
              <span className={styles.username}>{userName}</span>
            )}
            {renderMessage()}
          </Flex>
        </MessageContext.Provider>
      </Reversed>
    </Flex>
  );
}
