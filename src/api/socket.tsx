import { postMarketData, postOrderData } from '../types/socket';
import { socketInstance } from './api';

export const socket_url = `/api`;

export const buyLimitPrice = async (data: postOrderData) => {
  try {
    const response = await socketInstance.post(
      socket_url + '/pendingOrder/buyPendingOrder',
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
      socket_url + '/pendingOrder/buyMarketPlaceOrder',
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
      socket_url + '/pendingOrder/sellPendingOrder',
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
      socket_url + '/pendingOrder/sellMarketPlaceOrder',
      data,
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
