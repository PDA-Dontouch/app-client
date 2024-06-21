export interface EnergyList {
  energyId: string;
  title: string;
  titleImageUrl: string;
  earningRate: number;
  investment_period: number;
  fundingAmount: number;
  sumOfInvestmentAndReservation: number;
}

export type CalendarP2PType = {
  id: string;
  title: string;
  titleImageUrl: string;
  dividendPrice: number;
  paymentDate: Date;
};

export type energyDetail = {
  energyId: string;
  title: string;
  titleImageUrl: string;
  earningRate: number;
  investmentPeriod: number;
  fundingAmount: number;
  sumOfInvestmentAndReservation: number;
  borrowerInfo1Title: string;
  borrowerInfo1Content: string;
  borrowerInfo2Title: string;
  borrowerInfo2Content: string;
  borrowerInfo3Title: string;
  borrowerInfo3Content: string;
  startPeriod: string;
  endPeriod: string;
  fundUsage: string;
  repaymentMethod: string;
  earlyRepaymentFee: string;
  grossReturnRate: number;
  netReturnRate: number;
  expectedTotalReturnRate: number;
  projectName: string;
  projectSite: string;
  facilityCapacity: string;
  contractor: string;
  permit1: string;
  permit2: string;
  permit3: string;
  permit4: string;
  projectOverviewImageLink1: string;
  projectOverviewImageLink2: string;
  projectOverviewImageLink3: string;
  projectOverviewImageLink4: string;
  repaymentSource1: string;
  repaymentSource2: string;
  collateralManagement1: string;
  collateralManagement2: string;
  collateralManagement3: string;
  creditEnhancement1: string;
  creditEnhancement2: string;
  creditEnhancement3: string;
  creditEnhancement4: string;
  creditEnhancement5: string;
  businessDescription: string;
  creditRating: string;
  financialStatus: string;
  sameBorrowerLoanStatus: string;
  collateralValue: string;
  seniorDebt: string;
  collateralList1: string;
  collateralList2: string;
  collateralList3: string;
  collateralList4: string;
  collateralList5: string;
  collateralRecoveryValue1: string;
  collateralRecoveryValue2: string;
  collateralRecoveryValue3: string;
  collateralRecoveryValue4: string;
};

export const initialEnergyDetail = {
  energyId: '',
  title: '',
  titleImageUrl: '',
  earningRate: 0,
  investmentPeriod: 0,
  fundingAmount: 0,
  sumOfInvestmentAndReservation: 0,
  borrowerInfo1Title: '',
  borrowerInfo1Content: '',
  borrowerInfo2Title: '',
  borrowerInfo2Content: '',
  borrowerInfo3Title: '',
  borrowerInfo3Content: '',
  startPeriod: '',
  endPeriod: '',
  fundUsage: '',
  repaymentMethod: '',
  earlyRepaymentFee: '',
  grossReturnRate: 0,
  netReturnRate: 0,
  expectedTotalReturnRate: 0,
  projectName: '',
  projectSite: '',
  facilityCapacity: '',
  contractor: '',
  permit1: '',
  permit2: '',
  permit3: '',
  permit4: '',
  projectOverviewImageLink1: '',
  projectOverviewImageLink2: '',
  projectOverviewImageLink3: '',
  projectOverviewImageLink4: '',
  repaymentSource1: '',
  repaymentSource2: '',
  collateralManagement1: '',
  collateralManagement2: '',
  collateralManagement3: '',
  creditEnhancement1: '',
  creditEnhancement2: '',
  creditEnhancement3: '',
  creditEnhancement4: '',
  creditEnhancement5: '',
  businessDescription: '',
  creditRating: '',
  financialStatus: '',
  sameBorrowerLoanStatus: '',
  collateralValue: '',
  seniorDebt: '',
  collateralList1: '',
  collateralList2: '',
  collateralList3: '',
  collateralList4: '',
  collateralList5: '',
  collateralRecoveryValue1: '',
  collateralRecoveryValue2: '',
  collateralRecoveryValue3: '',
  collateralRecoveryValue4: '',
};
export type MyP2PProductType = {
  id: number;
  userId: number;
  titleImageUrl: string;
  title: string;
  earningRate: number;
  investmentPeriod: number;
  inputCash: number;
  startPeriod: Date;
  createdAt: Date;
};
export type WithEnergyId = {
  energyId: string;
};
