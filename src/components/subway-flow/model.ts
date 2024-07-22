import { ReactNode } from 'react';

export interface SubwayItem {
  id: string;
  lineHeight?: number;
  column?: number | string;
  row?: number | string;
  count: number;
  total: number;
  status: 'success' | 'error' | 'normal' | 'progressing';
  subject: ReactNode;
}

export interface SubwayItemDimension {
  width: number;
  height: number;
}

export interface SubwayItemDimensionEvent extends SubwayItemDimension {
  id: string;
}

export type ItemInfo = Map<string, SubwayItemDimension>;
