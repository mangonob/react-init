import { Chart } from '@antv/g2';
import React, {
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { fetchImpliedVolatilityData } from './api';
import { ImpliedVolatilityFetchResult } from './models';
import { Spin } from 'antd';
import { useElementSize } from 'src/hooks';
import dayjs from 'dayjs';
import { standardDeviation } from 'src/utils/statistics';

export interface ImpliedVolatilityGraphProps
  extends HTMLAttributes<HTMLDivElement> {
  assetId: string;
  name?: string;
  standardDeviationCount?: number;
}

interface TableData {
  x: string;
  value: number;
}

export function ImpliedVolatilityGraph(props: ImpliedVolatilityGraphProps) {
  const { assetId, style, name, standardDeviationCount = 10, ...extra } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [impliedVolatility, setImpliedVolatility] =
    useState<ImpliedVolatilityFetchResult>();

  useEffect(() => {
    setIsLoading(true);
    fetchImpliedVolatilityData(assetId)
      .then(setImpliedVolatility)
      .catch(() => void 0)
      .finally(() => setIsLoading(false));
  }, [assetId]);

  const [elementRef, setElemenetRef] = useState<HTMLDivElement | null>();
  const [width, height] = useElementSize(elementRef || void 0);
  const chartRef = useRef<Chart>();

  useEffect(() => {
    const chart = new Chart({
      autoFit: true,
      height: 350,
    });
    chart
      .line()
      .encode('shape', 'smooth')
      .encode('x', 'x')
      .encode('y', 'value');
    chart.axis('y', { title: false });
    chartRef.current = chart;

    return () => chart.destroy();
  }, []);

  const data = useMemo((): TableData[] => {
    return impliedVolatility
      ? impliedVolatility.mainData.ivdata.map(
          ([ts, impliedVolatility]): TableData => {
            return {
              x: dayjs(ts).format('MM-DD'),
              value: impliedVolatility,
            };
          }
        )
      : [];
  }, [impliedVolatility]);

  const _standardDeviation = useMemo((): number => {
    return impliedVolatility
      ? standardDeviation(
          impliedVolatility.mainData.ivdata
            .map(([, v]) => v)
            .slice(-standardDeviationCount)
        )
      : 0;
  }, [impliedVolatility, standardDeviationCount]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.changeData(data);
      chart.render();
    }
  }, [data]);

  useEffect(() => {
    chartRef.current?.axis('x', {
      title: `${assetId}|${name} (σ = ${_standardDeviation.toFixed(3)})`,
    });
    chartRef.current?.render();
  }, [_standardDeviation, assetId, name]);

  useEffect(() => {
    if (width > 0 && height > 0) {
      const t = setTimeout(() => {
        chartRef.current?.changeSize(width, height);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [width, height]);

  useEffect(() => {
    const chart = chartRef.current;
    if (elementRef && chart) {
      const el = chart.getContainer();
      elementRef.append(el);
      return () => el.remove();
    }
  }, [elementRef]);

  return (
    <Spin spinning={isLoading}>
      <div
        style={{ height: 350, ...style }}
        {...extra}
        ref={setElemenetRef}
      ></div>
    </Spin>
  );
}
