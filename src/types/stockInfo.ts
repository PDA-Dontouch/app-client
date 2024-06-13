export type stockDetail = {
    id: number,
    stockId: number,
    symbol: string,
    marketCap: number,
    peRatioTtm: number,
    tenYShareHoldersEquityGrowthPerShare: number,
    fiveYShareHoldersEquityGrowthPerShare: number,
    threeYShareHoldersEquityGrowthPerShare: number,
    tenYDividendPerShareGrowthPerShare: number,
    fiveYDividendPerShareGrowthPerShare: number,
    threeYDividendPerShareGrowthPerShare: number,
};

export const initialDetail = {
    id: 0,
    stockId: 0,
    symbol: '',
    marketCap: 0,
    peRatioTtm: 0,
    tenYShareHoldersEquityGrowthPerShare: 0,
    fiveYShareHoldersEquityGrowthPerShare: 0,
    threeYShareHoldersEquityGrowthPerShare: 0,
    tenYDividendPerShareGrowthPerShare: 0,
    fiveYDividendPerShareGrowthPerShare: 0,
    threeYDividendPerShareGrowthPerShare: 0
  };