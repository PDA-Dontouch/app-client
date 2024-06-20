import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { holdingEstates } from '../../../api/holding';
import { HoldingEstatesType } from '../../../types/estates_product';

const initialState = {
  success: false,
  datas: [
    {
      createdAt: null,
      earningRate: 0,
      estateId: 0,
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
      errorMessage: '보유 주식이 없습니다.';
      httpStatus: 'NOT_FOUND';
    };
  };
};

export const getHoldingEstates = createAsyncThunk(
  'estates/getHoldingEstates',
  async (data: number) => {
    const response = await holdingEstates(data);
    return response as ActionPayload<HoldingEstatesType[]>;
  },
);

const holdingEstatesSlice = createSlice({
  name: 'holdingEstates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getHoldingEstates.fulfilled,
      (state, action: PayloadAction<ActionPayload<HoldingEstatesType[]>>) => {
        if (action.payload.data.success) {
          state.datas = action.payload.data.response;
        } else {
          state.datas = [];
        }
      },
    );
  },
});

export default holdingEstatesSlice.reducer;
