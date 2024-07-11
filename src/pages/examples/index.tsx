import { Form, Input, Switch } from 'antd';
import React, { useState } from 'react';

export default function Examples() {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <Form>
      <Form.Item label="Show title">
        <Switch value={showTitle} onClick={setShowTitle} />
      </Form.Item>
      {showTitle && <h5>Title</h5>}
      <Input />
    </Form>
  );
}
