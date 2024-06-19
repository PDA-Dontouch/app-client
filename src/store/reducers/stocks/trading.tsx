import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buyLimitPrice, sellLimitPrice } from '../../../api/socket';
import { postOrderData } from '../../../types/socket';

interface TradingState {
  selectedTab: string;
  selectedPrice: string;
  selectedQuantity: string;
  scrollPosition: number;
  orderType: string;
  isNew: boolean;
  selectCode: string;
}

const initialState: TradingState = {
  selectedTab: '매수',
  selectedPrice: '0',
  selectedQuantity: '0',
  scrollPosition: 100,
  orderType: '지정가',
  isNew: false,
  selectCode: '',
};

export const buyLimitOrder = createAsyncThunk(
  'stocks/buyLimitOrder',
  async (data: postOrderData) => {
    const response = await buyLimitPrice(data);
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
} = tradingSlice.actions;

export default tradingSlice.reducer;
