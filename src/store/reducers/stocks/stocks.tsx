import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStocksCombi } from '../../../api/stocks';
import {
  StockCombiType,
  InsertCombiStock,
  AddCombiStockReq,
} from '../../../types/stocks_product';
import { RootState } from '../../store';

type ActionPayloadCombi = {
  data: {
    response: StockCombiType;
  };
};

const initialState: StockCombiType = {
  combination1: {
    stocks: [],
    totalDividend: 0,
  },
  combination2: {
    stocks: [],
    totalDividend: 0,
  },
  combination3: {
    stocks: [],
    totalDividend: 0,
  },
};

interface RequestCombiCreate {
  safeScore: number;
  growthScore: number;
  dividendScore: number;
  investmentAmount: number;
}

export const makeCombiStocks = createAsyncThunk<
  ActionPayloadCombi,
  number,
  { state: RootState }
>('stocks/combination/create', async (investmentAmount: number, thunkAPI) => {
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
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: initialState,
  reducers: {
    addStockToCombination: (
      state,
      action: PayloadAction<{
        combination: 'combination1' | 'combination2' | 'combination3';
        stock: InsertCombiStock;
      }>,
    ) => {
      const { combination, stock } = action.payload;
      state[combination].stocks.push(stock);
    },
    removeStockFromCombination: (
      state,
      action: PayloadAction<{
        combination: 'combination1' | 'combination2' | 'combination3';
        stockSymbol: string;
      }>,
    ) => {
      const { combination, stockSymbol } = action.payload;
      const stockToRemove = state[combination].stocks.find(
        (stock) => stock.symbol === stockSymbol,
      );
      if (stockToRemove) {
        state[combination].stocks = state[combination].stocks.filter(
          (stock) => stock.symbol !== stockSymbol,
        );
      }
    },
    updateStockQuantity: (
      state,
      action: PayloadAction<{
        combination: 'combination1' | 'combination2' | 'combination3';
        index: number;
        newAmount: number;
      }>,
    ) => {
      const { combination, index, newAmount } = action.payload;
      const stock = state[combination].stocks[index];
      if (stock) {
        stock.quantity = newAmount;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeCombiStocks.fulfilled, (state, action) => {
      state.combination1 = action.payload.data.response.combination1;
      state.combination2 = action.payload.data.response.combination2;
      state.combination3 = action.payload.data.response.combination3;
    });
  },
});

export const {
  addStockToCombination,
  removeStockFromCombination,
  updateStockQuantity,
} = stocksSlice.actions;

export default stocksSlice.reducer;
