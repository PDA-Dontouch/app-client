import { stocksTypes } from '../store/reducers/stocks/stocks';
import { stockInstance } from './api';
import { PromiseAxiosRes, WithToken } from '../types/response_product';
import {
  CalendarStockPlanType,
  ExchangeRateType,
  StockDataResultType,
} from '../types/stocks_product';

interface RequestBodyType {
  userInvestmentType: number;
  safeScore: number;
  dividendScore: number;
  growthScore: number;
  dividendMonth: number | null;
  page: number;
  size: number;
}

type CalendarStockPlansRequestBodyType = {
  startDate: Date;
  endDate: Date;
} & WithToken;

export const stocksDatas = async (
  requestData: RequestBodyType,
): PromiseAxiosRes<StockDataResultType[]> => {
  try {
    const response = await stockInstance.post('', requestData);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const stocksData = async (stocks_id: string) => {
  const baseUrl = `/${stocks_id}`;
  try {
    const response = await stockInstance.get(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksLike = async (data: stocksTypes) => {
  const baseUrl = `/like`;
  try {
    const response = await stockInstance.post(baseUrl, data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDisLike = async (data: stocksTypes) => {
  const baseUrl = `/like`;
  try {
    const response = await stockInstance.delete(baseUrl, { data: data });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const calendarStockPlans = async (
  data: CalendarStockPlansRequestBodyType,
): PromiseAxiosRes<CalendarStockPlanType[]> => {
  try {
    const response = await stockInstance.post('/calendar', data);
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getExchangeRate = async (): PromiseAxiosRes<ExchangeRateType> => {
  try {
    const response = await stockInstance.get('/exchange/usd');
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
