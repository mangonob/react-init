import { Button, Col, Flex, Form, Row, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Store } from 'antd/es/form/interface';
import React, { Children, PropsWithChildren } from 'react';

import { ColProps } from 'antd/lib';
import styles from './index.module.scss';
import { ResponsiveBuilder } from '../responsive-builder';

export type SearcherProps<D> = PropsWithChildren<{
  onSearch?: (formData: D) => void;
  initialValues?: Partial<D>;
}>;

export default function Searcher<D = unknown>(props: SearcherProps<D>) {
  const { children, initialValues, onSearch } = props;

  const [form] = useForm();

  const items = Children.toArray(children);
  const extra: Partial<ColProps> = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 8,
    xl: 8,
    xxl: 8,
  };
  const renderFlex = (vertical: boolean) => (
    <Flex align="start" gap={vertical ? void 0 : 20} vertical={vertical}>
      <div className={styles.formItems}>
        <Row gutter={20}>
          {items.map((col, index) => {
            return (
              <Col key={`col-${index}`} {...extra}>
                {col}
              </Col>
            );
          })}
        </Row>
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
            onSearch?.(shakeFormData(formData as Record<string, unknown>) as D);
          }}
        >
          查询
        </Button>
      </Space>
    </Flex>
  );

  return (
    <Form
      className={styles.searcher}
      initialValues={initialValues as Store | undefined}
      form={form}
      autoComplete="off"
    >
      <ResponsiveBuilder>
        {(r) => {
          switch (r) {
            case 'xs':
            case 'sm':
              return renderFlex(true);
            default:
              return renderFlex(false);
          }
        }}
      </ResponsiveBuilder>
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
