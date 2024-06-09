import { energyTypes } from "../store/reducers/energy/energy";
import { energyInstance } from "./api";

export const energyDatas = async () => {
  const baseUrl = `/`;
  try {
    const response = await energyInstance.get(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyData = async (energy_id: number) => {
  const baseUrl = `/${energy_id}`;
  try {
    const response = await energyInstance.get(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyLike = async (data: energyTypes) => {
  const baseUrl = `/like`;
  try {
    const response = await energyInstance.post(baseUrl, data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const energyDisLike = async (data: energyTypes) => {
  const baseUrl = `/like`;
  try {
    const response = await energyInstance.delete(baseUrl, { data: data });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};