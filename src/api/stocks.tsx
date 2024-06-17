import { stocksTypes } from '../store/reducers/stocks/stocks';
import { ChartPost } from '../types/individual_stock';
import { stockInstance } from './api';

export const stocks_url = `/api/stocks`;

export const stocksDatas = async () => {
  try {
    const response = await stockInstance.get(stocks_url);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksData = async (stocks_id: string) => {
  try {
    const response = await stockInstance.get(stocks_url + `/${stocks_id}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksLike = async (data: stocksTypes) => {
  try {
    const response = await stockInstance.post(stocks_url + '/like', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDisLike = async (data: stocksTypes) => {
  try {
    const response = await stockInstance.delete(stocks_url + '/like', {
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
    const response = await stockInstance.post(stocks_url + '/chart', data);
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
