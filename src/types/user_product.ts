export type InvestmentType = 1 | 2 | 3 | 4 | 5;

export type UserDetail = {
  id: number;
  email: string;
  sns_type: number;
  nickname: string;
  investmentType: InvestmentType;
  safeScore: number;
  dividendScore: number;
  growthScore: number;
};

export type DepositWithDrawalType = {
  userId: number | null;
  price: number;
};

export type DepositWithDrawalResultType = {
  userId: number | null;
  cash: number;
};

export type LoginedUser = {
  user: UserDetail;
  token: string;
  isAuthenticated: boolean;
};

export type AccountLogType = {
  userId: number;
  inOutCash: number;
  inOutType: number;
  inOutTitle: string;
  inOutTime: Date;
};

export const initialUserDetail = {
  id: 0,
  email: '',
  sns_type: 0,
  nickname: '',
  investmentType: 1 as InvestmentType,
  safeScore: 0,
  dividendScore: 0,
  growthScore: 0,
};

export type StartDateEndDateType = {
  startDate: Date;
  endDate: Date;
};

export type PostStockType = {
  userId: number;
  stockCode: string;
  stockPrice: number;
  stockAmount: number;
};

export type getHoldingType = {
  userId: number;
  getPrice: boolean;
};
