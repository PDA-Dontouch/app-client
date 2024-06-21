import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStocksCombi, combinationDistribute } from '../../../api/stocks';
import {
  StockCombiType,
  RequestCombiDistribute,
  InsertCombiStock
} from '../../../types/stocks_product';
import { AppDispatch, RootState } from '../../store';

type ActionPayloadCombi = {
  data: {
    response: StockCombiType;
  };
};

const initialState: StockCombiType & { totalInvestment: number } = {
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
  totalInvestment: 0, // 전체 투자 금액
};

interface RequestCombiCreate {
  safeScore: number;
  growthScore: number;
  dividendScore: number;
  investmentAmount: number;
}

type TransformedStock  = {
  stockId: number;
  exchange: string;
};

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

const determineExchange = (stock: InsertCombiStock): TransformedStock => {
  const isKRStock = /^[0-9]+$/.test(stock.symbol);
  return {
    stockId: stock.stockId,
    exchange: isKRStock ? 'KSC' : 'OTHER',
  };
};

const transformStocks = (stocks: InsertCombiStock[]):TransformedStock[] => {
  return stocks.map(stock => determineExchange(stock));
};

export const addCombiStocks = createAsyncThunk<
  ActionPayloadCombi,
  {
    combination: 'combination1' | 'combination2' | 'combination3';
    stockId: number;
    exchange: string;
  },
  { state: RootState }
>(
  'stocks/combination/distribute',
  async ({ combination, stockId, exchange }, thunkAPI) => {
    const state = thunkAPI.getState();
    const combiStocks = state.stocks;
    const transformedCombination1 = transformStocks(combiStocks.combination1.stocks);
    const transformedCombination2 = transformStocks(combiStocks.combination2.stocks);
    const transformedCombination3 = transformStocks(combiStocks.combination3.stocks);

    const newCombi: RequestCombiDistribute = {
      combination1: transformedCombination1,
      combination2: transformedCombination2,
      combination3: transformedCombination3,
      investmentAmount: state.stocks.totalInvestment,
    };
    newCombi[combination].push({ stockId, exchange });

    const response = await combinationDistribute(newCombi);
    console.log(response.data);
    return response as ActionPayloadCombi;
  },
);

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: initialState,
  reducers: {
    setTotalInvestment: (
      state,
      action: PayloadAction<number>
    ) => {
      state.totalInvestment = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(makeCombiStocks.fulfilled, (state, action) => {
      state.combination1 = action.payload.data.response.combination1;
      state.combination2 = action.payload.data.response.combination2;
      state.combination3 = action.payload.data.response.combination3;
    });
    builder.addCase(addCombiStocks.fulfilled, (state, action) => {
      state.combination1 = action.payload.data.response.combination1;
      state.combination2 = action.payload.data.response.combination2;
      state.combination3 = action.payload.data.response.combination3;
    });
  },
});

export const {setTotalInvestment,removeStockFromCombination } =
  stocksSlice.actions;

export default stocksSlice.reducer;
