import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { estatesBuy } from '../../../api/estates';
import { BuyType } from '../../../types/estates_product';

interface buySellState {}

const initialState = {};

export const buyEstates = createAsyncThunk(
  'estates/buyEstates',
  async (data: BuyType, thunkAPI) => {
    const response = await estatesBuy(data);
    return response;
  },
);

const buySellSlice = createSlice({
  name: 'buySell',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default buySellSlice.reducer;
