export interface EstatesList {
  id: number;
  earningRate: number;
  length: number;
  loanAmountBaseLtv: number;
  sumOfInvestmentAndReservation: number;
  title: string;
  titleMainImageUrl: string;
  totalAmountInvestments: number;
  eightCreditGrade: string;
  currentInvest: number;
}

export type EstatesDetail = {
  id: number;
  estateId: number;
  latitude: number;
  longitude: number;
  appraisedValue: number;
  priorityAmount: number;
  etcAmount: number;
  leftMoney: number;
  bidWinningRate: number;
  mortgageSetupRate: number;
  expectedRecoverAmount: number;
  priorityMaximumPledgeAmount: number;
  maxBondAmountBaseLtv: number;
  shareRatio: number;
  loanType: string;
  finalAmountWon: number;
  finalLength: number;
  workPeriodYears: number;
  judgeCompanySize: string;
  userSex: number;
  method: string;
  isAffirmedToPurchase: boolean;
  principalReturnAmountWon: number;
  interestReturnAmountWon: number;
  workStartDate: string;
  repaymentDay: number;
  isRenewalLoan: boolean;
  isRepaymentDayFollowingExecutionDay: boolean;
  comment: string;
  startDatetime: string;
  state: string;
  amount: number;
  investmentCount: number;
  photos: string;
  reason: string;
  progress: number;
  structure: string;
  eightCreditGrade: string;
  sellingPointsIconImage: string;
  sellingPointsTitle: string;
  sellingPointsDescription: string;
  sellingPointsIconImage2: string;
  sellingPointsTitle2: string;
  sellingPointsDescription2: string;
  expertName: string;
  expertRole: string;
  expertContent: string;
  hasOverdueLast1Year: boolean;
  complianceNumber: string;
  dealType: string;
  category: string;
};

export const initialEstatesDetail: EstatesDetail = {
  id: 0,
  estateId: 0,
  latitude: 0,
  longitude: 0,
  appraisedValue: 0,
  priorityAmount: 0,
  etcAmount: 0,
  leftMoney: 0,
  bidWinningRate: 0,
  mortgageSetupRate: 0,
  expectedRecoverAmount: 0,
  priorityMaximumPledgeAmount: 0,
  maxBondAmountBaseLtv: 0,
  shareRatio: 0,
  loanType: '',
  finalAmountWon: 0,
  finalLength: 0,
  workPeriodYears: 0,
  judgeCompanySize: '',
  userSex: 0,
  method: '',
  isAffirmedToPurchase: false,
  principalReturnAmountWon: 0,
  interestReturnAmountWon: 0,
  workStartDate: '',
  repaymentDay: 0,
  isRenewalLoan: false,
  isRepaymentDayFollowingExecutionDay: true,
  comment: '',
  startDatetime: '',
  state: '',
  amount: 0,
  investmentCount: 0,
  photos: '',
  reason: '',
  progress: 0,
  structure: '',
  eightCreditGrade: '',
  sellingPointsIconImage: '',
  sellingPointsTitle: '',
  sellingPointsDescription: '',
  sellingPointsIconImage2: '',
  sellingPointsTitle2: '',
  sellingPointsDescription2: '',
  expertName: '',
  expertRole: '',
  expertContent: '',
  hasOverdueLast1Year: false,
  complianceNumber: '',
  dealType: '',
  category: '',
};

export const clickEstates: EstatesList = {
  id: 0,
  earningRate: 0,
  length: 0,
  loanAmountBaseLtv: 0,
  sumOfInvestmentAndReservation: 0,
  title: '',
  titleMainImageUrl: '',
  totalAmountInvestments: 0,
  eightCreditGrade: '',
  currentInvest: 0,
};

export type EstateBuyType = {
  userId: number;
  estateFundId: number;
  inputCash: number;
  estateName: string;
  estateEarningRate: number;
};

export type HoldingEstatesType = {
  createdAt: null;
  earningRate: number;
  estateId: number;
  id: number;
  inputCash: number;
  investmentPeriod: number;
  startPeriod: string;
  title: string;
  titleImageUrl: string;
  userId: number;
};
