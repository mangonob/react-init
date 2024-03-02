import { Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router';
import TextDiff from 'src/components/text-diff';

export default function Scaffold() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <>
      <Space direction="vertical">
        <Form>
          <Form.Item name="from" label="From">
            <Input.TextArea
              value={from}
              onChange={(t) => setFrom(t.target.value.trim())}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item name="to" label="To">
            <Input.TextArea
              value={to}
              onChange={(t) => setTo(t.target.value.trim())}
              autoComplete="off"
            />
          </Form.Item>
        </Form>
        <TextDiff source={from} dest={to} />
      </Space>
      <Outlet />
    </>
  );
}
