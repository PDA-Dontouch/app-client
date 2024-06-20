import { EstatesTypes } from '../store/reducers/estates/estates';
import { EstateBuyType } from '../types/estates_product';
import { estatesInstance } from './api';

export const estate_url = `/api/estates`;

export const estatesDatas = async () => {
  try {
    const response = await estatesInstance.get(estate_url);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesData = async (estates_id: number) => {
  try {
    const response = await estatesInstance.get(estate_url + `/${estates_id}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesLike = async (data: EstatesTypes) => {
  try {
    const response = await estatesInstance.post(estate_url + '/like', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesDisLike = async (data: EstatesTypes) => {
  try {
    const response = await estatesInstance.delete(estate_url + '/like', {
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
    const response = await estatesInstance.post(estate_url + '/buy', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesSell = async (data: EstateBuyType) => {
  try {
    const response = await estatesInstance.post(estate_url + '/sell', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
