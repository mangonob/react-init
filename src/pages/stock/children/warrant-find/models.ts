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

export interface WarrantModel {
  /** 发行人  */
  publisher: string;
  /** 资产编号 */
  id: string;
  /** 资产名称 */
  name: string;
  /** 涡轮类型 */
  warrantType: string;
  /** 到期日 */
  expiryDate: number;
  /** 行使价 */
  exercisePrice: number;
  /** 价内/外 */
  priceDelta: number;
  /** 换股比例 */
  exchangeRatio: number;
  /** 现价 */
  price: number;
  /** 涨跌幅 */
  rate: number;
  /** 溢价 */
  premium: number;
  /** 实际杠杆 */
  realLeverage: number;
  /** 引申波幅 */
  impliedVolatility: number;
  /** 街货量 */
  streetVolume: number;
  /** 街货比 */
  streetRate: number;
  /** 成交量 */
  volumn: number;
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
        publisher,
        id,
        name,
        warrantType,
        expiryDate,
        exercisePrice,
        priceDelta,
        exchangeRatio,
        price,
        rate,
        premium,
        realLeverage,
        impliedVolatility,
        streetVolume,
        streetRate,
        volumn,
      ] = texts;

      if (texts.length !== 32) {
        throw new Error('bad warrant list data.');
      }

      const warrant: WarrantModel = {
        publisher: publisher,
        id: id,
        name: name,
        warrantType: '',
        expiryDate: 0,
        exercisePrice: 0,
        priceDelta: 0,
        exchangeRatio: 0,
        price: 0,
        rate: 0,
        premium: 0,
        realLeverage: 0,
        impliedVolatility: 0,
        streetVolume: 0,
        streetRate: 0,
        volumn: 0,
      };

      return warrant;
    });
}
