import cc from 'classcat';
import { useContext } from 'react';

import styles from './index.module.scss';
import { MessageContext } from '../../message-render';

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
