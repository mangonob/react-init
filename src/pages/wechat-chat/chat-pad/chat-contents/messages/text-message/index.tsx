import cc from 'classcat';
import { useContext } from 'react';
import { MessageContext } from '../../message-render';
import styles from './index.module.scss';

export interface TextMessageProps {
  content?: string;
}

export default function TextMessage(props: TextMessageProps) {
  const { content = '' } = props;
  const { direction } = useContext(MessageContext);

  return (
    <div className={cc([styles.textMessage, styles[direction]])}>{content}</div>
  );
}
