import { ReactNode } from 'react';

export interface SubwayItem {
  id: string;
  count: number;
  total: number;
  status: 'success' | 'error' | 'normal' | 'progressing';
  subject: ReactNode;
}

export interface SubwayItemDimension {
  width: number;
  height: number;
}

export type SubwayItemEvent = { type: 'sizeChanged' } & SubwayItemDimension & {
    id: string;
  };

export type ItemInfo = Map<string, SubwayItemDimension>;

export enum SubwayItemKey {
  /** 导入申请  */
  ImportApplication = 'x-import-application',
  /** 渠道总控 */
  SaTotalControl = 'x-sa-total-control',
  /** 导出净值 */
  ExportNav = 'x-export-nav',
  /** 导出确认 */
  ExportCfm = 'x-export-cfm',
  /** 导入净值 */
  ImportNav = 'x-import-nav',
  /** 权益发放 */
  RightsDistrubute = 'x-rights-distrubute',
  /** 交易清算 */
  ClearTradeApp = 'x-clear-trade-app',
  /** 销售代码总控 */
  PrdTradeTotalControl = 'x-prd-trade-total-control',
  /** 产品代码总控 */
  PrdPtfTotalControl = 'x-prd-ptf-total-control',
  /** 清算过账 */
  ClearPost = 'x-clear-post',
  /** 权益登记 */
  RightsRegister = 'x-rights-register',
  /** 导出FA */
  ExprotToFa = 'x-exprot-to-fa',
  /** 日终任务 */
  DayEnd = 'x-day-end',
  /** 导出快熟 */
  ImportFastRedeem = 'x-import-fast-redeem',
  /** 收益转移 */
  IncomeTransfer = 'x-income-transfer',
  /** 导出收益 */
  ExportIncome = 'x-export-income',
  /** 资金结算 */
  Settlement = 'x-settlement',
  /** 日初任务 */
  DayBegin = 'x-day-begin',
  /** 垫资还款 */
  CreditRepay = 'x-credit-repay',
  /** 产品转换 */
  PrdTradeConvert = 'x-prd-trade-convert',
  /** 导入异常撤单 */
  ImportExceptionWithdraw = 'x-import-exception-withdraw',
  /** 异常撤单 */
  ExceptionWithdraw = 'x-exception-withdraw',
  /** T0.5垫资 */
  IntradayCredit = 'x-intraday-credit',
  /** 导出估值文件 */
  ExportFaFile = 'x-export-fa-file',
  /** 导出周边文件 */
  ExportOtherFile = 'x-export-other-file',
  /** 导入估值文件 */
  ImportFaFile = 'x-import-fa-file',
}
