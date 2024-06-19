import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStocksCombi } from "../../../api/stocks";
import { StockCombiType, InsertCombiStock} from "../../../types/stocks_product";
import { RootState } from "../../store";

type ActionPayloadCombi = {
  data: {
    response: StockCombiType;
  };
};

const initialState: StockCombiType = {
  combination1: {
    stocks: [],
    totalDividend: 0
  },
  combination2: {
    stocks: [],
    totalDividend: 0
  },
  combination3: {
    stocks: [],
    totalDividend: 0
  }
};

interface RequestCombiCreate{
  safeScore: number;
  growthScore: number;
  dividendScore: number;
  investmentAmount: number;
}

export const makeCombiStocks = createAsyncThunk<ActionPayloadCombi, number, { state: RootState }>(
  "stocks/combination/create",
  async (investmentAmount: number, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.user;

    const requestData: RequestCombiCreate = {
      safeScore: user.user.safeScore,
      growthScore: user.user.growthScore,
      dividendScore: user.user.dividendScore,
      investmentAmount: investmentAmount,
    };

    const response = await getStocksCombi(requestData);
    console.log(response.data.response);
    return response as ActionPayloadCombi;
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: initialState,
  reducers: {
    insertStock: (
      state,
      action: PayloadAction<{
        combination: "combination1" | "combination2" | "combination3";
        stock: InsertCombiStock;
      }>
    ) => {
      const { combination, stock } = action.payload;
      state[combination].stocks.push(stock);
    },
    removeStock: (
      state,
      action: PayloadAction<{
        combination: "combination1" | "combination2" | "combination3";
        stockId: number;
      }>
    ) => {
      const { combination, stockId } = action.payload;
      state[combination].stocks = state[combination].stocks.filter(stock => stock.stockId !== stockId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeCombiStocks.fulfilled, (state, action) => {
      state = action.payload.data.response;
    });
  },
});

export const { insertStock,removeStock } = stocksSlice.actions;

export default stocksSlice.reducer;