import { Form, Input, Switch } from 'antd';

export default function Basic() {
  return (
    <>
      <Form.Item label="姓名" name="name" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="性别" name="sex" required>
        <Switch />
      </Form.Item>
      <Form.Item
        label="籍贯"
        name="position"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="居住地址"
        name="address"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="职业" name="job" required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="年收入"
        name="annualIncome"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="联系方式"
        name="phoneNo"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="电子邮件"
        name="emall"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
