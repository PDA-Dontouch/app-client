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
} from '../types/user_product';
import { authInstance } from './api';

export const tryLogin = async (
  sns: string,
  code: string,
): PromiseAxiosRes<LoginedUser> => {
  try {
    const response = await authInstance.get(`oauth/login/${sns}?code=${code}`);
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
