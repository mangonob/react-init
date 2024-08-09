import { Button, Form, Input } from 'antd';
import React from 'react';
import Values from 'src/components/values';

export default function Forms() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={{ values: ['a', 'b'], input: 'Default input' }}
    >
      <Form.Item label="Values" name="values">
        <Values />
      </Form.Item>
      <Form.Item label="Simple Import" name="input">
        <Input />
      </Form.Item>
      <Button
        onClick={() => {
          form.resetFields();
        }}
      >
        Reset
      </Button>
    </Form>
  );
}
