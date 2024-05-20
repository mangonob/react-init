import { DownloadOutlined } from '@ant-design/icons';
import { Alert, Flex } from 'antd';
import React, { useMemo, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import ChatPad, { ChatPadInstance } from './chat-pad';
import WechatChatEditor from './editor';
import { useGeneralSettings } from './editor/general-editor/hooks';
import { useMessages } from './editor/message-editor/hooks';
import { useChatUsers } from './editor/user-editor/hooks';
import { SELF_USER_ID } from './editor/user-editor/models';
import styles from './index.module.scss';

export default function WechatChat() {
  const chatPad = useRef<ChatPadInstance>(null);
  const messages = useMessages((s) => s.messages);
  const [isReadedHelp, setReadedHelp] = useLocalStorage(
    'WECHAT_CHAT_IS_READED_HELP',
    false
  );
  const [isReadedWarn, setReadedWarn] = useLocalStorage(
    'WECHAT_CHAT_IS_READ_WARN',
    false
  );
  const first = useChatUsers((s) =>
    s.users.find((u) => u.userId !== SELF_USER_ID)
  );
  const { mode, groupName, unreadCount } = useGeneralSettings();
  const title = useMemo(() => {
    return mode === 'group' ? groupName : first?.name;
  }, [first?.name, groupName, mode]);

  return (
    <Flex className={styles.wechatChat} gap={20} justify="flex-start">
      <WechatChatEditor className={styles.editor} />
      <Flex vertical gap={10}>
        <div className={styles.padContainer}>
          <ChatPad
            title={title}
            unreadCount={unreadCount}
            messages={messages}
            ref={chatPad}
          />
          <Flex align="center" className={styles.operations} justify="center">
            <DownloadOutlined
              className={styles.operation}
              onClick={() => chatPad.current?.export()}
            />
          </Flex>
        </div>
        {!isReadedHelp && (
          <Alert
            className={styles.tips}
            message="点击图片操作进行导出、录制"
            type="info"
            closeIcon={<span>知道了</span>}
            afterClose={() => setReadedHelp(true)}
          />
        )}
        {!isReadedWarn && (
          <Alert
            className={styles.tips}
            message="所生成图片仅供娱乐，请勿用于非法用途"
            closeIcon={<span>知道了</span>}
            type="warning"
            afterClose={() => setReadedWarn(true)}
          />
        )}
      </Flex>
    </Flex>
  );
}
