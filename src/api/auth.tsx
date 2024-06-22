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
  code: string,
): PromiseAxiosRes<LoginedUser> => {
  try {
    const response = await authInstance.get(`api/oauth/kakao/callback?code=${code}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUser = async (userId: string) => {
  try {
    const response = await authInstance.get(`/${userId}`);
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
  userId,
  token,
  totalScore,
}: WithToken &
  WithUserId & { totalScore: number }): PromiseAxiosRes<UserDetail> => {
  try {
    const response = await authInstance.post(
      '/type',
      {
        userId: userId,
        totalScore: totalScore,
      },
      {
        params: {
          token: token,
        },
      },
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
