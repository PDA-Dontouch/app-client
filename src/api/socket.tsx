import {
  postMarketData,
  postMarketDataUs,
  postOrderData,
} from '../types/socket';
import { socketInstance } from './api';

export const buyLimitPrice = async (data: postOrderData) => {
  try {
    const response = await socketInstance.post(
      '/pendingOrder/buyPendingOrder',
      data,
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const buyMarketPrice = async (data: postMarketData) => {
  try {
    const response = await socketInstance.post(
      '/pendingOrder/buyMarketPlaceOrder',
      data,
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const buyMarketPriceUs = async (data: postMarketDataUs) => {
  try {
    const response = await socketInstance.post(
      '/pendingOrder/buyMarketPlaceOrderUs',
      data,
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const sellLimitPrice = async (data: postOrderData) => {
  try {
    const response = await socketInstance.post(
      '/pendingOrder/sellPendingOrder',
      data,
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const sellMarketPrice = async (data: postMarketData) => {
  try {
    const response = await socketInstance.post(
      '/pendingOrder/sellMarketPlaceOrder',
      data,
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const sellMarketPriceUs = async (data: postMarketDataUs) => {
  try {
    const response = await socketInstance.post(
      '/pendingOrder/sellMarketPlaceOrderUs',
      data,
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
