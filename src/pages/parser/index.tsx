import { Divider, Form, Input, Tag } from 'antd';
import React, { useState } from 'react';
import lexer, { Token } from 'src/utils/parser/lexer';
import styles from './index.module.scss';
import parser from 'src/utils/parser';
import { Exp } from 'src/utils/parser/absyn';
import ReactJson from 'react-json-view';

export default function Parser() {
  const [form] = Form.useForm();
  const [tokens, setTokens] = useState<Token[]>();
  const [exp, setExp] = useState<Exp>();

  return (
    <Form form={form} className={styles.parser} autoComplete="off">
      <Form.Item
        label="表达式"
        name="exp"
        required
        rules={[
          {
            validator(_, value) {
              return new Promise((resolve, reject) => {
                if (typeof value === 'string') {
                  try {
                    const tokens = lexer(value);
                    setTokens(tokens);
                    const exp = parser(tokens);
                    setExp(exp);
                    resolve(void 0);
                  } catch (error) {
                    reject(error);
                  }
                } else {
                  reject('bad value');
                }
              });
            },
          },
        ]}
      >
        <Input.TextArea className={styles.expArea} />
      </Form.Item>
      {tokens && (
        <>
          <Divider orientation="left">Tokens</Divider>
          {tokens?.map((t, i) => (
            <TokenComp
              key={JSON.stringify(t).replace(/\s+/g, '') + i}
              token={t}
            />
          ))}
        </>
      )}
      {exp && (
        <>
          <Divider orientation="left">AST</Divider>
          <ReactJson src={exp} />
        </>
      )}
    </Form>
  );
}

function TokenComp(props: { token: Token }) {
  const { token } = props;

  switch (token.type) {
    case 'add':
    case 'sub':
    case 'mul':
    case 'div':
    case 'mod':
    case 'common':
      return <Tag color="red">{token.type.toUpperCase()}</Tag>;
    case 'id':
      return <Tag color="blue">ID: {token.value}</Tag>;
    case 'leftParent':
      return <Tag>(</Tag>;
    case 'rightParent':
      return <Tag>)</Tag>;
    case 'annualRate':
      return <Tag color="purple">年化: {token.value}</Tag>;
    case 'number':
      return <Tag color="green">Number: {token.value}</Tag>;
    case 'EOF':
      return <Tag color="Red">EOF</Tag>;
  }
}
