import { Form, Input, InputNumber, Switch } from 'antd';
import { useGeneralSettings } from './hooks';

export default function GeneralEditor() {
  const settings = useGeneralSettings();
  const { mode, groupName, unreadCount, update } = settings;

  return (
    <Form>
      <Form.Item label="是否群聊">
        <Switch
          value={mode === 'group'}
          onChange={(v) => update({ mode: v ? 'group' : 'chat' })}
        />
      </Form.Item>
      {mode === 'group' && (
        <Form.Item label="群聊标题">
          <Input
            value={groupName}
            onChange={(e) => update({ groupName: e.target.value })}
          />
        </Form.Item>
      )}
      <Form.Item label="未读条数">
        <InputNumber
          value={unreadCount}
          onChange={(n) => update({ unreadCount: n ?? 0 })}
        />
      </Form.Item>
    </Form>
  );
}
