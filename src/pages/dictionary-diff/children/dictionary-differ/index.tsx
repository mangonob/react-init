/**
 * @description 字典对比
 * @author 高炼
 */

import { FileSyncOutlined } from '@ant-design/icons';
import { Button, Flex, Space, Table, Tour, Transfer } from 'antd';
import { TourProps } from 'antd/lib';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { useLocalStorage } from 'react-use';

import styles from './index.module.scss';

export default function DictionaryDiffer() {
  const [worthManage, setWorthManage] = useState<string[]>([]);
  const [csdc, setCSDC] = useState<string[]>([]);
  const [isDiffing, setIsDiffing] = useState(false);

  const [dataSource] = useState(
    Array.from({ length: 10 }).map((_, i) => {
      return {
        key: `item-${i}`,
        title: `Item-${i}`,
        description: `description of ${i}`,
      };
    })
  );

  const isDiffEnable = useMemo(() => {
    // 仅支持一对多/多对一对比
    return (
      worthManage.length > 0 &&
      csdc.length > 0 &&
      !(worthManage.length > 1 && csdc.length > 1)
    );
  }, [worthManage, csdc]);

  const [isFinishTour = false, setIsFinishTuor] = useLocalStorage(
    'IS_FINISH_DICTIONARY_DIFFER_TOUR_KEY',
    false
  );
  const [isTourOpen, setIsTourOpen] = useState(true);
  const [steps] = useState<TourProps['steps']>([
    {
      title: 'Step 1',
      description: '选择需要对比的源类型',
      target: () =>
        document.querySelector(
          `.${styles.left} .ant-transfer-list`
        ) as HTMLElement,
    },
    {
      title: 'Step 2',
      description: '将选中类型移动到选中列',
      target: () =>
        document.querySelector(
          `.${styles.left} .ant-transfer-operation .ant-btn:first-child`
        ) as HTMLElement,
    },
    {
      title: 'Step 3',
      description: '同样的操作选择目标类型',
      target: () =>
        document.querySelector(
          `.${styles.right} .ant-transfer-list`
        ) as HTMLElement,
    },
    {
      title: 'Step 4',
      description: '只支持一对一，一对多对比，暂不支持多对多对比',
      target: () =>
        document.querySelector(`.${styles.diffButton}`) as HTMLElement,
      nextButtonProps: {
        children: '我知道了',
      },
    },
  ]);

  return (
    <Flex vertical className={styles.dictionaryDiff} gap={40}>
      <Flex gap={20} align="center" justify="center">
        <Transfer
          className={classNames(styles.transfer, styles.left)}
          dataSource={dataSource}
          targetKeys={worthManage}
          onChange={(keys) => setWorthManage(keys)}
          render={(e) => e.title}
          showSearch
          titles={['理财登文件类型']}
        ></Transfer>
        <Space direction="vertical" align="center">
          <FileSyncOutlined className={styles.icon} />
          <Button
            className={styles.diffButton}
            type="primary"
            disabled={!isDiffEnable}
            loading={isDiffing}
            onClick={() => {
              setIsDiffing(true);
              setTimeout(() => {
                setIsDiffing(false);
              }, 750);
            }}
          >
            {isDiffing ? '对比中' : '开始对比'}
          </Button>
        </Space>
        <Transfer
          className={classNames(styles.transfer, styles.right)}
          dataSource={dataSource}
          targetKeys={csdc}
          onChange={(keys) => setCSDC(keys)}
          render={(e) => e.title}
          showSearch
          titles={['中证登文件类型']}
        ></Transfer>
      </Flex>

      <Table
        dataSource={Array.from({ length: 10 }).map((_, i) => ({ key: i }))}
        bordered
        pagination={false}
        size="middle"
      >
        <Table.Column title="理财登文件类型" key="worthManage" />
        <Table.Column title="中证登文件类型" key="csdc" />
        <Table.Column
          align="center"
          width={100}
          title="操作"
          key="action"
          render={(_, data) => {
            return (
              <a
                onClick={() => {
                  void 0 && data;
                }}
              >
                详情
              </a>
            );
          }}
        />
      </Table>
      {isFinishTour || (
        <Tour
          open={isTourOpen}
          onClose={() => {
            setIsTourOpen(false);
            setIsFinishTuor(true);
          }}
          onFinish={() => {
            setIsFinishTuor(true);
          }}
          steps={steps}
        />
      )}
    </Flex>
  );
}
