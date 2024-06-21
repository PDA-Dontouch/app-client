export type investmentType = 1 | 2 | 3 | 4 | 5;

export type UserDetail = {
  id: number;
  email: string;
  sns_type: number;
  nickname: string;
  investmentType: investmentType;
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
  nickname: string;
  email: string;
  snsType: number;
};

export type AccountLogType = {
  userId: number;
  inOutCash: number;
  inOutType: number;
  inOutTitle: string;
  inOutTime: Date;
};

export const initialUserDetail = {
  id: 1001,
  email: 'gkstmf616@naver.com',
  sns_type: 1,
  birthday: new Date(),
  nickname: '이한슬',
  investmentType: 1 as investmentType,
  safeScore: 40,
  dividendScore: 35,
  growthScore: 25,
};
