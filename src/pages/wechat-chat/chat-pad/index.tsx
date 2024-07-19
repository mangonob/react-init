import { Flex } from 'antd';
import classNames from 'classnames';
import html2canvas from 'html2canvas';
import { nanoid } from 'nanoid';
import React, {
  HTMLAttributes,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { download } from 'src/utils/download';
import { ChatMessage } from '../models';
import ChatContents from './chat-contents';
import styles from './index.module.scss';
import InputBar from './input-bar';
import NavigationBar from './navigation-bar';

export interface ChatPadProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  unreadCount?: number;
  messages?: ChatMessage[];
}

export interface ChatPadInstance {
  export: () => Promise<void> | void;
}

function ChatPad(props: ChatPadProps, ref: Ref<ChatPadInstance>) {
  const { title, unreadCount, messages, className, ...extra } = props;
  const container = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => {
    return {
      export: () => {
        return new Promise((resolve, reject) => {
          if (container.current) {
            html2canvas(container.current, {
              scale: 3,
            })
              .then((canvas) => {
                resolve();
                download(canvas.toDataURL(), `${nanoid(6)}.png`);
              })
              .catch(reject);
          } else {
            reject(new Error("Can't find container"));
          }
        });
      },
    };
  });

  return (
    <div
      className={classNames(styles.chatPad, className, 'theme-light')}
      ref={container}
      {...extra}
    >
      <Flex className={styles.wrapper} vertical>
        <NavigationBar title={title} unreadCount={unreadCount} />
        <ChatContents className={styles.chatContents} messages={messages} />
        <InputBar />
      </Flex>
    </div>
  );
}

export default forwardRef(ChatPad);
