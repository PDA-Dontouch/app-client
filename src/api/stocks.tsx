import { stocksTypes } from "../store/reducers/stocks/stocks";
import { stockInstance } from "./api";

interface RequestBodyType {
  userInvestmentType: number;
  safeScore: number;
  dividendScore: number;
  growthScore: number;
  dividendMonth: number | null; // nullable 필드
  page: number;
  size: number;
}
export const stocksDatas = async (requestData:RequestBodyType) => {
  try {
    const response = await stockInstance.post('', requestData);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksData = async (stocks_id: number) => {
  try {
    const response = await stockInstance.get(`/${stocks_id}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksLike = async (data: stocksTypes) => {
  try {
    const response = await stockInstance.post(`/like`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const stocksDisLike = async (data: stocksTypes) => {
  try {
    const response = await stockInstance.delete(`/like`, { data: data });
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};