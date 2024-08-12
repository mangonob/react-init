import { Button, Form, Spin, Tabs } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { useEffect, useState } from 'react';
import { Apply } from './contents/apply';
import Basic from './contents/basic';
import Partners from './contents/partners';
import { useApplication } from './hooks';
import styles from './index.module.scss';
import { Application } from './models';
import { jumpToErrorOccurTabIfNeeded } from './utils';

export default function Forms() {
  const [form] = Form.useForm<Application>();
  const [activeKey, setActiveKey] = useState<string>('basic');

  const app = useApplication();

  useEffect(() => {
    if (app.type === 'fulfilled') {
      form.setFieldsValue(app.data);
    }
  }, [app, form]);

  return (
    <Form form={form} className={styles.forms} autoComplete="off">
      {
        <Spin
          wrapperClassName={styles.loading}
          spinning={app.type === 'pending' || app.type === 'loading'}
        >
          <Tabs
            className={styles.tabs}
            activeKey={activeKey}
            onChange={setActiveKey}
            tabBarExtraContent={
              <Button
                type="primary"
                onClick={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      console.info('Values', values);
                    })
                    .catch((error) => {
                      const tabElement = document.querySelector(
                        `.${styles.tabs}`
                      );
                      if (tabElement) {
                        jumpToErrorOccurTabIfNeeded(
                          tabElement,
                          activeKey,
                          setActiveKey,
                          () => {
                            const errorFields = (
                              error as {
                                errorFields: { name: NamePath }[];
                              }
                            ).errorFields;

                            requestIdleCallback(() => {
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                              const bad = errorFields[0]?.name;
                              if (bad) {
                                form.scrollToField(bad);
                              }
                            });
                          }
                        );
                      }
                    });
                }}
              >
                提交
              </Button>
            }
            items={[
              {
                label: '基础信息',
                key: 'basic',
                children: <Basic />,
                forceRender: true,
              },
              {
                label: '申请信息',
                key: 'apply',
                children: <Apply />,
                forceRender: true,
              },
              {
                label: '同行人',
                key: 'patterns',
                children: <Partners />,
                forceRender: true,
              },
            ]}
          ></Tabs>
        </Spin>
      }
    </Form>
  );
}
