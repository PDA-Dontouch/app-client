export type KrChartPost = {
  timeFormat: string;
  stockCode: string;
  endDate: string;
};

export type UsChartPost = {
  timeFormat: number;
  stockCode: string;
  endDate: string;
  marketType: string;
};

export type UsYearChartPost = {
  exchange: string;
  stockId: number;
};

export type GetDetail = {
  basic_info: {
    id: number;
    symbol: string;
    name: string;
    type: string;
    exchange: string;
    dividendMonth: number;
    dividendYieldTtm: number;
    personalizedScore: null;
  };
  detail_info: {
    id: number;
    stockId: number;
    symbol: string;
    marketCap: number;
    peRatioTtm: number;
    tenYShareHoldersEquityGrowthPerShare: number;
    fiveYShareHoldersEquityGrowthPerShare: number;
    threeYShareHoldersEquityGrowthPerShare: number;
    tenYDividendPerShareGrowthPerShare: number;
    fiveYDividendPerShareGrowthPerShare: null;
    threeYDividendPerShareGrowthPerShare: number;
  };
};

export type ChartData = {
  code: string;
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
};
