import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  buyLimitPrice,
  buyMarketPrice,
  sellLimitPrice,
  sellMarketPrice,
} from '../../../api/socket';
import { postMarketData, postOrderData } from '../../../types/socket';

interface TradingState {
  selectedTab: string;
  selectedPrice: string;
  selectedQuantity: string;
  scrollPosition: number;
  orderType: string;
  isNew: boolean;
  selectCode: string;
  selectExchange: string;
}

const initialState: TradingState = {
  selectedTab: '매수',
  selectedPrice: '0',
  selectedQuantity: '0',
  scrollPosition: 100,
  orderType: '지정가',
  isNew: false,
  selectCode: '',
  selectExchange: '',
};

export const buyLimitOrder = createAsyncThunk(
  'stocks/buyLimitOrder',
  async (data: postOrderData) => {
    const response = await buyLimitPrice(data);
    return response;
  },
);

export const buyMarketOrder = createAsyncThunk(
  'stocks/buyMarketOrder',
  async (data: postMarketData) => {
    const response = await buyMarketPrice(data);
    return response;
  },
);

export const sellLimitOrder = createAsyncThunk(
  'stocks/sellLimitOrder',
  async (data: postOrderData) => {
    const response = await sellLimitPrice(data);
    return response;
  },
);

export const sellMarketOrder = createAsyncThunk(
  'stocks/sellMarketOrder',
  async (data: postMarketData) => {
    const response = await sellMarketPrice(data);
    return response;
  },
);

const tradingSlice = createSlice({
  name: 'trading',
  initialState: initialState,
  reducers: {
    setSelectedTab(state, action: PayloadAction<string>) {
      state.selectedTab = action.payload;
    },
    setSelectedPrice(state, action: PayloadAction<string>) {
      state.selectedPrice = action.payload;
    },
    setSelectedQuantity(state, action: PayloadAction<string>) {
      state.selectedQuantity = action.payload;
    },
    setScrollPosition(state, action: PayloadAction<number>) {
      state.scrollPosition = action.payload;
    },
    setOrderType(state, action: PayloadAction<string>) {
      state.orderType = action.payload;
    },
    setSelectCode(state, action: PayloadAction<string>) {
      state.selectCode = action.payload;
    },
    setSelectExchange(state, action: PayloadAction<string>) {
      state.selectExchange = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSelectedPrice,
  setScrollPosition,
  setSelectedTab,
  setOrderType,
  setSelectedQuantity,
  setSelectCode,
  setSelectExchange,
} = tradingSlice.actions;

export default tradingSlice.reducer;
