export type CalendarStockPlanType = {
  id: number;
  dividendDate: Date;
  isFixed: boolean;
  symbol: string;
  name: string;
  dividend: number;
  paymentDate: Date;
};

export type StockDataResultType = {
  id: number;
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  dividendMonth: number;
  dividendYieldTtm: number;
  personalizedScore: number;
};

export type BasicInfoType = {
  id: number;
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  dividendMonth: number;
  dividendYieldTtm: number;
};

export type DetailInfoType = {
  id: number;
  stockId: number;
  symbol: string;
  marketCap: number;
  peRatioTtm: number;
  tenYShareHoldersEquityGrowthPerShare: number;
  fiveYShareHoldersEquityGrowthPerShare: number;
  threeYShareHoldersEquityGrowthPerShare: number;
  tenYDividendPerShareGrowthPerShare: number;
  fiveYDividendPerShareGrowthPerShare: number;
  threeYDividendPerShareGrowthPerShare: number;
};

export type StockDetailType = {
  basicInfo: BasicInfoType;
  detailInfo: DetailInfoType;
};

export type InsertCombiStock = {
  stockId: number,
  name: string,
  symbol: string,
  price: number,
  quantity: number,
  dividend: number
}


export type CombiStockReq = {
  stockId: number,
  exchange: string
}

export type NewCombiReqType ={
  combination1:CombiStockReq[];
  combination2:CombiStockReq[];
  combination3:CombiStockReq[];
}


export type RequestCombiDistribute = {
  combination1:CombiStockReq[];
  combination2:CombiStockReq[];
  combination3:CombiStockReq[];
  investmentAmount: number
}

export type StockCombiType = {
  combination1:{
    stocks:InsertCombiStock[],
    totalDividend: number,
  },
  combination2:{
    stocks:InsertCombiStock[],
    totalDividend: number,
  },
  combination3:{
    stocks:InsertCombiStock[],
    totalDividend: number,
  },
};

export const initialStockDetail = {
  basicInfo: {
    id: 1,
    symbol: '',
    name: '',
    type: '',
    exchange: '',
    dividendMonth: 0,
    dividendYieldTtm: 0,
  },
  detailInfo: {
    id: 2,
    stockId: 1,
    symbol: '',
    marketCap: 0,
    peRatioTtm: 0,
    tenYShareHoldersEquityGrowthPerShare: 0,
    fiveYShareHoldersEquityGrowthPerShare: 0,
    threeYShareHoldersEquityGrowthPerShare: 0,
    tenYDividendPerShareGrowthPerShare: 0,
    fiveYDividendPerShareGrowthPerShare: 0,
    threeYDividendPerShareGrowthPerShare: 0,
  },
};
