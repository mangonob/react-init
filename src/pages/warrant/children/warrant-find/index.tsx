import {
  Button,
  Flex,
  Form,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { isNil } from 'lodash-es';
import React, { Key, useCallback, useEffect, useMemo, useState } from 'react';
import Searcher from 'src/components/searcher';
import {
  useAddWatchlist,
  useRemoveWatchlist,
  useSalesOptions,
  useStockOptions,
  useWatchlist,
} from '../../hooks';
import NumberRange, { NumberRangeValue } from '../number-range';
import { fetchWarrant } from './api';
import { ColumnsSelectDropdown } from './columns-select-dropdown';
import { useDataSource, useTableColumns } from './hooks';
import {
  ColumnKey,
  FormData,
  TABLE_COLUMN_CONFIGS,
  WarrantModel,
  convertFormDataToParams,
  getColumnWidth,
} from './models';

import styles from './index.module.scss';

export default function WarrantFind() {
  const salesOptions = useSalesOptions();
  const stockOptions = useStockOptions();
  const [warrantList, setWarrantList] = useState<WarrantModel[]>([]);
  const [selectedRow, setSelectedRow] = useState<Key[]>([]);
  const { watchlist, setWatchlist } = useWatchlist();
  const dataSource = useDataSource(warrantList, 'id');
  const [isLoading, setIsLoading] = useState(false);

  const { visible, selected, options, select, unselect, update } =
    useTableColumns();

  const selectedWarrants = useMemo(() => {
    return warrantList.filter((w) => selectedRow.includes(w.id));
  }, [selectedRow, warrantList]);
  const onAddWatchlist = useAddWatchlist(selectedWarrants);
  const onRemoveWatchlist = useRemoveWatchlist(selectedWarrants);

  const onQuery = useCallback((formData: FormData) => {
    const params = convertFormDataToParams(formData);
    setIsLoading(true);
    fetchWarrant(params)
      .then((d) => {
        const {
          price: _price,
          streetRate: _streetRate,
          volume: _volume,
          changeRate: _changeRate,
        } = formData;

        const checkInRange = (v?: number, range?: NumberRangeValue) => {
          if (range && v !== undefined) {
            const { from, to } = range;
            if (from !== undefined && v < from) {
              return false;
            } else if (to !== undefined && v > to) {
              return false;
            } else {
              return true;
            }
          } else if (range === undefined && v !== undefined) {
            return true;
          } else if (v === undefined && range !== undefined) {
            return false;
          } else {
            return true;
          }
        };

        const validated = d.filter(
          ({ price, streetRate, volumn, changeRate }) => {
            return (
              checkInRange(price, _price) &&
              checkInRange(streetRate, _streetRate) &&
              checkInRange(volumn, _volume) &&
              checkInRange(changeRate, _changeRate)
            );
          }
        );

        setWarrantList(validated);
      })
      .catch(() => void 0)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    onQuery({});
  }, [onQuery]);

  const renderColumns = () => {
    return Object.entries(TABLE_COLUMN_CONFIGS)
      .filter(([k]) => visible.includes(k as keyof WarrantModel))
      .map(([key, value]) => {
        const { title, render, suggestWidth, type, compare, align } = value;

        return (
          <Table.Column<WarrantModel>
            key={key}
            width={suggestWidth}
            dataIndex={key}
            align={align ?? 'right'}
            sorter={(lhs, rhs) => {
              const _key = key as ColumnKey;
              const l = lhs[_key];
              const r = rhs[_key];
              if (l !== undefined && r !== undefined) {
                if (compare) {
                  return compare(l as never, r as never);
                } else {
                  return l > r ? 1 : -1;
                }
              } else if (l) {
                return 1;
              } else if (r) {
                return -1;
              } else {
                return 0;
              }
            }}
            showSorterTooltip={false}
            title={title}
            render={
              render
                ? (_, m) => render(m) ?? '--'
                : (d) => {
                    if (isNil(d)) {
                      return '--';
                    } else if (typeof d === 'number' && type === 'rate') {
                      return (
                        d.toLocaleString(void 0, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        }) + '%'
                      );
                    } else if (typeof d === 'number') {
                      return d.toLocaleString();
                    } else if (d instanceof Date) {
                      return dayjs(d).format('YYYY-MM-DD');
                    } else if (typeof d === 'string') {
                      return d;
                    }
                  }
            }
          />
        );
      });
  };

  const tableWidth = useMemo(() => {
    const widthes = visible.map((c) => getColumnWidth(c));
    return widthes.reduce((acc, cur) => acc + cur, 0);
  }, [visible]);

  const isOperationEnable = selectedRow.length > 0;

  return (
    <Flex vertical gap={20} className={styles.warrantFind}>
      <Searcher<FormData> onSearch={onQuery}>
        <Form.Item name="assetId" label="追踪正股">
          <Select showSearch options={stockOptions} placeholder="全部" />
        </Form.Item>
        <Form.Item name="publisher" label="发行人">
          <Select showSearch options={salesOptions} placeholder="全部" />
        </Form.Item>
        <Form.Item name="warrantType" label="沽 / 购">
          <Select
            placeholder="全部"
            options={[
              {
                value: 'ALL',
                label: '全部',
              },
              {
                value: 'CALL',
                label: '认购',
              },
              {
                value: 'PUT',
                label: '认沽',
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="exercisePrice" label="行使价">
          <NumberRange />
        </Form.Item>
        <Form.Item name="expiryDate" label="到期日">
          <Select
            options={[
              {
                value: ',30',
                label: '一个月以内',
              },
              {
                value: '30,90',
                label: '一到三个月',
              },
              {
                value: '90,270',
                label: '三到六个月',
              },
              {
                value: '270,',
                label: '六个月以上',
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="realLeverage" label="实际杠杆">
          <NumberRange />
        </Form.Item>
        <Form.Item name="premium" label="溢价">
          <NumberRange />
        </Form.Item>
        <Form.Item name="impliedVolatility" label="引申波幅">
          <NumberRange />
        </Form.Item>
        <Form.Item name="exchangeRatio" label="换股比率">
          <NumberRange />
        </Form.Item>
        <Form.Item name="price" label="现价">
          <NumberRange />
        </Form.Item>
        <Form.Item name="streetRate" label="街货比">
          <NumberRange />
        </Form.Item>
        <Form.Item name="volume" label="成交量">
          <NumberRange />
        </Form.Item>
        <Form.Item name="changeRate" label="涨跌幅">
          <NumberRange />
        </Form.Item>
      </Searcher>
      <Flex align="center" justify="space-between">
        {(dataSource.length > 0 && (
          <span className={styles.total}>
            共检索到 {dataSource.length} 条记录
          </span>
        )) || <div></div>}
        <Space>
          <ColumnsSelectDropdown
            allColumns={options}
            selectedColumns={selected}
            onSelect={select}
            onUnselect={unselect}
            onUpdate={update}
            trigger={['click']}
          />
          {watchlist.length > 0 && (
            <Button
              type="dashed"
              onClick={() => {
                Modal.confirm({
                  centered: true,
                  content: '是否清空偏好列表',
                  onOk() {
                    setWatchlist([]);
                    message.success('已清空偏好列表');
                  },
                });
              }}
            >
              清除偏好<span className={styles.badge}> {watchlist.length}</span>
            </Button>
          )}
          <Button
            type="dashed"
            disabled={!isOperationEnable}
            onClick={() => {
              onAddWatchlist();
              setSelectedRow([]);
            }}
          >
            添加到偏好
          </Button>
          <Button
            type="dashed"
            disabled={!isOperationEnable}
            onClick={() => {
              onRemoveWatchlist();
              setSelectedRow([]);
            }}
          >
            从偏好移除
          </Button>
        </Space>
      </Flex>
      <Spin spinning={isLoading}>
        <Table<WarrantModel>
          bordered
          dataSource={dataSource}
          scroll={{ x: tableWidth }}
          sortDirections={['descend', 'ascend']}
          rowSelection={{
            onChange: setSelectedRow,
            selectedRowKeys: selectedRow,
            fixed: true,
          }}
          size="middle"
          pagination={{ size: 'default' }}
        >
          {renderColumns()}
        </Table>
      </Spin>
    </Flex>
  );
}
