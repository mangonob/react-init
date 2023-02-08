import { Button, Divider, Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import { navigationBack, navigationTo, setTitleBar } from 'runner-bridge';

const { Item } = Form;

export function Navigate() {
  const [title, setTitle] = useState<string>();
  const [subtitle, setSubtitle] = useState<string>();
  const [backgroundColor, setBackgroundColor] = useState<string>();

  return (
    <Form>
      <Item>
        <Space>
          <Button
            onClick={() => {
              navigationTo({
                url: '/welcome',
                param: {
                  routerParams: '',
                  titleBar: {
                    background: '#ffffff',
                    title: 'Some Title',
                    subTitle: 'subtitle',
                    leftPosition: [
                      {
                        type: 'back',
                      },
                    ],
                    rightPosition: [
                      { type: 'share' },
                      {
                        type: 'jump',
                        text: '跳转',
                        url: 'http://www.example.com',
                      },
                    ],
                  },
                },
              });
            }}
          >
            New Navigate
          </Button>
          <Button
            onClick={() => {
              navigationBack();
            }}
          >
            Navigate Back
          </Button>
        </Space>
      </Item>
      <Divider />
      <Item label="Title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      </Item>
      <Item label="Sub Title">
        <Input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        ></Input>
      </Item>
      <Item label="Background Color">
        <Input
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        ></Input>
      </Item>
      <Item>
        <Button
          onClick={() => {
            setTitleBar({
              title,
              subTitle: subtitle,
              background: backgroundColor,
            });
          }}
        >
          Switch Title
        </Button>
      </Item>
    </Form>
  );
}
