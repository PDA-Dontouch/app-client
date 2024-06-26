import { authInstance, socketInstance, stockInstance } from './api';
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
  StocksLikeTypes,
  PostCombiData,
} from '../types/stocks_product';

import {
  KrChartPost,
  UsChartPost,
  UsYearChartPost,
} from '../types/individual_stock';

import {
  UsStockSocketType,
  HoldingUsStockSocketResponseType,
  HoldingKrStockSocketResponseType,
  CombinationPurchasedType,
} from '../types/stocks_product';
import axios, { AxiosResponse } from 'axios';

interface RequestBodyType {
  searchWord: string | null;
  userId: number;
  dividendMonth: number | null;
  page: number;
  size: number;
}

interface RequestStockDetail {
  exchange: string;
  stockId: number;
}

interface RequestCombiCreate {
  userId: number;
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

export const stocksChartKr = async (data: KrChartPost) => {
  try {
    const response = await socketInstance.post('/graph/graphDataKr', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksChartUs = async (data: UsChartPost) => {
  try {
    const response = await socketInstance.post('/graph/graphDataUs', data);
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
      params: { token: data.token }, // 에러
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

export const combinationDistribute = async (
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

export const getStocksLike = async (userId: number) => {
  try {
    const response = await authInstance.get(`/like/stocks?userId=${userId}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksLike = async (data: StocksLikeTypes) => {
  try {
    const response = await authInstance.post('/like/stocks', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDisLike = async (data: StocksLikeTypes) => {
  try {
    const response = await authInstance.delete('/like/stocks', {
      data: data,
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getKRStockPrice = async ({
  stockList,
}: {
  stockList: string[];
}): Promise<string[]> => {
  try {
    const response = await axios
      .post(`/api/trading/myPage/krStock`, { stockList })
      .then((data: AxiosResponse<HoldingKrStockSocketResponseType[]>) => {
        return data.data.map((items) => {
          return items.price;
        });
      });

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUSStockPrice = async ({
  stockList,
}: {
  stockList: UsStockSocketType[];
}): Promise<number[]> => {
  try {
    const response = await axios
      .post(`/api/trading/myPage/usStock`, { stockList })
      .then((data: AxiosResponse<HoldingUsStockSocketResponseType[]>) => {
        return data.data.map((items) => {
          return items.price;
        });
      });

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCombinationPurchased = async ({
  userId,
  page,
  size,
}): PromiseAxiosRes<CombinationPurchasedType[]> => {
  try {
    const response = await stockInstance.get(`/combination/purchased`, {
      params: {
        userId: userId,
        page: page,
        size: size,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const purchaseCombination = async (data: PostCombiData) => {
  try {
    const response = await socketInstance.post(
      `/pendingOrder/buyCombinationStock`,
      data,
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSTT = async ({
  base64Sound,
  userId,
}: {
  base64Sound: string;
  userId: number;
}): Promise<AxiosResponse<string>> => {
  try {
    const response = await axios.post(`/api/trading/myPage/stt`, {
      base64Sound,
      userId,
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
