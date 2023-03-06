import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import {
  dismissLoading,
  showError,
  showInfo,
  showLoading,
  showSuccess,
  showWarning,
} from 'runner-bridge';

const { Item } = Form;

export function Loading() {
  const [message, setMessage] = useState('Message');

  return (
    <Form>
      <Item label="message">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
      </Item>
      <Item>
        <Button
          onClick={() => {
            showSuccess(message);
          }}
        >
          Success
        </Button>
      </Item>
      <Item>
        <Button
          onClick={() => {
            showInfo(message);
          }}
        >
          Info
        </Button>
      </Item>
      <Item>
        <Button
          onClick={() => {
            showWarning(message);
          }}
        >
          Warning
        </Button>
      </Item>
      <Item>
        <Button
          onClick={() => {
            showError('Success');
          }}
        >
          Danger
        </Button>
      </Item>
      <Item>
        <Button
          onClick={() => {
            showLoading(message);

            setTimeout(() => {
              dismissLoading();
            }, 2000);
          }}
        >
          Loading
        </Button>
      </Item>
    </Form>
  );
}
