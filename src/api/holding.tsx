import { MyP2PProductType } from '../components/Main/MyP2PProduct';
import {
  PromiseAxiosRes,
  WithToken,
  WithUserId,
} from '../types/response_product';
import { holdingInstance } from './api';

export const getUserEstateProduct = async ({
  userId,
  token,
}: WithUserId & WithToken): PromiseAxiosRes<MyP2PProductType[]> => {
  try {
    const response = holdingInstance.get(`allEstate/${userId}`, {
      params: {
        token: token,
      },
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};
