import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stocksChart, stocksDetail } from '../../../api/stocks';
import { ChartPost } from '../../../types/individual_stock';

const initialState = {
  chartData: {
    exchange: '',
    stock_id: 0,
    symbol: '',
    close_prices: [],
  },
};

interface ChartData {
  exchange: string;
  stock_id: number;
  symbol: string;
  close_prices: [];
}

interface DetailData {
  exchange: string;
  stockId: number;
}

type ActionPayload = {
  data: {
    response: ChartData;
  };
};

export const getChartDatas = createAsyncThunk(
  'stocks/getChartDatas',
  async (data: ChartPost, thunkAPI) => {
    const response = await stocksChart(data);
    return response as ActionPayload;
  },
);

export const getChartDetail = createAsyncThunk(
  'stocks/getChartDetail',
  async (data: DetailData, thunkAPI) => {
    const response = await stocksDetail(data.exchange, data.stockId);
    return response as ActionPayload;
  },
);

const individualStockSlice = createSlice({
  name: 'individual_stocks',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChartDatas.fulfilled, (state, action) => {
      state.chartData = action.payload.data.response;
    });
  },
});

export default individualStockSlice.reducer;
