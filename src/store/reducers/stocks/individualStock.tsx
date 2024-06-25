import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  stocksChartKr,
  stocksChartUs,
  stocksDetail,
} from '../../../api/stocks';
import {
  GetDetail,
  KrChartPost,
  UsChartPost,
} from '../../../types/individual_stock';

const initialState = {
  isLoading: true,
  upDown: 0,
  stockRate: 0,
  close: 0,
  chartData: [],
  fixedChart: [],
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
  code: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  date: string;
}

interface DetailData {
  exchange: string;
  stockId: number;
}

export type ChartActionPayload = {
  data: ChartData[];
};

type ActionType = {
  payload: {
    data: {
      response: {
        code: string;
        open: number;
        close: number;
        high: number;
        low: number;
        volume: number;
        date: string;
      };
    };
  };
};

type ActionType2 = {
  payload: ChartData[];
};

type ActionDetailPayload = {
  data: {
    response: GetDetail;
  };
};

export const getKrChartDatas = createAsyncThunk(
  'stocks/getKrChartDatas',
  async (data: KrChartPost, thunkAPI) => {
    const response = await stocksChartKr(data);
    return response as ChartActionPayload;
  },
);

export const getUsChartDatas = createAsyncThunk(
  'stocks/getUsChartDatas',
  async (data: UsChartPost, thunkAPI) => {
    const response = await stocksChartUs(data);
    return response as ChartActionPayload;
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
    setFixedData(state, action: ActionType2) {
      state.fixedChart = action.payload;
    },
    setLiveData(state, action: ActionType) {
      state.chartData.pop();
      state.chartData.push(action.payload.data.response);
    },
    setUpDown(state, action) {
      state.upDown = action.payload;
    },
    setStockRate(state, action) {
      state.stockRate = action.payload;
    },
    setClose(state, action) {
      state.close = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getKrChartDatas.fulfilled, (state, action) => {
      state.chartData = action.payload.data
        .filter((d) => d.open !== null && d.close !== null)
        .reverse();
      state.isLoading = false;
    });
    builder.addCase(getKrChartDatas.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsChartDatas.fulfilled, (state, action) => {
      state.chartData = action.payload.data
        .filter((d) => d.open !== null && d.close !== null)
        .reverse();
      state.isLoading = false;
    });
    builder.addCase(getUsChartDatas.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDetail.fulfilled, (state, action) => {
      state.detail = action.payload.data.response;
    });
  },
});

export const { setFixedData, setLiveData, setUpDown, setStockRate, setClose } =
  individualStockSlice.actions;

export default individualStockSlice.reducer;
