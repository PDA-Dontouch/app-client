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
  HoverTooltip,
} from 'react-financial-charts';
import { ChartData } from '../../../types/individual_stock';
import { useEffect, useState } from 'react';
import { PriceType } from '../../../types/socket';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setLiveData } from '../../../store/reducers/stocks/individualStock';

interface ChartProps {
  nowPrice: PriceType;
}

const StockCandleChart = ({ nowPrice }: ChartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const chartData = useSelector(
    (state: RootState) => state.individualStock.chartData,
  );

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
    if (nowPrice.message.close !== '') {
      nowPrice.message['time'] = formattedDate;
      const liveData = {
        data: {
          response: {
            code: '',
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
      const year = d?.date?.substr(0, 4);
      const month = d?.date?.substr(4, 2);
      const day = d?.date?.substr(6, 2);
      const nDate = `${year}-${month}-${day}`;
      return new Date(nDate);
    });

  const height = 300;
  const width = window.innerWidth;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(chartData);
  const pricesDisplayFormat = format(',');

  const start = xAccessor(data[data.length - 1]);
  const end = xAccessor(data[data.length - 31]);
  const xExtents = [start, data.length < 31 ? xAccessor(data[0]) : end];

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

  const hoverTimeFormat = '%Y년 %m월 %d일';
  const HoverDisplayFormat = timeFormat(hoverTimeFormat);

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

  function tooltipContent() {
    return ({ currentItem, xAccessor }) => {
      return {
        x: HoverDisplayFormat(xAccessor(currentItem)),
        y: [
          {
            label: '시가',
            value: currentItem?.open && pricesDisplayFormat(currentItem?.open),
          },
          {
            label: '종가',
            value:
              currentItem?.close && pricesDisplayFormat(currentItem?.close),
          },
          {
            label: '고가',
            value: currentItem?.high && pricesDisplayFormat(currentItem?.high),
          },
          {
            label: '저가',
            value: currentItem?.low && pricesDisplayFormat(currentItem?.low),
          },
          {
            label: '거래량',
            value:
              currentItem?.volume && pricesDisplayFormat(currentItem?.volume),
          },
        ],
      };
    };
  }

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
      >
        <Chart
          id={1}
          height={chartHeight}
          yExtents={candleChartExtents}
          padding={20}
        >
          <HoverTooltip
            tooltip={{ content: tooltipContent() }}
            fontSize={14}
            toolTipStrokeStyle="#fca57e"
            toolTipFillStyle="#fff"
            background={{
              fillStyle: 'rgba(255, 227, 215, 0.3)',
              strokeStyle: 'ShortDash2',
            }}
            yAccessor={(d) => d.volume}
          />
          <XAxis
            showGridLines
            showTickLabel={false}
            tickStrokeStyle="#BABABA"
            strokeStyle="#BABABA"
          />
          <YAxis
            showGridLines
            tickFormat={pricesDisplayFormat}
            tickStrokeStyle="#BABABA"
            strokeStyle="#BABABA"
            tickLabelFill="#BABABA"
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
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
          padding={{ top: 10, bottom: 0 }}
        >
          <XAxis
            showGridLines
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
        <CrossHairCursor />
      </ChartCanvas>
    </>
  ) : null;
};

export default StockCandleChart;
