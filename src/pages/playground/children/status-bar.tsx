import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import { setStatusBar } from 'runner-bridge';

const { Item } = Form;

export function StatusBar() {
  const [isDarkStatusBar, setDarkStatusBar] = useState(false);

  return (
    <Form>
      <Item label="Status Bar Style">
        <Radio.Group
          optionType="button"
          value={isDarkStatusBar}
          onChange={(e) => setDarkStatusBar(e.target.value as boolean)}
          options={[
            {
              label: 'Dark',
              value: true,
            },
            {
              label: 'Light',
              value: false,
            },
          ]}
        ></Radio.Group>
      </Item>
      <Item>
        <Button
          type="primary"
          onClick={() => {
            setStatusBar({
              isDarkFont: isDarkStatusBar,
            });
          }}
        >
          Update
        </Button>
      </Item>
    </Form>
  );
}
