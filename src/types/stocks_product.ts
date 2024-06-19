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

export type ExchangeRateType = {
  currency: string;
  buying: number;
  selling: number;
};
