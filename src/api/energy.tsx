import { energyTypes } from '../store/reducers/energy/energy';
import { EnergyBuyType } from '../types/estates_product';
import { energyInstance } from './api';

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

export const energyLike = async (data: energyTypes) => {
  try {
    const response = await energyInstance.post('/like', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyDisLike = async (data: energyTypes) => {
  try {
    const response = await energyInstance.delete('/like', {
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
    console.error(err);
    return err;
  }
};
