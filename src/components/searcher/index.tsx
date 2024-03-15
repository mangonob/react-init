import { Button, Col, Flex, Form, Row, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Store } from 'antd/es/form/interface';
import React, { Children } from 'react';
import { PropsWithChildren } from 'react';

import styles from './index.module.scss';

export type SearcherProps<D> = PropsWithChildren<{
  onSearch?: (formData: D) => void;
  initialValues?: Partial<D>;
}>;

export default function Searcher<D = unknown>(props: SearcherProps<D>) {
  const { children, initialValues, onSearch } = props;

  const [form] = useForm();

  const column = 3;
  const rows: (typeof items)[] = [];
  const items = Children.toArray(children);
  while (items.length > 0) {
    rows.push(items.slice(0, column));
    items.splice(0, column);
  }
  return (
    <Form
      className={styles.searcher}
      initialValues={initialValues as Store | undefined}
      form={form}
      autoComplete="off"
    >
      <Flex align="start" gap={20}>
        <div className={styles.formItems}>
          {rows.map((cols, index) => {
            return (
              <Row key={`row-${index}`} gutter={20}>
                {cols.map((col, index) => {
                  return (
                    <Col key={`col-${index}`} span={8}>
                      {col}
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
        <Space>
          <Button
            type="dashed"
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <Button
            type="primary"
            icon={'Q'}
            onClick={async () => {
              const formData: unknown = await form.validateFields();
              onSearch?.(
                shakeFormData(formData as Record<string, unknown>) as D
              );
            }}
          >
            查询
          </Button>
        </Space>
      </Flex>
    </Form>
  );
}

function shakeFormData(obj: Record<string, unknown>): Record<string, unknown> {
  const entries: [string, unknown][] = Object.entries(obj).flatMap(([k, v]) => {
    if (v === undefined || v === null) {
      return [];
    } else if (typeof v === 'string') {
      const trimed = v.trim();
      return trimed.length <= 0 ? [] : [[k, trimed]];
    } else if (typeof v === 'object') {
      return [[k, shakeFormData(v as Record<string, unknown>)]];
    }
    return [[k, v]];
  });

  return Object.fromEntries(entries);
}
