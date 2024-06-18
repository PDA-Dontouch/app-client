import { PromiseAxiosRes, WithToken } from '../types/response_product';
import { DepositWithDrawalType } from '../types/user_product';
import { authInstance } from './api';

export const login = async (sns: string) => {
  const baseUrl = `/login/${sns}`;

  try {
    const response = await authInstance.post(baseUrl);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const depositWithdrawal = async ({
  userId,
  price,
  token,
}: DepositWithDrawalType &
  WithToken): PromiseAxiosRes<DepositWithDrawalType> => {
  try {
    const response = await authInstance.post(
      `/bank/cal`,
      { userId, price },
      { params: { token: token } },
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
