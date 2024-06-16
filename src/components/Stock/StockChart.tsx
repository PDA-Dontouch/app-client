import ApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { getChartDatas } from '../../store/reducers/stocks/individualStock';

const StockChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chartData = useSelector(
    (state: RootState) => state.individualStock.chartData,
  );

  useEffect(() => {
    const data = {
      exchange: 'KSC',
      stockId: 5,
      month: 30,
      interval: 5,
    };
    dispatch(getChartDatas(data));
  }, []);

  console.log(chartData);
  const data = [
    {
      date: '2024-06-07',
      close_price: 77300.0,
    },
    {
      date: '2024-05-30',
      close_price: 73500.0,
    },
    {
      date: '2024-05-23',
      close_price: 78300.0,
    },
    {
      date: '2024-05-16',
      close_price: 78200.0,
    },
    {
      date: '2024-05-08',
      close_price: 81300.0,
    },
    {
      date: '2024-04-29',
      close_price: 76700.0,
    },
    {
      date: '2024-04-22',
      close_price: 76100.0,
    },
    {
      date: '2024-04-15',
      close_price: 82200.0,
    },
    {
      date: '2024-04-05',
      close_price: 84500.0,
    },
    {
      date: '2024-03-29',
      close_price: 82400.0,
    },
    {
      date: '2024-03-22',
      close_price: 78900.0,
    },
    {
      date: '2024-03-15',
      close_price: 72300.0,
    },
    {
      date: '2024-03-08',
      close_price: 73300.0,
    },
    {
      date: '2024-02-29',
      close_price: 73400.0,
    },
    {
      date: '2024-02-22',
      close_price: 73100.0,
    },
    {
      date: '2024-02-15',
      close_price: 73000.0,
    },
    {
      date: '2024-02-06',
      close_price: 74400.0,
    },
    {
      date: '2024-01-30',
      close_price: 74300.0,
    },
    {
      date: '2024-01-23',
      close_price: 75200.0,
    },
    {
      date: '2024-01-16',
      close_price: 72600.0,
    },
    {
      date: '2024-01-09',
      close_price: 74700.0,
    },
    {
      date: '2024-01-02',
      close_price: 79600.0,
    },
    {
      date: '2023-12-21',
      close_price: 75000.0,
    },
    {
      date: '2023-12-14',
      close_price: 73100.0,
    },
    {
      date: '2023-12-07',
      close_price: 71500.0,
    },
    {
      date: '2023-11-30',
      close_price: 72800.0,
    },
    {
      date: '2023-11-23',
      close_price: 72400.0,
    },
    {
      date: '2023-11-16',
      close_price: 72800.0,
    },
  ];

  return (
    <ApexChart
      type="line"
      series={[
        {
          name: 'Price',
          data: data?.map((price) => Number(price.close_price)) as number[],
        },
      ]}
      options={{
        theme: {
          mode: 'dark',
        },
        chart: {
          height: 500,
          width: 500,
          toolbar: {
            tools: {},
          },
          background: 'transparent',
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        colors: ['#1AA76E'],
        grid: {
          show: false,
        },
        plotOptions: {
          candlestick: {
            wick: {
              useFillColor: true,
            },
          },
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              colors: 'rgba(0, 0, 0, 0.5)',
            },
            // datetimeFormatter: {
            //   month: "mmm 'yy",
            // },
          },
          type: 'datetime',
          categories: data?.map((date) => date.date),
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: 'rgba(0, 0, 0, 0.5)',
            },
            // datetimeFormatter: {
            //   month: "mmm 'yy",
            // },
          },
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: true,
          },
        },
        tooltip: {
          y: {
            formatter: (v) => `$ ${v.toFixed(2)}`,
          },
        },
      }}
    />
  );
};

export default StockChart;
