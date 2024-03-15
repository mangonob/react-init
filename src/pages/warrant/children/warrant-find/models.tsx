import dayjs from 'dayjs';
import { NumberRangeValue } from '../number-range';
import { ReactNode } from 'react';
import React from 'react';

export interface FetchWarrantParams {
  action?: string;
  page?: number;
  num?: number;
  sort?: number;
  order?: string;
  visible?: string;
  btnClass?: string;
  product?: string;
  issuer?: string;
  ucode?: string;
  ucode_m?: string;
  wtype?: string;
  strike1?: number;
  strike2?: number;
  tm1?: number;
  tm2?: number;
  egear1?: number;
  egear2?: number;
  premium1?: number;
  premium2?: number;
  iv1?: number;
  iv2?: number;
  cratio1?: number;
  cratio2?: number;
}

export type WithKey<T> = T & { key: string | number };

export interface PriceDelta {
  rate: number;
  type: 'inner' | 'outer' | 'unknown';
}

export interface WarrantModel {
  /** 发行人  */
  publisher?: string;
  /** 资产编号 */
  id: string;
  /** 资产名称 */
  name: string;
  /** 涡轮类型 */
  warrantType?: string;
  /** 到期日 */
  expiryDate?: Date;
  /** 最后交易日 */
  lastTradeDate?: Date;
  /** 行使价 */
  exercisePrice?: number;
  /** 价内/外 */
  priceDelta?: PriceDelta;
  /** 换股比例 */
  exchangeRatio?: number;
  /** 现价 */
  price?: number;
  /** 发行商买入 */
  publisherBid?: number;
  /** 发行商卖出 */
  publisherAsk?: number;
  /** 发行商买卖价差 */
  publisherPriceDiff?: number;
  /** 涨跌额 */
  change?: number;
  /** 涨跌幅 */
  changeRate?: number;
  /** 溢价 */
  premium?: number;
  /** 实际杠杆 */
  realLeverage?: number;
  /** 引申波幅 */
  impliedVolatility?: number;
  /** 对冲值 */
  hedge?: number;
  /** 街货量 */
  streetVolume?: number;
  /** 街货比 */
  streetRate?: number;
  /** 上一日街货变化  */
  lastStreetChange?: number;
  /** 成交量 */
  volumn?: number;
  /** 打和点 */
  drawPrice?: number;
  /** 正股编号 */
  stockId?: string;
  /** 正股价格 */
  stockPrice?: number;
  /** 引申波幅敏感度 */
  impliedVolatilitySensitivity?: number;
  /** 每日时间值损耗 */
  dailyTimeCost?: number;
  /** 平均买卖价差 */
  averagePirceDiff?: number;
  /** 一格差价时间 */
  oneGridPriceTime?: number;
  /** 流通量 */
  outstandingShares?: number;
  /** 上市日期 */
  ipoDate?: Date;
}

export function parseWarrantTableString(
  htmlString: string
): WarrantModel[] | undefined {
  const table = document.createElement('table');
  const tbody = table.createTBody();
  tbody.innerHTML = htmlString.replace(/<img[^>]*>/g, '');
  return Array.from(tbody.rows)
    .filter((n) => {
      return n instanceof HTMLElement ? n.tagName === 'TR' : false;
    })
    .map((tr): WarrantModel => {
      const texts = Array.from(tr.cells)
        .map((n) => n as HTMLElement)
        .map((e) => e.textContent || '');
      texts.pop();
      texts.shift();

      const [
        _publisher,
        _id,
        _name,
        _warrantType,
        _expiryDate,
        _lastTradeDate,
        _exercisePrice,
        _priceDelta,
        _exchangeRatio,
        _price,
        _publisherBid,
        _publisherAsk,
        _publisherPriceDiff,
        _change,
        _changeRate,
        _premium,
        _realLeverage,
        _impliedVolatility,
        _hedge,
        _streetVolume,
        _streetRate,
        _lastStreetChange,
        _volumn,
        _drawPrice,
        _stockId,
        _stockPrice,
        _impliedVolatilitySensitivity,
        _dailyTimeCost,
        _averagePirceDiff,
        _oneGridPriceTime,
        _outstandingShares,
        _ipoDate,
      ] = texts;

      if (texts.length !== 32) {
        throw new Error('bad warrant list data.');
      }

      const parseNumber = (s: string): number | undefined => {
        const text = s.replace(/[^\d.-]/g, '');
        const n = Number.parseFloat(text);
        return Number.isNaN(n) ? void 0 : n;
      };

      const parseDate = (d: string): Date | undefined => {
        return dayjs(d, 'YYYY-MM-DD').toDate();
      };

      const parsePriceDelta = (s: string): PriceDelta | undefined => {
        const rate = parseNumber(s);
        if (rate !== undefined) {
          if (s.includes('價外')) {
            return { rate, type: 'outer' };
          } else if (s.includes('價內')) {
            return { rate, type: 'inner' };
          }
        }
      };

      const warrant: WarrantModel = {
        publisher: _publisher,
        id: _id,
        name: _name,
        warrantType: _warrantType,
        expiryDate: parseDate(_expiryDate),
        lastTradeDate: parseDate(_lastTradeDate),
        exercisePrice: parseNumber(_exercisePrice),
        priceDelta: parsePriceDelta(_priceDelta),
        exchangeRatio: parseNumber(_exchangeRatio),
        price: parseNumber(_price),
        publisherBid: parseNumber(_publisherBid),
        publisherAsk: parseNumber(_publisherAsk),
        publisherPriceDiff: parseNumber(_publisherPriceDiff),
        change: parseNumber(_change),
        changeRate: parseNumber(_changeRate),
        premium: parseNumber(_premium),
        realLeverage: parseNumber(_realLeverage),
        impliedVolatility: parseNumber(_impliedVolatility),
        hedge: parseNumber(_hedge),
        streetVolume: parseNumber(_streetVolume),
        streetRate: parseNumber(_streetRate),
        lastStreetChange: parseNumber(_lastStreetChange),
        volumn: parseNumber(_volumn),
        drawPrice: parseNumber(_drawPrice),
        stockId: _stockId,
        stockPrice: parseNumber(_stockPrice),
        impliedVolatilitySensitivity: parseNumber(
          _impliedVolatilitySensitivity
        ),
        dailyTimeCost: parseNumber(_dailyTimeCost),
        averagePirceDiff: parseNumber(_averagePirceDiff),
        oneGridPriceTime: parseNumber(_oneGridPriceTime),
        outstandingShares: parseNumber(_outstandingShares),
        ipoDate: parseDate(_ipoDate),
      };

      return warrant;
    });
}

export interface FormData {
  /** 正股名称 */
  assetId?: string;
  /** 发行商 */
  publisher?: string;
  /** 涡轮类型 */
  warrantType?: string;
  /** 行使价 */
  exercisePrice?: NumberRangeValue;
  /** 到期日 */
  expiryDate?: string;
  /** 实际杠杆 */
  realLeverage?: NumberRangeValue;
  /** 溢价 */
  premium?: NumberRangeValue;
  /** 引申波幅 */
  impliedVolatility?: NumberRangeValue;
  /** 换股比率 */
  exchangeRatio?: NumberRangeValue;
  /** 现价 */
  price?: NumberRangeValue;
  /** 街货比 */
  streetRate?: NumberRangeValue;
  /** 成交量 */
  volume?: NumberRangeValue;
  /** 涨跌幅 */
  changeRate?: NumberRangeValue;
}

export function convertFormDataToParams(
  formData: FormData
): FetchWarrantParams {
  const {
    assetId: _assetId,
    publisher,
    warrantType,
    exercisePrice,
    expiryDate,
    realLeverage,
    premium,
    impliedVolatility,
    exchangeRatio,
  } = formData;

  const [_tm1, _tm2] = expiryDate?.split(',') ?? [];
  const assetId = _assetId === 'ALL' ? void 0 : _assetId;

  return {
    issuer: publisher,
    wtype: warrantType,
    strike1: exercisePrice?.from,
    strike2: exercisePrice?.to,
    ucode: assetId,
    ucode_m: assetId,
    tm1: (_tm1 && _tm1.length > 0 && Number.parseInt(_tm1)) || void 0,
    tm2: (_tm2 && _tm2.length > 0 && Number.parseInt(_tm2)) || void 0,
    egear1: realLeverage?.from,
    egear2: realLeverage?.to,
    premium1: premium?.from,
    premium2: premium?.to,
    iv1: impliedVolatility?.from,
    iv2: impliedVolatility?.to,
    cratio1: exchangeRatio?.from,
    cratio2: exchangeRatio?.to,
  };
}

export type ColumnKey = keyof WarrantModel;

export type TableColumnConfig<T = never> = {
  title: string;
  type?: 'text' | 'number' | 'rate' | 'date';
  align?: 'left' | 'right' | 'center';
  suggestWidth?: number;
  render?: (m: WarrantModel) => ReactNode;
  compare?: (lhs: T, rhs: T) => number;
};

export const TABLE_COLUMN_CONFIGS: Record<
  keyof WarrantModel,
  TableColumnConfig
> = {
  publisher: { title: '发行人', suggestWidth: 80, align: 'left' },
  id: { title: '资产编码', suggestWidth: 100, align: 'left' },
  name: { title: '名称', align: 'left' },
  warrantType: { title: '涡轮类型', suggestWidth: 100 },
  expiryDate: { title: '到期日' },
  lastTradeDate: { title: '最后交易日' },
  exercisePrice: { title: '行使价' },
  priceDelta: {
    title: '价内/外',
    render: (m) => {
      const { priceDelta } = m;
      if (priceDelta) {
        const { rate, type } = priceDelta;
        const isInner = type === 'inner';
        const desc = isInner ? '价内' : '价外';
        const color = `--${isInner ? 'green' : 'red'}-color-level-6`;
        return (
          <span style={{ color: `var(${color})` }}>{`${rate}% ${desc}`}</span>
        );
      }
    },
    compare: (lhs: PriceDelta, rhs: PriceDelta) => {
      if (lhs.type === 'inner' && rhs.type === 'outer') {
        return -1;
      } else if (lhs.type === 'outer' && rhs.type === 'inner') {
        return 1;
      } else {
        return rhs.rate - lhs.rate;
      }
    },
  },
  exchangeRatio: { title: '换股比率' },
  price: { title: '现价' },
  publisherBid: { title: '发行商买入' },
  publisherAsk: { title: '发行商卖出' },
  publisherPriceDiff: { title: '发行商买卖价差' },
  change: { title: '涨跌额' },
  changeRate: { title: '涨跌幅', type: 'rate' },
  premium: { title: '溢价', type: 'rate' },
  realLeverage: { title: '实际杠杆' },
  impliedVolatility: { title: '引申波幅' },
  hedge: { title: '对冲值' },
  streetVolume: { title: '街货量' },
  streetRate: { title: '街货比', type: 'rate' },
  lastStreetChange: { title: '上一日街货变化' },
  volumn: { title: '成交量' },
  drawPrice: { title: '打和点' },
  stockId: { title: '正股编号' },
  stockPrice: { title: '正股价格' },
  impliedVolatilitySensitivity: { title: '引申波幅敏感度', type: 'rate' },
  dailyTimeCost: { title: '每日时间值损耗' },
  averagePirceDiff: { title: '平均买卖价差' },
  oneGridPriceTime: { title: '一格差价时间' },
  outstandingShares: { title: '流通量' },
  ipoDate: { title: '上市日期' },
};

export function getColumnWidth(col: ColumnKey): number {
  return TABLE_COLUMN_CONFIGS[col].suggestWidth ?? 150;
}

export const DEFAULT_COLUMNS: ColumnKey[] = [
  'publisher',
  'id',
  'name',
  'warrantType',
  'expiryDate',
  'exercisePrice',
  'priceDelta',
  'exchangeRatio',
  'price',
  'change',
  'premium',
  'realLeverage',
];
