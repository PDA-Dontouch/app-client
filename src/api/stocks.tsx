import { socketInstance, stockInstance } from './api';
import {
  PromiseAxiosRes,
  WithToken,
  WithUserId,
} from '../types/response_product';
import {
  CalendarStockPlanType,
  ExchangeRateType,
  StockDataResultType,
  StockDetailType,
  StockCombiType,
  GetHoldingStockType,
  RequestCombiDistribute,
} from '../types/stocks_product';
import axios, { AxiosResponse } from 'axios';
import {
  KrChartPost,
  UsChartPost,
  UsYearChartPost,
} from '../types/individual_stock';

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

type CalendarStockPlansRequestBodyType = {
  userId: number;
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

export const stocksChartKr = async (data: KrChartPost) => {
  try {
    const response = await socketInstance.post('/api/graph/graphDataKr', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksChartUs = async (data: UsChartPost) => {
  try {
    const response = await socketInstance.post('/api/graph/graphDataUs', data);
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
  data: CalendarStockPlansRequestBodyType & WithToken,
): PromiseAxiosRes<CalendarStockPlanType[]> => {
  try {
    const response = await stockInstance.post('/calendar', data, {
      params: { token: data.token },
    });
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

export const combinationDistribute = async(
  body: RequestCombiDistribute,
): PromiseAxiosRes<StockCombiType> => {
  try {
    const response = await stockInstance.post('/combination/distribute', body);
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getHoldingStocks = async ({
  userId,
  token,
}: WithToken & WithUserId): PromiseAxiosRes<GetHoldingStockType> => {
  try {
    const response = await stockInstance.get(`/holding`, {
      params: { token: token, userId: userId },
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLikeStocks = async ({
  userId,
  token,
}: WithToken & WithUserId): PromiseAxiosRes<{
  krLikeStocks: StockDataResultType[];
  usLikeStocks: StockDataResultType[];
}> => {
  try {
    const response = await stockInstance.get(`/like`, {
      params: {
        userId: userId,
        token: token,
      },
    });

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
