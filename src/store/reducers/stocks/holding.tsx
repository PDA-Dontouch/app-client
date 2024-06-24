import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getHoldingType } from '../../../types/user_product';
import { holdingStocks } from '../../../api/holding';

type holdingStock = {
  krHoldingStocks: string[];
  usHoldingStocks: string[];
};

const initialState = {
  success: true,
  response: {
    krSymbols: [],
    usSymbols: [],
  },
  error: null,
};

type ActionPayload<T> = {
  data: {
    success: true;
    response: T;
    error: null;
  };
};

export const getHoldingStocks = createAsyncThunk(
  'stocks/getHoldingStocks',
  async (data: getHoldingType) => {
    const response = await holdingStocks(data);
    return response as ActionPayload<holdingStock>;
  },
);

const holdingStocksSlice = createSlice({
  name: 'holdingStocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getHoldingStocks.fulfilled,
      (state, action: PayloadAction<ActionPayload<holdingStock>>) => {
        if (action.payload.data.success) {
          state.response.krSymbols =
            action.payload.data.response.krHoldingStocks;
          state.response.usSymbols =
            action.payload.data.response.usHoldingStocks;
        } else {
          state.response.krSymbols = [];
          state.response.usSymbols = [];
        }
      },
    );
  },
});

export default holdingStocksSlice.reducer;
