import { stockInstance } from './api';
import { PromiseAxiosRes, WithToken } from '../types/response_product';
import {
  CalendarStockPlanType,
  ExchangeRateType,
  StockDataResultType,
  StockDetailType,
  StockCombiType,
  InsertCombiStock,
} from '../types/stocks_product';

interface RequestBodyType {
  searchWord: string | null;
  safeScore: number;
  dividendScore: number;
  growthScore: number;
  dividendMonth: number | null;
  page: number;
  size: number;
}

interface RequestStockDetail {
  exchange: string;
  stockId: number;
}

interface RequestCombiCreate {
  safeScore: number;
  growthScore: number;
  dividendScore: number;
  investmentAmount: number;
}

interface ReorderCombiReq {
  exchange11: string | null;
  stockId11: number | null;
  exchange12: string | null;
  stockId12: number | null;

  exchange21: number | null;
  stockId21: number | null;
  exchange22: string | null;
  stockId22: number | null;

  exchange31: number | null;
  stockId31: number | null;
  exchange32: string | null;
  stockId32: number | null;

  investmentAmount: number;
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

export const stocksData = async (
  requestData: RequestStockDetail,
): PromiseAxiosRes<StockDetailType> => {
  const baseUrl = `/detail`;
  try {
    const response = await stockInstance.post(baseUrl, requestData);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const stocksLike = async (data: StockDataResultType) => {
  const baseUrl = `/like`;
  try {
    const response = await stockInstance.post(baseUrl, data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDisLike = async (data: StockDataResultType) => {
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

export const getStocksCombi = async (
  body: RequestCombiCreate,
): PromiseAxiosRes<StockCombiType> => {
  try {
    const response = await stockInstance.post('/combination/create', body);
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const combinationDistribute = async (
  body: ReorderCombiReq,
): PromiseAxiosRes<StockCombiType> => {
  try {
    const response = await stockInstance.post('/combination/distribute', body);
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
