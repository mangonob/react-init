import { Button, Divider, Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import {
  navigationBack,
  navigationBackToRoot,
  navigationTo,
  setHomeTabIndex,
  setTitleBar,
} from 'runner-bridge';

const { Item } = Form;

export function Navigate() {
  const [title, setTitle] = useState<string>();
  const [subtitle, setSubtitle] = useState<string>();
  const [textColor, setTextColor] = useState<string>();
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [index, setIndex] = useState<string>();

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
                    title: 'Pop Count',
                    subTitle: 'subtitle',
                    subTitleColor: '#00FFFF',
                    titleColor: '#ff0000',
                    rightPosition: [{ icon: 'question', textColor: '#0000ff' }],
                  },
                  popCount: 1,
                },
              });
            }}
          >
            With Pop
          </Button>
          <Button
            onClick={() => {
              navigationTo({
                url: '/welcome',
                param: {
                  routerParams: '',
                  titleBar: {
                    showBorder: false,
                    background: '#00FF00',
                    title: 'Some Title',
                    subTitle: 'subtitle',
                    titleColor: '#ff0000',
                    rightPosition: [{ icon: 'question', textColor: '#0000ff' }],
                  },
                },
              });
            }}
          >
            New Navigate
          </Button>
          <Button
            onClick={() => {
              navigationBack({
                popCount: 2,
              });
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
      <Item label="Text Color">
        <Input
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
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
              titleColor: textColor,
              showBorder: true,
            });
          }}
        >
          Switch Title
        </Button>
      </Item>
      <Item label="Tab Index">
        <Input value={index} onChange={(e) => setIndex(e.target.value)}></Input>
      </Item>
      <Item>
        <Button
          onClick={() => {
            if (index) {
              setHomeTabIndex(Number.parseInt(index));
            }
          }}
        >
          Switch To {index}
        </Button>
      </Item>
      <Item>
        <Button
          onClick={() => {
            navigationBackToRoot();
          }}
        >
          Back to root
        </Button>
      </Item>
    </Form>
  );
}
