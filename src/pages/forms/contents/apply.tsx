import { Form, Input, Switch } from 'antd';

export function Apply() {
  return (
    <>
      <Form.Item
        label="赴日理由"
        name="reason"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="是否持有日本护照"
        name="hasJPPassport"
        required
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label="签证类型"
        name="type"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="出行日期"
        name="date"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="护照号码"
        name="passpordNo"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="航班号" name="airline">
        <Input />
      </Form.Item>
      <Form.Item label="资产证明" name="assets">
        <Input />
      </Form.Item>
    </>
  );
}
