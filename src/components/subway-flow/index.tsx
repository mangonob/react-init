import React, { HTMLAttributes, useMemo } from 'react';
import { createObserver } from 'src/foundation/observer';
import { SubwayFlowProvider } from './context';
import { SubwayItem, SubwayItemDimensionEvent, SubwayItemKey } from './model';
import { BluePrint, useSubwayAutoLayout } from './hooks';

interface SubwayFlowProps extends HTMLAttributes<HTMLDivElement> {
  items?: SubwayItem[];
  onItemClick?: (item: SubwayItem) => void;
  rowUnit?: number;
}

export default function SubwayFlow(props: SubwayFlowProps) {
  const { items, onItemClick, rowUnit, ...extra } = props;

  useSubwayAutoLayout(mockItem, mockBluePrint);

  const observer = useMemo(
    () => createObserver<SubwayItemDimensionEvent>(),
    []
  );

  return (
    <SubwayFlowProvider value={observer}>
      <div {...extra}></div>
    </SubwayFlowProvider>
  );
}

const mockItem: SubwayItem[] = [
  {
    id: SubwayItemKey.DayBegin,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '日初任务',
  },
  {
    id: SubwayItemKey.ImportFaFile,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导入估值文件',
  },
  {
    id: SubwayItemKey.ImportApplication,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导入申请',
  },
  {
    id: SubwayItemKey.ImportNav,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导入净值',
  },
  {
    id: SubwayItemKey.ImportFastRedeem,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导入快赎',
  },
  {
    id: SubwayItemKey.RightsDistrubute,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '权益发放',
  },
  {
    id: SubwayItemKey.ExportNav,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导出净值',
  },
  {
    id: SubwayItemKey.IncomeTransfer,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '收益转移',
  },
  {
    id: SubwayItemKey.ClearTradeApp,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '交易清算',
  },
  {
    id: SubwayItemKey.ExportIncome,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导出收益',
  },
  {
    id: SubwayItemKey.PrdTradeConvert,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '产品转换',
  },
  {
    id: SubwayItemKey.CreditRepay,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '垫资还款',
  },
  {
    id: SubwayItemKey.PrdTradeTotalControl,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '销售代码总控',
  },
  {
    id: SubwayItemKey.ImportExceptionWithdraw,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导入异常撤单',
  },
  {
    id: SubwayItemKey.PrdPtfTotalControl,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '产品代码总控',
  },
  {
    id: SubwayItemKey.ExceptionWithdraw,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '异常撤单',
  },
  {
    id: SubwayItemKey.ClearPost,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '清算过账',
  },
  {
    id: SubwayItemKey.RightsRegister,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '权益登记',
  },
  {
    id: SubwayItemKey.SaTotalControl,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '渠道总控',
  },
  {
    id: SubwayItemKey.ExportFaFile,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导出估值文件',
  },
  {
    id: SubwayItemKey.ExportOtherFile,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导出周边文件',
  },
  {
    id: SubwayItemKey.Settlement,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '资金结算',
  },
  {
    id: SubwayItemKey.ExportCfm,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '导出确认',
  },
  {
    id: SubwayItemKey.DayEnd,
    count: 1,
    total: 1,
    status: 'normal',
    subject: '日终任务',
  },
];

const mockBluePrint: BluePrint = {
  nodes: [
    {
      id: SubwayItemKey.DayBegin,
      children: [SubwayItemKey.ImportFaFile, SubwayItemKey.ImportApplication],
    },
    {
      id: SubwayItemKey.ImportApplication,
      children: [SubwayItemKey.ImportFastRedeem],
    },
    {
      id: SubwayItemKey.ImportFaFile,
      children: [SubwayItemKey.ImportNav],
    },
    {
      id: SubwayItemKey.ImportNav,
      children: [SubwayItemKey.RightsDistrubute, SubwayItemKey.ExportNav],
    },
    {
      id: SubwayItemKey.ImportFastRedeem,
      children: [SubwayItemKey.IncomeTransfer],
    },
    {
      id: SubwayItemKey.RightsDistrubute,
      children: [SubwayItemKey.IncomeTransfer],
    },
    {
      id: SubwayItemKey.IncomeTransfer,
      children: [SubwayItemKey.ClearTradeApp],
    },
    {
      id: SubwayItemKey.ClearTradeApp,
      children: [
        SubwayItemKey.ExportIncome,
        SubwayItemKey.PrdTradeConvert,
        SubwayItemKey.CreditRepay,
      ],
    },
    {
      id: SubwayItemKey.PrdTradeConvert,
      children: [SubwayItemKey.PrdTradeTotalControl],
    },
    {
      id: SubwayItemKey.PrdTradeTotalControl,
      children: [SubwayItemKey.PrdPtfTotalControl],
    },
    {
      id: SubwayItemKey.ImportExceptionWithdraw,
      children: [SubwayItemKey.ExceptionWithdraw],
    },
    {
      id: SubwayItemKey.PrdPtfTotalControl,
      children: [SubwayItemKey.ExceptionWithdraw],
    },
    {
      id: SubwayItemKey.ExceptionWithdraw,
      children: [SubwayItemKey.ClearPost],
    },
    {
      id: SubwayItemKey.RightsRegister,
      parents: [SubwayItemKey.ClearPost],
      children: [
        SubwayItemKey.SaTotalControl,
        SubwayItemKey.ExportFaFile,
        SubwayItemKey.ExportOtherFile,
        SubwayItemKey.Settlement,
      ],
    },
    {
      id: SubwayItemKey.SaTotalControl,
      children: [SubwayItemKey.ExportCfm],
    },
    {
      id: SubwayItemKey.DayEnd,
      parents: [
        SubwayItemKey.ExportCfm,
        SubwayItemKey.ExportFaFile,
        SubwayItemKey.ExportOtherFile,
      ],
    },
    {
      id: SubwayItemKey.DayEnd,
      parents: [SubwayItemKey.ExportOtherFile, SubwayItemKey.Settlement],
    },
  ],
};

function createMatrix<T = unknown>(
  row: number,
  column: number
): (T | undefined)[][] {
  const matrix = Array.from({ length: row });
  for (let i = 0; i < row; ++i) {
    matrix[i] = Array.from({ length: column });
  }
  return matrix as (T | undefined)[][];
}
