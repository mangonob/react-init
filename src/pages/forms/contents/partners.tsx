import { Form, Input } from 'antd';
import { useEffect } from 'react';

export default function Partners() {
  useEffect(() => {
    console.info('Partners loaded');
  }, []);

  return (
    <>
      <Form.Item label="姓名" name="pname">
        <Input />
      </Form.Item>
      <Form.Item label="性别" name="psex">
        <Input />
      </Form.Item>
      <Form.Item label="联系方式" name="pphoneNo">
        <Input />
      </Form.Item>
      <Form.Item label="电子邮件" name="pemall">
        <Input />
      </Form.Item>
    </>
  );
}
