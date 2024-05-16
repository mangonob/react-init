import { Button, Flex } from 'antd';
import React, { useRef } from 'react';
import ChatPad from './chat-pad';
import styles from './index.module.scss';
import html2canvas from 'html2canvas';
import { download } from 'src/utils/download';
import { nanoid } from 'nanoid';
import { SELF_USER_ID } from './editor/user-editor/models';
import WechatChatEditor from './editor';

export default function WechatChat() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Flex className={styles.wechatChat} gap={20}>
      <Flex vertical gap={20}>
        <Button
          onClick={() => {
            if (ref.current) {
              html2canvas(ref.current, {
                scale: 3,
              }).then((canvas) => {
                download(canvas.toDataURL(), `${nanoid(6)}.png`);
              });
            }
          }}
        >
          Export
        </Button>
        <WechatChatEditor />
      </Flex>
      <ChatPad
        title="普京"
        unreadCount={42}
        padRef={ref}
        messages={[
          {
            type: 'text',
            content: 'akjskfajkslfjlaksdjlkfajlks',
            sender: SELF_USER_ID,
          },
          {
            type: 'text',
            content:
              'aakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlksakjskfajkslfjlaksdjlkfajlkskjskfajkslfjlaksdjlkfajlks',
            sender: 'kajslfdlk',
          },
          {
            type: 'image',
            url: 'https://img0.baidu.com/it/u=1824799915,136110678&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
            sender: SELF_USER_ID,
          },
          {
            type: 'image',
            url: 'https://img0.baidu.com/it/u=1824799915,136110678&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
            sender: 'kaslkdjfl',
          },
          {
            type: 'image',
            url: 'http://img0.baidu.com/it/u=3100773165,2148857770&fm=253&app=138&f=JPEG?w=800&h=1600',
            sender: SELF_USER_ID,
          },
          {
            type: 'image',
            url: 'http://img0.baidu.com/it/u=3100773165,2148857770&fm=253&app=138&f=JPEG?w=800&h=1600',
            sender: 'kaslkdjfl',
          },
        ]}
      />
    </Flex>
  );
}
