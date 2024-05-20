import { Flex, Form, Input, Switch } from 'antd';
import React, { useDeferredValue, useState } from 'react';
import { ValueBuilder } from 'src/components';

export default function Examples() {
  const [_showItems, setShowItems] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const showItems = useDeferredValue(_showItems);

  const renderItems = () => {
    return (
      <Flex wrap="wrap">
        {Array.from({ length: 20_000 }).map((_, i) => {
          return (
            <ValueBuilder<number> value={i} key={i}>
              {(i) => <span>Item {i}</span>}
            </ValueBuilder>
          );
        })}
      </Flex>
    );
  };

  return (
    <Form>
      <Form.Item label="Show title">
        <Switch value={showTitle} onClick={setShowTitle} />
      </Form.Item>
      <Form.Item label="Show items">
        <Switch value={showItems} onClick={setShowItems} />
      </Form.Item>
      {showTitle && <h5>Title</h5>}
      <Input />
      {showItems && renderItems()}
    </Form>
  );
}
