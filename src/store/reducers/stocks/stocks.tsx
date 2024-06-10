import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stocksData, stocksDatas, stocksDisLike, stocksLike } from "../../../api/stocks";

const initialState = {
  likes: [-1],
  datas: [],
  detail: {}
}

export type stocksTypes = {
  token: string;
  stocks_id: string;
}

export const getStocksDatas = createAsyncThunk(
  "stocks/getDatas",
  async (data, thunkAPI) => {
    const response = await stocksDatas();
    return response;
  }
);

export const getStocksData = createAsyncThunk(
  "stocks/getData",
  async (data: string, thunkAPI) => {
    const response = await stocksData(data);
    return response;
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
    builder
      .addCase(getStocksDatas.fulfilled, (state, action) => {
        // state.datas = action.payload;
      })
      .addCase(getStocksData.fulfilled, (state, action) => {
        // state.detail = action.payload;
      })
  },
});

export const { setStocksLike, delStocksLike } = stocksSlice.actions;

export default stocksSlice.reducer;