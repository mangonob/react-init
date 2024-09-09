import React from 'react';
import SubwayFlow from 'src/components/subway-flow';
import { Blueprint } from 'src/components/subway-flow/hooks';
import { SubwayItem } from 'src/components/subway-flow/model';
import styles from './index.module.scss';
import { SubwayItemKey } from './model';
import { Flex } from 'antd';

export default function Examples() {
  return (
    <div className={styles.examples}>
      <Flex wrap gap={16} vertical>
        <div className={styles.subwayScroller}>
          <SubwayFlow
            items={mockItem}
            blueprint={mockBlueprint}
            style={{ minHeight: 228 }}
          />
        </div>
        <h1>Examples</h1>
      </Flex>
    </div>
  );
}

const mockItem: SubwayItem[] = [
  {
    id: SubwayItemKey.DayBegin,
    count: 7,
    total: 10,
    status: 'success',
    subject: '日初任务',
  },
  {
    id: SubwayItemKey.ImportFaFile,
    count: 7,
    total: 10,
    status: 'error',
    subject: '导入估值文件',
  },
  {
    id: SubwayItemKey.ImportApplication,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '导入申请',
  },
  {
    id: SubwayItemKey.ImportNav,
    count: 7,
    total: 10,
    status: 'progressing',
    subject: '导入净值',
  },
  {
    id: SubwayItemKey.ImportFastRedeem,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '导入快赎',
  },
  {
    id: SubwayItemKey.RightsDistrubute,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '权益发放',
  },
  {
    id: SubwayItemKey.ExportNav,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '导出净值',
  },
  {
    id: SubwayItemKey.IncomeTransfer,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '收益转移',
  },
  {
    id: SubwayItemKey.ClearTradeApp,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '交易清算',
  },
  {
    id: SubwayItemKey.ExportIncome,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '导出收益',
  },
  {
    id: SubwayItemKey.PrdTradeConvert,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '产品转换',
  },
  {
    id: SubwayItemKey.CreditRepay,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '垫资还款',
  },
  {
    id: SubwayItemKey.PrdTradeTotalControl,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '销售代码总控',
  },
  {
    id: SubwayItemKey.ImportExceptionWithdraw,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '导入异常撤单',
  },
  {
    id: SubwayItemKey.PrdPtfTotalControl,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '产品代码总控',
  },
  {
    id: SubwayItemKey.ExceptionWithdraw,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '异常撤单',
  },
  {
    id: SubwayItemKey.ClearPost,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '清算过账',
  },
  {
    id: SubwayItemKey.RightsRegister,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '权益登记',
  },
  {
    id: SubwayItemKey.SaTotalControl,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '渠道总控',
  },
  {
    id: SubwayItemKey.ExportFaFile,
    count: 7,
    total: 10,
    status: 'normal',
    subject:
      '导出估值文件，搞个超长的名字试一试最好是能直接把下一列的节点都戳出去',
  },
  {
    id: SubwayItemKey.ExportOtherFile,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '导出周边文件',
  },
  {
    id: SubwayItemKey.Settlement,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '资金结算',
  },
  {
    id: SubwayItemKey.ExportCfm,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '导出确认',
  },
  {
    id: SubwayItemKey.DayEnd,
    count: 7,
    total: 10,
    status: 'normal',
    subject: '日终任务',
  },
];

const mockBlueprint: Blueprint = {
  nodes: [
    {
      id: SubwayItemKey.DayBegin,
      row: 2,
      column: 1,
      children: [SubwayItemKey.ImportFaFile, SubwayItemKey.ImportApplication],
      anchorPriority: 1,
    },
    {
      id: SubwayItemKey.ImportApplication,
      row: 1,
      column: 3,
      children: [SubwayItemKey.ImportFastRedeem],
    },
    {
      id: SubwayItemKey.ImportFaFile,
      row: 2,
      column: 2,
      children: [SubwayItemKey.ImportNav],
    },
    {
      id: SubwayItemKey.ImportNav,
      row: 2,
      column: 3,
      children: [SubwayItemKey.RightsDistrubute, SubwayItemKey.ExportNav],
    },
    {
      id: SubwayItemKey.ExportNav,
      row: 3,
      column: 4,
    },
    {
      id: SubwayItemKey.ImportFastRedeem,
      row: 1,
      column: 4,
      children: [SubwayItemKey.IncomeTransfer],
    },
    {
      id: SubwayItemKey.RightsDistrubute,
      row: 2,
      column: 4,
      children: [SubwayItemKey.IncomeTransfer],
    },
    {
      id: SubwayItemKey.IncomeTransfer,
      row: 2,
      column: 5,
      children: [SubwayItemKey.ClearTradeApp],
    },
    {
      id: SubwayItemKey.ClearTradeApp,
      row: 2,
      column: 6,
      children: [
        SubwayItemKey.ExportIncome,
        SubwayItemKey.PrdTradeConvert,
        SubwayItemKey.CreditRepay,
      ],
    },
    {
      id: SubwayItemKey.ExportIncome,
      row: 1,
      column: 7,
    },
    {
      id: SubwayItemKey.PrdTradeConvert,
      row: 2,
      column: 7,
      children: [SubwayItemKey.PrdTradeTotalControl],
    },
    {
      id: SubwayItemKey.CreditRepay,
      row: 3,
      column: 7,
    },
    {
      id: SubwayItemKey.PrdTradeTotalControl,
      row: 2,
      column: 8,
      children: [SubwayItemKey.PrdPtfTotalControl],
    },
    {
      id: SubwayItemKey.ImportExceptionWithdraw,
      row: 1,
      column: 9,
      children: [SubwayItemKey.ExceptionWithdraw],
    },
    {
      id: SubwayItemKey.PrdPtfTotalControl,
      row: 2,
      column: 9,
      children: [SubwayItemKey.ExceptionWithdraw],
    },
    {
      id: SubwayItemKey.ExceptionWithdraw,
      row: 2,
      column: 10,
      children: [SubwayItemKey.ClearPost],
    },
    {
      id: SubwayItemKey.ClearPost,
      row: 2,
      column: 11,
      children: [SubwayItemKey.RightsRegister],
    },
    {
      id: SubwayItemKey.RightsRegister,
      row: 2,
      column: 12,
      children: [
        SubwayItemKey.SaTotalControl,
        SubwayItemKey.ExportFaFile,
        SubwayItemKey.ExportOtherFile,
        SubwayItemKey.Settlement,
      ],
    },
    {
      id: SubwayItemKey.SaTotalControl,
      row: 1,
      column: 13,
      children: [SubwayItemKey.ExportCfm],
    },
    {
      id: SubwayItemKey.DayEnd,
      row: 2,
      column: 15,
      anchorPriority: 1,
      parents: [
        SubwayItemKey.ExportCfm,
        SubwayItemKey.ExportFaFile,
        SubwayItemKey.ExportOtherFile,
        SubwayItemKey.Settlement,
      ],
    },
    {
      id: SubwayItemKey.ExportCfm,
      row: 1,
      column: 14,
    },
    {
      id: SubwayItemKey.ExportFaFile,
      row: 2,
      column: 13,
    },
    {
      id: SubwayItemKey.ExportOtherFile,
      row: 3,
      column: 13,
    },
    {
      id: SubwayItemKey.Settlement,
      row: 4,
      column: 13,
    },
  ],
};
