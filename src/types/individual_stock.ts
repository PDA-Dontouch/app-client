export type ChartPost = {
  exchange: string;
  stockId: number;
  month: number;
  interval: number;
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
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
};
