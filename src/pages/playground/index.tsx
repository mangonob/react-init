import { Button, Form, Radio, Select } from 'antd';
import React, { useMemo } from 'react';
import { useLocalStorage } from 'react-use';

import styles from './index.module.scss';

interface Option {
  value: string;
  label: string;
}
export default function Playground() {
  const [env, setEnv] = useLocalStorage('storage:env', 'test');
  const downloadURL = useDownloadURL(env || 'test');
  const options: Option[] = [
    { value: 'test', label: 'Test' },
    { value: 'uat', label: 'Uat' },
  ];

  return (
    <div className={styles.download}>
      <Form>
        <Form.Item label="Environment">
          <Radio.Group
            onChange={(e) => setEnv(e.target.value as string)}
            defaultValue={env}
          >
            {options.map(({ value, label }) => {
              return (
                <Radio.Button key={value} value={value}>
                  {label}
                </Radio.Button>
              );
            })}
          </Radio.Group>
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
    if (/iphone/i.test(navigator.userAgent)) {
      return `itms-services://?action=download-manifest&url=https://vstone-asa.oss-cn-hangzhou.aliyuncs.com/package/${env.toLowerCase()}/manifest.plist`;
    } else if (/mac/i.test(navigator.userAgent)) {
      return `https://vstone-asa.oss-cn-hangzhou.aliyuncs.com/package/${env.toLowerCase()}/Runner.ipa`;
    } else {
      return `https://vstone-asa.oss-cn-hangzhou.aliyuncs.com/package/${env.toLowerCase()}/Runner.apk`;
    }
  }, [env]);
}
