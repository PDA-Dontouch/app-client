import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { useEffect } from 'react';
import {
  Chart,
  ChartCanvas,
  LineSeries,
  XAxis,
  YAxis,
  discontinuousTimeScaleProviderBuilder,
  lastVisibleItemBasedZoomAnchor,
} from 'react-financial-charts';
import { format } from 'd3-format';
import { ChartData } from '../../../types/individual_stock';
import { timeFormat } from 'd3-time-format';

const StockLineChart = () => {
  const chartData = useSelector(
    (state: RootState) => state.individualStock.chartData,
  );

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
  const end = xAccessor(data[0]);
  const xExtents = [start, end];

  const gridHeight = height - margin.top - margin.bottom;

  const chartHeight = gridHeight;

  const dateTimeFormat = '%Y/%m';
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const candleChartExtents = (data: ChartData) => {
    return [data.high, data.low];
  };

  return (
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
      disableZoom={true}
    >
      <Chart
        id={1}
        height={chartHeight}
        yExtents={candleChartExtents}
        padding={20}
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
        <LineSeries
          yAccessor={(d) => d.close}
          strokeStyle={'#1AA76E'}
          strokeWidth={2}
        />
      </Chart>
    </ChartCanvas>
  );
};

export default StockLineChart;
