import { DownloadOutlined } from '@ant-design/icons';
import { Button, Form, Segmented } from 'antd';
import { SegmentedLabeledOption } from 'antd/lib/segmented';
import React, { useMemo } from 'react';
import { useLocalStorage } from 'react-use';

import styles from './index.module.scss';

export default function Playground() {
  const [env, setEnv] = useLocalStorage('storage:env', 'test');
  const downloadURL = useDownloadURL(env || 'test');
  const options: SegmentedLabeledOption[] = [
    { value: 'test', label: 'Test' },
    { value: 'uat', label: 'Uat' },
  ];

  return (
    <div className={styles.download}>
      <Form>
        <Form.Item label="Environment">
          <Segmented
            options={options}
            onChange={(env) => {
              if (typeof env === 'string') setEnv(env);
            }}
            defaultValue={env}
          ></Segmented>
        </Form.Item>
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
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
