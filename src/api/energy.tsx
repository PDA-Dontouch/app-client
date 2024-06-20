import { energyTypes } from '../store/reducers/energy/energy';
import { WithToken } from '../types/response_product';
import { energyInstance } from './api';

export const energy_url = `/api/energy`;

export const energyDatas = async () => {
  try {
    const response = await energyInstance.get(energy_url);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyData = async (energy_id: string) => {
  try {
    const response = await energyInstance.get(energy_url + `/${energy_id}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyLike = async (data: energyTypes) => {
  try {
    const response = await energyInstance.post(energy_url + '/like', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyDisLike = async (data: energyTypes) => {
  try {
    const response = await energyInstance.delete(energy_url + '/like', {
      data: data,
    });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getHoldingAllEnergy = async (data: string & WithToken) => {
  try {
  } catch (err) {
    console.error(err);
    return err;
  }
};
