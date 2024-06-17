export type CalendarStockPlanType = {
  id: number;
  dividendDate: Date;
  isFixed: boolean;
  symbol: string;
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
