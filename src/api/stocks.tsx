import { stocksTypes } from "../store/reducers/stocks/stocks";
import { stockInstance } from "./api";

export const stocksDatas = async () => {
  const baseUrl = `/`;
  try {
    const response = await stockInstance.get(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksData = async (stocks_id: string) => {
  const baseUrl = `/${stocks_id}`;
  try {
    const response = await stockInstance.get(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksLike = async (data: stocksTypes) => {
  const baseUrl = `/like`;
  try {
    const response = await stockInstance.post(baseUrl, data);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDisLike = async (data: stocksTypes) => {
  const baseUrl = `/like`;
  try {
    const response = await stockInstance.delete(baseUrl, { data: data });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};