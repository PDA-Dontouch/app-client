import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stocksData, stocksDatas, stocksDisLike, stocksLike } from "../../../api/stocks";
import { initialDetail, stockDetail } from "../../../types/stockInfo";


export interface Stocks {
  id:number;
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  dividendMonth: number;
  dividendYieldTtm: number;
}

interface StocksState {
  likes: number[];
  datas: Stocks[];
  detail: stockDetail;
}

type ActionPayload = {
  data: {
    response: Stocks[];
  };
};

type ActionPayloadDetail = {
  data: {
    response: stockDetail;
  };
};

const initialState:StocksState = {
  likes: [-1],
  datas: [],
  detail: initialDetail,
}

export type stocksTypes = {
  token: string;
  stock_id: number;
};

interface RequestBodyType {
  userInvestmentType: number;
  safeScore: number;
  dividendScore: number;
  growthScore: number;
  dividendMonth: number | null;
  page: number;
  size: number;
}

export const getStocksDatas = createAsyncThunk<ActionPayload, RequestBodyType>(
  "stocks/getDatas",
  async (requestBody, thunkAPI) => {
    const response = await stocksDatas(requestBody);
    return response as ActionPayload;
  }
);

export const getStocksData = createAsyncThunk<ActionPayloadDetail, number>(
  "stocks/getData",
  async (data: number, thunkAPI) => {
    const response = await stocksData(data);
    return response as ActionPayloadDetail;
  }
);

export const addLikeEstates = createAsyncThunk(
  "stocks/like",
  async (data: stocksTypes, thunkAPI) => {
    const response = await stocksLike(data);
    return response;
  }
);

export const delLikeEstates = createAsyncThunk(
  "stocks/dislike",
  async (data: stocksTypes, thunkAPI) => {
    const response = await stocksDisLike(data);
    return response;
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: initialState,
  reducers: {
    setStocksLike: (state, action) => {
      state.likes.push(action.payload);
    },
    delStocksLike: (state, action) => {
      state.likes = state.likes.filter((el) => el !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getStocksDatas.fulfilled,(state, action: PayloadAction<ActionPayload>) => {
        state.datas = action.payload.data.response;
      },
    );
    builder.addCase(
      getStocksData.fulfilled, (state, action: PayloadAction<ActionPayloadDetail>) => {
        state.detail = action.payload.data.response;
      })
  },
});

export const { setStocksLike, delStocksLike } = stocksSlice.actions;

export default stocksSlice.reducer;