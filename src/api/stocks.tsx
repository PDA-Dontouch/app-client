import { stocksTypes } from '../store/reducers/stocks/stocks';
import { stockInstance } from './api';
import {
  AxiosRes,
  PromiseAxiosRes,
  WithToken,
} from '../types/response_product';
import {
  CalendarStockPlanType,
  StockDataResultType,
} from '../types/stocks_product';
import axios, { AxiosResponse } from 'axios';
import { ChartPost } from '../types/individual_stock';

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

export const stocksData = async (stocks_id: string) => {
  try {
    const response = await stockInstance.get(`/${stocks_id}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksLike = async (data: stocksTypes) => {
  try {
    const response = await stockInstance.post('/like', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDisLike = async (data: stocksTypes) => {
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
