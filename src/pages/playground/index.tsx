import { Button, Form, Select } from 'antd';
import React, { useMemo } from 'react';
import { useLocalStorage } from 'react-use';

import styles from './index.module.scss';

export default function Playground() {
  const [env, setEnv] = useLocalStorage('storage:env', 'test');
  const downloadURL = useDownloadURL(env || 'test');

  return (
    <div className={styles.download}>
      <Form>
        <Form.Item label="Environment">
          <Select
            options={[
              { value: 'test', label: 'Test' },
              { value: 'uat', label: 'Uat' },
            ]}
            onChange={(env) => setEnv(env)}
            defaultValue={env}
          ></Select>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            window.location.href = downloadURL;
          }}
        >
          Download
        </Button>
      </Form>
    </div>
  );
}

function useDownloadURL(env: string): string {
  return useMemo(() => {
    return `itms-services://?action=download-manifest&url=https://vstone-asa.oss-cn-hangzhou.aliyuncs.com/package/${env.toLowerCase()}/manifest.plist`;
  }, [env]);
}
