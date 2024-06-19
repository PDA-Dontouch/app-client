import { stockInstance } from './api';
import {
  AxiosRes,
  PromiseAxiosRes,
  WithToken,
} from '../types/response_product';
import {
  CalendarStockPlanType,
  StockDataResultType,
  StockDetailType,
  StockCombiType,
  InsertCombiStock,
} from '../types/stocks_product';
import axios, { AxiosResponse } from 'axios';
import { ChartPost } from '../types/individual_stock';

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

type ExchangeRateType = {
  result: number;
  cur_unit: string;
  ttb: string;
  tts: string;
  deal_bas_r: string;
  bkpr: string;
  yy_efee_r: string;
  ten_dd_efee_r: string;
  kftc_bkpr: string;
  kftc_deal_bas_r: string;
  cur_nm: string;
};

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
    const response = await stockInstance.post('/like', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDisLike = async (data: StockDataResultType) => {
  const baseUrl = `/like`;
  try {
    const response = await stockInstance.delete('/like', {
      data: data,
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksChart = async (data: ChartPost) => {
  try {
    const response = await stockInstance.post('/chart', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDetail = async (exchange: string, stockId: number) => {
  try {
    const response = await stockInstance.post('/detail', {
      exchange: exchange,
      stockId: stockId,
    });
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

export const getExchangeRate = async (): Promise<
  AxiosResponse<ExchangeRateType[]>
> => {
  try {
    const response = await axios.get('/api/exchangeRate', {
      params: {
        authkey: 'kKl92pWdjK2xEOALSjzxo7I3xdawbAlt',
        searchdate: '20240617',
        data: 'AP01',
      },
    });
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
