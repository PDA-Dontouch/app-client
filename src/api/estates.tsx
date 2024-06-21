import { EstatesTypes } from '../store/reducers/estates/estates';
import { EstateBuyType } from '../types/estates_product';
import { estatesInstance } from './api';

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

export const estatesLike = async (data: EstatesTypes) => {
  try {
    const response = await estatesInstance.post('/like', data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesDisLike = async (data: EstatesTypes) => {
  try {
    const response = await estatesInstance.delete('/like', {
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
