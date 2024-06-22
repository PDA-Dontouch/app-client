import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getStocksCombi,
  combinationDistribute,
  getStocksLike,
  stocksLike,
  stocksDisLike,
} from '../../../api/stocks';
import {
  StockCombiType,
  RequestCombiDistribute,
  InsertCombiStock,
  StocksLikeTypes,
  StockLike,
} from '../../../types/stocks_product';
import { AppDispatch, RootState } from '../../store';

type ActionPayloadCombi = {
  data: {
    response: StockCombiType;
  };
};

const initialState: StockCombiType & { totalInvestment: number } & {
  stocksLike: StockLike[];
} = {
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
  stocksLike: [],
};

interface RequestCombiCreate {
  safeScore: number;
  growthScore: number;
  dividendScore: number;
  investmentAmount: number;
}

type TransformedStock = {
  stockId: number;
  exchange: string;
};

type ActionPayload<T> = {
  data: {
    response: T;
  };
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

const transformStocks = (stocks: InsertCombiStock[]): TransformedStock[] => {
  return stocks.map((stock) => determineExchange(stock));
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
  'stocks/combination/addStock',
  async ({ combination, stockId, exchange }, thunkAPI) => {
    const state = thunkAPI.getState();
    const combiStocks = state.stocks;
    const transformedCombination1 = transformStocks(
      combiStocks.combination1.stocks,
    );
    const transformedCombination2 = transformStocks(
      combiStocks.combination2.stocks,
    );
    const transformedCombination3 = transformStocks(
      combiStocks.combination3.stocks,
    );

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

export const removeCombiStocks = createAsyncThunk<
  ActionPayloadCombi,
  {
    combination: 'combination1' | 'combination2' | 'combination3';
    stockSymbol: string;
  },
  { state: RootState }
>(
  'stocks/combination/removeStock',
  async ({ combination, stockSymbol }, thunkAPI) => {
    const state = thunkAPI.getState();
    const combiStocks = state.stocks;
    const combinationToUpdate = combiStocks[combination];

    // 새로운 배열을 생성하고 필터링
    const updatedStocks = combinationToUpdate.stocks.filter(
      (stock) => stock.symbol !== stockSymbol,
    );

    // 현재 상태에서 각 조합을 변환
    const transformedCombination1 = transformStocks(
      combination === 'combination1'
        ? updatedStocks
        : combiStocks.combination1.stocks,
    );
    const transformedCombination2 = transformStocks(
      combination === 'combination2'
        ? updatedStocks
        : combiStocks.combination2.stocks,
    );
    const transformedCombination3 = transformStocks(
      combination === 'combination3'
        ? updatedStocks
        : combiStocks.combination3.stocks,
    );

    const newCombi: RequestCombiDistribute = {
      combination1: transformedCombination1,
      combination2: transformedCombination2,
      combination3: transformedCombination3,
      investmentAmount: state.stocks.totalInvestment,
    };

    const response = await combinationDistribute(newCombi);
    console.log(response.data);
    return response as ActionPayloadCombi;
  },
);

export const getLikeStocks = createAsyncThunk(
  'stocks/getLike',
  async (data: number) => {
    const response = await getStocksLike(data);
    return response;
  },
);

export const addLikeStocks = createAsyncThunk(
  'stocks/like',
  async (data: StocksLikeTypes) => {
    const response = await stocksLike(data);
    return response;
  },
);

export const delLikeStocks = createAsyncThunk(
  'stocks/dislike',
  async (data: StocksLikeTypes) => {
    const response = await stocksDisLike(data);
    return response;
  },
);

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: initialState,
  reducers: {
    setTotalInvestment: (state, action: PayloadAction<number>) => {
      state.totalInvestment = action.payload;
    },
    setLikeStocks(state, action: PayloadAction<StockLike[]>) {
      state.stocksLike = action.payload;
    },
    addLikeStock(state, action: PayloadAction<StockLike>) {
      state.stocksLike.push(action.payload);
    },
    removeLikeStock(state, action: PayloadAction<StockLike>) {
      state.stocksLike = state.stocksLike.filter(
        (el) => el.stockId !== action.payload.stockId,
      );
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
    builder.addCase(removeCombiStocks.fulfilled, (state, action) => {
      state.combination1 = action.payload.data.response.combination1;
      state.combination2 = action.payload.data.response.combination2;
      state.combination3 = action.payload.data.response.combination3;
    });
    builder.addCase(
      getLikeStocks.fulfilled,
      (state, action: PayloadAction<ActionPayload<StockLike[]>>) => {
        state.stocksLike = action.payload.data.response;
      },
    );
  },
});

export const {
  setTotalInvestment,
  setLikeStocks,
  addLikeStock,
  removeLikeStock,
} = stocksSlice.actions;

export default stocksSlice.reducer;
