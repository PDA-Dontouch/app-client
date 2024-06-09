import { estatesTypes } from "../store/reducers/estates/estates";
import { estatesInstance } from "./api";

export const estatesDatas = async () => {
  const baseUrl = `/`;
  try {
    const response = await estatesInstance.get(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesData = async (estates_id: number) => {
  const baseUrl = `/${estates_id}`;
  try {
    const response = await estatesInstance.get(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesLike = async (data: estatesTypes) => {
  const baseUrl = `/like`;
  try {
    const response = await estatesInstance.post(baseUrl, data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const estatesDisLike = async (data: estatesTypes) => {
  const baseUrl = `/like`;
  try {
    const response = await estatesInstance.delete(baseUrl, { data: data });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};