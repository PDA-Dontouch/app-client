import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { holdingEnergy, holdingEstates } from '../../../api/holding';
import { HoldingEnergyType } from '../../../types/energy_product';

const initialState = {
  success: false,
  datas: [
    {
      createdAt: null,
      earningRate: 0,
      energyId: '',
      id: 0,
      inputCash: 0,
      investmentPeriod: 0,
      startPeriod: '',
      title: '',
      titleImageUrl: '',
      userId: 0,
    },
  ],
};

type ActionPayload<T> = {
  data: {
    success: boolean;
    response: T;
    error: {
      errorMessage: '보유 에너지 상품이 없습니다.';
      httpStatus: 'NOT_FOUND';
    };
  };
};

export const getHoldingEnergy = createAsyncThunk(
  'energy/getHoldingEnergy',
  async (data: number) => {
    const response = await holdingEnergy(data);
    return response as ActionPayload<HoldingEnergyType[]>;
  },
);

const holdingEnergySlice = createSlice({
  name: 'holdingEnergy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getHoldingEnergy.fulfilled,
      (state, action: PayloadAction<ActionPayload<HoldingEnergyType[]>>) => {
        if (action.payload.data.success) {
          state.datas = action.payload.data.response;
        } else {
          state.datas = [];
        }
      },
    );
  },
});

export default holdingEnergySlice.reducer;
