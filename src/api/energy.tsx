import { energyTypes } from '../store/reducers/energy/energy';
import { EnergyBuyType } from '../types/energy_product';
import { authInstance, energyInstance } from './api';
import { EnergyList } from '../types/energy_product';
import {
  PromiseAxiosRes,
  WithToken,
  WithUserId,
} from '../types/response_product';

export const energy_url = `/api/energy`;

export const energyDatas = async () => {
  try {
    const response = await energyInstance.get('');
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyData = async (energy_id: string) => {
  try {
    const response = await energyInstance.get(`/${energy_id}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getEnergysLike = async (userId: number) => {
  try {
    const response = await authInstance.get(`/like/energy?userId=${userId}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyLike = async (data: energyTypes) => {
  try {
    const response = await authInstance.post('/like/energy', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyDisLike = async (data: energyTypes) => {
  try {
    const response = await authInstance.delete('/like/energy', {
      data: data,
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyBuy = async (data: EnergyBuyType) => {
  try {
    const response = await energyInstance.post('/buy', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energySell = async (data: EnergyBuyType) => {
  try {
    const response = await energyInstance.post('/sell', data);
    return response;
  } catch (err) {
    return err;
  }
};

export const getEnergyLike = async ({
  userId,
  token,
}: WithToken & WithUserId): PromiseAxiosRes<EnergyList[]> => {
  try {
    const response = await energyInstance.get('/like', {
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
