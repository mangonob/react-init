import classNames from 'classnames';
import React, { useContext } from 'react';
import { MessageContext } from '../../message-render';
import styles from './index.module.scss';

export interface TextMessageProps {
  content?: string;
}

export default function TextMessage(props: TextMessageProps) {
  const { content = '' } = props;
  const { direction } = useContext(MessageContext);

  return (
    <div className={classNames(styles.textMessage, styles[direction])}>
      {content}
    </div>
  );
}
