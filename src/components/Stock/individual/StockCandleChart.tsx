import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-financial-charts';
import { ChartData } from '../../../types/individual_stock';
import { useEffect, useState } from 'react';
import { PriceType } from '../../../types/socket';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import {
  getChartDatas,
  setLiveData,
} from '../../../store/reducers/stocks/individualStock';

interface ChartProps {
  nowPrice: PriceType;
}

const StockChart = ({ nowPrice }: ChartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const chartData = useSelector(
    (state: RootState) => state.individualStock.chartData.prices,
  );

  useEffect(() => {
    const data = {
      exchange: 'KSC',
      stockId: 32,
      month: 30,
      interval: 5,
    };
    dispatch(getChartDatas(data));
  }, [dispatch]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');

    if (nowPrice) {
      nowPrice.message['time'] = formattedDate;
      const liveData = {
        data: {
          response: {
            date: nowPrice.message.time,
            open: parseInt(nowPrice.message.open),
            high: parseInt(nowPrice.message.high),
            low: parseInt(nowPrice.message.low),
            close: parseInt(nowPrice.message.close),
            volume: 0,
          },
        },
      };
      dispatch(setLiveData(liveData));
    }
  }, [nowPrice, dispatch]);

  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => {
      return new Date(d.date);
    });

  const height = 300;
  const width = window.innerWidth;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(chartData);
  const pricesDisplayFormat = format('.2f');

  const start = xAccessor(data[data.length - 1]);
  const end = xAccessor(data[data.length - 31]);
  const xExtents = [start, end];

  const gridHeight = height - margin.top - margin.bottom;

  const barChartHeight = gridHeight / 4;

  const barChartOrigin = (_: number, h: number) => [
    0,
    gridHeight - barChartHeight,
  ];

  const chartHeight = gridHeight - barChartHeight;

  const yExtents = (data: ChartData) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = '%Y/%m';
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const barChartExtents = (data: ChartData) => {
    return data.volume;
  };

  const candleChartExtents = (data: ChartData) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data: ChartData) => {
    return data.close;
  };

  const volumeColor = (data: ChartData) => {
    return data?.close > data?.open
      ? 'rgba(239, 83, 80, 0.6)'
      : 'rgba(38, 166, 154, 0.6)';
  };

  const volumeSeries = (data: ChartData) => {
    return data.volume;
  };

  const openCloseColor = (data: ChartData) => {
    return data?.close > data?.open ? '#ef5350' : '#26a69a';
  };

  return chartData?.length > 0 ? (
    <>
      <ChartCanvas
        height={height}
        ratio={3}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
        mouseMoveEvent={true}
      >
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
          padding={{ top: 10, bottom: 0 }}
        >
          <XAxis
            showGridLines
            showTickLabel={true}
            showTicks={true}
            tickFormat={timeDisplayFormat}
            tickStrokeStyle="#BABABA"
            strokeStyle="#BABABA"
          />
          <YAxis
            ticks={4}
            tickFormat={pricesDisplayFormat}
            tickLabelFill="#BABABA"
            tickStrokeStyle="#BABABA"
            strokeStyle="#BABABA"
          />
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>

        <Chart
          id={1}
          height={chartHeight}
          yExtents={candleChartExtents}
          padding={20}
        >
          <XAxis
            showGridLines
            showTickLabel={false}
            showTicks={false}
            strokeStyle="#BABABA"
          />
          <YAxis
            showGridLines
            tickFormat={pricesDisplayFormat}
            tickLabelFill="#BABABA"
            tickStrokeStyle="#BABABA"
            strokeStyle="#BABABA"
          />
          <CandlestickSeries fill={openCloseColor} />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
          />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
            fullWidth={true}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </>
  ) : null;
};

export default StockChart;
