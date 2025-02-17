import { EstatesLikeTypes } from '../store/reducers/estates/estates';
import { EstateBuyType, EstatesList } from '../types/estates_product';
import {
  PromiseAxiosRes,
  WithToken,
  WithUserId,
} from '../types/response_product';
import { authInstance, estatesInstance } from './api';

export const estate_url = `/api/estates`;

export const estatesDatas = async () => {
  try {
    const response = await estatesInstance.get('');
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesData = async (estates_id: number) => {
  try {
    const response = await estatesInstance.get(`/${estates_id}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getEstatesLike = async (userId: number) => {
  try {
    const response = await authInstance.get(`/like/estate?userId=${userId}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesLike = async (data: EstatesLikeTypes) => {
  try {
    const response = await authInstance.post('/like/estate', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesDisLike = async (data: EstatesLikeTypes) => {
  try {
    const response = await authInstance.delete('/like/estate', {
      data: data,
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesBuy = async (data: EstateBuyType) => {
  try {
    const response = await estatesInstance.post('/buy', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesSell = async (data: EstateBuyType) => {
  try {
    const response = await estatesInstance.post('/sell', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getEstateLike = async ({
  userId,
  token,
}: WithToken & WithUserId): PromiseAxiosRes<EstatesList[]> => {
  try {
    const response = await estatesInstance.get('/like', {
      params: {
        token: token,
        userId: userId,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
