import { Flex } from 'antd';
import classNames from 'classnames';
import { Block } from 'src/components';
import GeneralEditor from './general-editor';
import styles from './index.module.scss';
import MessageEditor from './message-editor';
import UserEditor from './user-editor';

export interface WechatChatEditorProps {
  className?: string;
}

export default function WechatChatEditor(props: WechatChatEditorProps) {
  const { className } = props;

  return (
    <Flex
      className={classNames(styles.wechatChatEditor, className)}
      vertical
      gap={30}
    >
      <Block title="通用配置">
        <GeneralEditor />
      </Block>
      <Block title="对话用户">
        <UserEditor />
      </Block>
      <Block title="聊天消息">
        <MessageEditor />
      </Block>
    </Flex>
  );
}
