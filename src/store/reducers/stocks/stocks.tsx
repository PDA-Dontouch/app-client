import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getStocksCombi,
  combinationDistribute,
  getStocksLike,
  stocksLike,
  stocksDisLike,
  purchaseCombination,
} from '../../../api/stocks';
import {
  StockCombiType,
  RequestCombiDistribute,
  InsertCombiStock,
  StocksLikeTypes,
  StockLike,
  PostCombiData,
  IndividualCombi,
} from '../../../types/stocks_product';
import { AppDispatch, RootState } from '../../store';

type ActionPayloadCombi = {
  data: {
    response: StockCombiType;
    success: boolean;
  };
};

const initialState: StockCombiType & { totalInvestment: number } & {
  stocksLike: StockLike[];
} & { loading: boolean } = {
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
  loading: true,
};

interface RequestCombiCreate {
  userId: number;
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
    userId: user.user.id,
    investmentAmount: investmentAmount,
  };

  const response = await getStocksCombi(requestData);
  console.log(response.data.response);
  return response as ActionPayloadCombi;
});

const determineExchange = (stock: InsertCombiStock): TransformedStock => {
  const isKr = stock.exchange === 'KSC';
  console.log(stock.name, isKr);
  return {
    stockId: stock.stockId,
    exchange: isKr ? 'KSC' : 'OTHER',
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
    console.log(newCombi);
    const response = await combinationDistribute(newCombi);
    console.log('here', response.data);
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

export const purchasedCombination = createAsyncThunk(
  'stocks/purchaseCombination',
  async (data: PostCombiData) => {
    const response = await purchaseCombination(data);
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
    setTotalDividend1(state, action: PayloadAction<number>) {
      state.combination1.totalDividend = action.payload;
    },
    setTotalDividend2(state, action: PayloadAction<number>) {
      state.combination2.totalDividend = action.payload;
    },
    setTotalDividend3(state, action: PayloadAction<number>) {
      state.combination3.totalDividend = action.payload;
    },
    setQuantity(
      state,
      action: PayloadAction<{ data: InsertCombiStock; combiType: number }>,
    ) {
      const { data, combiType } = action.payload;
      if (combiType === 1) {
        const stock = state.combination1.stocks.find(
          (stock) => stock.stockId === data.stockId,
        );
        if (stock) {
          stock.quantity = data.quantity;
        }
      } else if (combiType === 2) {
        const stock = state.combination2.stocks.find(
          (stock) => stock.stockId === data.stockId,
        );
        if (stock) {
          stock.quantity = data.quantity;
        }
      } else {
        const stock = state.combination3.stocks.find(
          (stock) => stock.stockId === data.stockId,
        );
        if (stock) {
          stock.quantity = data.quantity;
        }
      }
    },
    addCombi1Stock(state, action: PayloadAction<InsertCombiStock>) {
      state.combination1.stocks.push(action.payload);
    },
    addCombi2Stock(state, action: PayloadAction<InsertCombiStock>) {
      state.combination2.stocks.push(action.payload);
    },
    addCombi3Stock(state, action: PayloadAction<InsertCombiStock>) {
      state.combination3.stocks.push(action.payload);
    },
    removeCombi1Stock(state, action: PayloadAction<InsertCombiStock>) {
      state.combination1.stocks = state.combination1.stocks.filter(
        (el) => el.stockId !== action.payload.stockId,
      );
    },
    removeCombi2Stock(state, action: PayloadAction<InsertCombiStock>) {
      state.combination2.stocks = state.combination2.stocks.filter(
        (el) => el.stockId !== action.payload.stockId,
      );
    },
    removeCombi3Stock(state, action: PayloadAction<InsertCombiStock>) {
      state.combination3.stocks = state.combination3.stocks.filter(
        (el) => el.stockId !== action.payload.stockId,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeCombiStocks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(makeCombiStocks.fulfilled, (state, action) => {
      if (action.payload.data.success) {
        state.combination1 = action.payload.data.response.combination1;
        state.combination2 = action.payload.data.response.combination2;
        state.combination3 = action.payload.data.response.combination3;
        state.loading = false;
      } else {
        state.combination1.stocks = [];
        state.combination2.stocks = [];
        state.combination3.stocks = [];
        state.loading = false;
      }
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
  setQuantity,
  setTotalDividend1,
  setTotalDividend2,
  setTotalDividend3,
  addCombi1Stock,
  addCombi2Stock,
  addCombi3Stock,
  removeCombi1Stock,
  removeCombi2Stock,
  removeCombi3Stock,
} = stocksSlice.actions;

export default stocksSlice.reducer;
