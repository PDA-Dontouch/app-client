import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { holdingEstates } from '../../../api/holding';
import { HoldingEstatesType } from '../../../types/estates_product';

const initialState = {
  success: false,
  datas: [
    {
      id: 0,
      userId: 0,
      estateFundId: 0,
      inputCash: 0,
      estateName: '',
      estateEarningRate: 0,
      createAt: null,
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
