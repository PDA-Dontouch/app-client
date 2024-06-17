export type investmentType = 1 | 2 | 3 | 4 | 5;

export interface UserDetail {
  id: number;
  email: string;
  sns_type: number;
  birthday: Date;
  nickname: string;
  investmentType: investmentType;
  safeScore: number;
  dividendScore: number;
  growthScore: number;
}

export type userAccount = {
  id: number;
  userId: number | null;
  cash: number;
};

export const initialUserDetail = {
  id: 0,
  email: '',
  sns_type: 0,
  birthday: new Date(),
  nickname: '',
  investmentType: 1 as investmentType,
  safeScore: 0,
  dividendScore: 0,
  growthScore: 0,
};
