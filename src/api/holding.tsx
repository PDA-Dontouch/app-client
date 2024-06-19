import { holdingInstance } from './api';

export const holding_url = `/api/holding`;

export const holdingEstates = async (user_id: number) => {
  try {
    const response = await holdingInstance.get(
      holding_url + `/allEstate/${user_id}`,
    );
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
