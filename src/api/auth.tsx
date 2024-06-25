import axios from 'axios';
import {
  PageSizeType,
  PromiseAxiosRes,
  WithToken,
  WithUserId,
} from '../types/response_product';
import {
  DepositWithDrawalResultType,
  DepositWithDrawalType,
  LoginedUser,
  InvestmentType,
  UserDetail,
} from '../types/user_product';
import { authInstance } from './api';

export const tryLogin = async (
  type: string,
  code: string,
): PromiseAxiosRes<LoginedUser> => {
  try {
    const response = await authInstance.get(`/oauth/login/${type}?code=${code}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUser = async (email: string):PromiseAxiosRes<UserDetail> => {
  try {
    const response = await authInstance.get(`/${email}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const depositWithdrawal = async ({
  userId,
  price,
  token,
}: DepositWithDrawalType &
  WithToken): PromiseAxiosRes<DepositWithDrawalResultType> => {
  try {
    const response = await authInstance.post(
      `/account/cal`,
      { userId, price },
      { params: { token: token } },
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserAccountAmount = async ({
  userId,
  token,
}: WithUserId & WithToken): PromiseAxiosRes<{
  cash: number;
}> => {
  try {
    const response = await authInstance.get(`bank/${userId}`, {
      params: {
        token: token,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateInvestmentType = async ({
  token,
  userId,
  totalScore,
}: WithToken & WithUserId & { userId: number, totalScore: number }): PromiseAxiosRes<UserDetail> => {
  try {
    const response = await authInstance.post(
      '/type',
      {
        userId: userId,
        totalScore: totalScore,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const saveAsset = async ({
  userId,
  cash,
  token,
}: WithToken &
  WithUserId & { cash: number }): PromiseAxiosRes<string> => {
  try {
    const response = await authInstance.post(
      '/bank/new',
      {
        userId: userId,
        cash: cash,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const isValidToken = async ({
  token,
}: WithToken & { cash: number }): PromiseAxiosRes<boolean> => {
  try {
    const response = await authInstance.get(
      '/valid',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
