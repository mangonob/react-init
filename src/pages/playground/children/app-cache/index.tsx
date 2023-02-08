import { Button, Form, Input, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  NativeBindings,
  clearAppCache,
  getAppCache,
  putAppCache,
  removeAppCache,
} from 'runner-bridge';
import { useAppCahce } from './hooks';

const { Item } = Form;

export function AppCache() {
  const [key, setKey] = useState<string>();
  const [value, setValue] = useState<string>();
  const [fetchedValue, setFetchedValue] = useState<string>();
  const realTimeValue = useAppCahce(key || '<unknown>');

  useEffect(() => {
    NativeBindings.instance()
      .getSafeAreaInsets()
      .then(({ top }) => {
        message.config({
          top,
        });
      });
  });

  return (
    <Form>
      <Item label="Key">
        <Input value={key} onChange={(e) => setKey(e.target.value)}></Input>
      </Item>
      <Item label="Value">
        <Input value={value} onChange={(e) => setValue(e.target.value)}></Input>
      </Item>
      {key && <p>Value: {realTimeValue}</p>}
      <Item>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              if (key && value) {
                putAppCache(key, value);
              } else {
                message.error('Key and Value are required');
              }
            }}
          >
            Set Value
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (key) {
                getAppCache(key).then((value) => {
                  setFetchedValue(value);
                });
              } else {
                message.error('Key is required');
              }
            }}
          >
            Get Value
          </Button>
        </Space>
      </Item>
      {fetchedValue && <p>Got Value: {fetchedValue}</p>}
      <Item>
        <Space>
          <Button
            type="default"
            danger
            onClick={() => {
              key && removeAppCache(key);
            }}
          >
            Remove
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              clearAppCache();
            }}
          >
            Remove All
          </Button>
        </Space>
      </Item>
    </Form>
  );
}
