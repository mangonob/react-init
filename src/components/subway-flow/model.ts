import { ReactNode } from 'react';

export interface SubwayItem {
  id: string;
  count: number;
  total: number;
  status: 'success' | 'error' | 'normal' | 'progressing' | 'disabled';
  subject: ReactNode;
}

export interface Size {
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;

  get minX(): number {
    return this.x;
  }
  get minY(): number {
    return this.y;
  }
  get maxX(): number {
    return this.x + this.width;
  }

  get maxY(): number {
    return this.y + this.height;
  }

  get leftTop(): Point {
    return {
      x: this.x,
      y: this.y,
    };
  }

  get rightTop(): Point {
    return {
      x: this.x + this.width,
      y: this.y,
    };
  }

  get leftBottom(): Point {
    return {
      x: this.x,
      y: this.y + this.height,
    };
  }

  get rightBottom(): Point {
    return {
      x: this.x + this.width,
      y: this.y + this.height,
    };
  }

  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  extendPoint(point: Point) {
    const { x: px, y: py } = point;
    if (px < this.minX) {
      this.width = this.maxX - px;
      this.x = px;
    }
    if (px > this.maxX) {
      this.width = px - this.minX;
    }
    if (py < this.minY) {
      this.height = this.maxY - py;
      this.y = py;
    }
    if (py > this.maxY) {
      this.height = py - this.minY;
    }
  }

  ceil(): Rect {
    return new Rect(
      Math.floor(this.x),
      Math.floor(this.y),
      Math.ceil(this.width),
      Math.ceil(this.height)
    );
  }

  floor(): Rect {
    return new Rect(
      Math.ceil(this.x),
      Math.ceil(this.y),
      Math.floor(this.width),
      Math.floor(this.height)
    );
  }

  extendRect(rect: Rect) {
    this.extendPoint(rect.leftTop);
    this.extendPoint(rect.rightTop);
    this.extendPoint(rect.leftBottom);
    this.extendPoint(rect.rightBottom);
  }
}

export type SubwayItemDimension = Size;

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

export class Matrix<T> {
  private elem: (T | undefined)[][];
  private _column: number;
  private _row: number;

  constructor(row: number, column: number) {
    this.elem = Array.from({ length: row + 1 });
    this._column = column;
    this._row = row;
    for (let i = 0; i < row + 1; ++i) {
      this.elem[i] = Array.from({ length: column + 1 });
    }
  }

  get column(): number {
    return this._column;
  }

  get row(): number {
    return this._row;
  }

  removeColumn(column: number): boolean {
    if (column >= 1 && column <= this.column) {
      for (let i = 0; i <= this.row; ++i) {
        this.elem[i].splice(column, 1);
      }
      this._column -= 1;
      return true;
    } else {
      return false;
    }
  }

  removeRow(row: number): boolean {
    if (row >= 1 && row <= this.row) {
      this.elem.splice(row, 1);
      this._row -= 1;
      return true;
    } else {
      return false;
    }
  }

  getVector(param: { row: number } | { column: number }): (T | undefined)[] {
    if ('row' in param) {
      const { row } = param;
      return this.elem[row].slice(1);
    } else if ('column' in param) {
      const { column } = param;
      const vector: (T | undefined)[] = [];
      for (let i = 1; i <= this.row; ++i) {
        vector.push(this.get(i, column));
      }
      return vector;
    } else {
      return [];
    }
  }

  get(row: number, column: number): T | undefined {
    return this.elem[row][column];
  }

  set(element: T | undefined, row: number, column: number): void {
    this.elem[row][column] = element;
  }

  forEach(fn: (elem: T, row: number, column: number) => void) {
    for (let i = 1; i <= this.row; ++i) {
      for (let j = 1; j <= this.column; ++j) {
        const elem = this.get(i, j);
        if (elem !== void 0) {
          fn(elem, i, j);
        }
      }
    }
  }

  toString(): string {
    const descriptions: string[] = [];
    for (let i = 1; i <= this.row; ++i) {
      const desc: string[] = [];
      for (let j = 1; j <= this.column; ++j) {
        const n = this.get(i, j);
        desc.push(n ? 'x' : ' ');
      }
      descriptions.push(desc.join(''));
    }
    return descriptions.join('\n');
  }
}
