import {
  CalendarP2PType,
  MyP2PProductType,
  WithEnergyId,
} from '../types/energy_product';
import { WithEstateId } from '../types/estates_product';
import {
  PageSizeType,
  PromiseAxiosRes,
  WithToken,
  WithUserId,
} from '../types/response_product';
import { AccountLogType, StartDateEndDateType } from '../types/user_product';
import { holdingInstance } from './api';

export const getUserEstateProduct = async ({
  userId,
  token,
}: WithUserId & WithToken): PromiseAxiosRes<
  (MyP2PProductType & WithEstateId)[]
> => {
  try {
    const response = holdingInstance.get(`/allEstate/${userId}`, {
      params: {
        token: token,
      },
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getUserEnergyProduct = async ({
  userId,
  token,
}: WithUserId & WithToken): PromiseAxiosRes<
  (MyP2PProductType & WithEnergyId)[]
> => {
  try {
    const response = holdingInstance.get(`/allEnergy/${userId}`, {
      params: {
        token: token,
      },
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getUserTotalEstate = async ({
  userId,
  token,
}: WithUserId & WithToken): PromiseAxiosRes<number> => {
  try {
    const response = holdingInstance.get(`/estate/totalCash/${userId}`, {
      params: {
        token: token,
      },
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getUserTotalEnergy = async ({
  userId,
  token,
}: WithUserId & WithToken): PromiseAxiosRes<number> => {
  try {
    const response = holdingInstance.get(`/energy/totalCash/${userId}`, {
      params: {
        token: token,
      },
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const getUserAccountLog = async ({
  userId,
  token,
  page,
  size,
}: WithUserId & WithToken & PageSizeType): PromiseAxiosRes<
  AccountLogType[]
> => {
  try {
    const response = holdingInstance.get(`/account/${userId}`, {
      params: {
        token: token,
        page: page,
        size: size,
      },
    });
    return response;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
};

export const holdingEstates = async (userId: number) => {
  try {
    const response = await holdingInstance.get(`/allEstate/${userId}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const holdingEnergy = async (user_id: number) => {
  try {
    const response = await holdingInstance.get(`/allEnergy/${user_id}`);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getHoldingEnergyCalendar = async (
  data: StartDateEndDateType & WithToken,
): PromiseAxiosRes<CalendarP2PType[]> => {
  try {
    const response = await holdingInstance.post(
      `/energy/calendar`,
      {
        startDate: data.startDate,
        endDate: data.endDate,
      },

      {
        headers: {
          Authorization: 'test',
        },
        params: { token: data.token },
      },
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getHoldingEstateCalendar = async (
  data: StartDateEndDateType & WithToken,
): PromiseAxiosRes<CalendarP2PType[]> => {
  try {
    const response = await holdingInstance.post(
      `/estate/calendar`,
      {
        startDate: data.startDate,
        endDate: data.endDate,
      },
      {
        headers: {
          Authorization: 'test',
        },
        params: { token: data.token },
      },
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
