import { energyTypes } from '../store/reducers/energy/energy';
import { WithToken } from '../types/response_product';
import { EnergyBuyType } from '../types/energy_product';
import { authInstance, energyInstance } from './api';

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

export const getHoldingAllEnergy = async (data: string & WithToken) => {
  try {
    return;
  } catch (err) {
    console.error(err);
    return err;
  }
};
