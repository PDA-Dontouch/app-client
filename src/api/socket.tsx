import { postOrderData } from '../types/socket';
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
