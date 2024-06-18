import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stocksChart, stocksDetail } from '../../../api/stocks';
import { ChartPost, GetDetail } from '../../../types/individual_stock';

const initialState = {
  chartData: {
    exchange: '',
    stock_id: 0,
    symbol: '',
    close_prices: [],
  },
  detail: {
    basic_info: {
      id: 0,
      symbol: '',
      name: '',
      type: '',
      exchange: '',
      dividendMonth: 0,
      dividendYieldTtm: 0,
      personalizedScore: null,
    },
    detail_info: {
      stockId: 0,
      symbol: '',
      marketCap: 0,
      peRatioTtm: 0,
      tenYShareHoldersEquityGrowthPerShare: 0,
      fiveYShareHoldersEquityGrowthPerShare: 0,
      threeYShareHoldersEquityGrowthPerShare: 0,
      tenYDividendPerShareGrowthPerShare: 0,
      fiveYDividendPerShareGrowthPerShare: null,
      threeYDividendPerShareGrowthPerShare: 0,
    },
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

type ActionDetailPayload = {
  data: {
    response: GetDetail;
  };
};

export const getChartDatas = createAsyncThunk(
  'stocks/getChartDatas',
  async (data: ChartPost, thunkAPI) => {
    const response = await stocksChart(data);
    return response as ActionPayload;
  },
);

export const getDetail = createAsyncThunk(
  'stocks/getDetail',
  async (data: DetailData, thunkAPI) => {
    const response = await stocksDetail(data.exchange, data.stockId);
    return response as ActionDetailPayload;
  },
);

const individualStockSlice = createSlice({
  name: 'individual_stocks',
  initialState: initialState,
  reducers: {
    // setLiveData(state, action) {
    //   state.chartData.close_prices.pop();
    //   state.chartData.close_prices.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getChartDatas.fulfilled, (state, action) => {
      state.chartData = action.payload.data.response;
    });
    builder.addCase(getDetail.fulfilled, (state, action) => {
      state.detail = action.payload.data.response;
    });
  },
});

export default individualStockSlice.reducer;
