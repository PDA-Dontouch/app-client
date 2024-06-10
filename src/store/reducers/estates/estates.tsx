import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { estatesData, estatesDatas, estatesDisLike, estatesLike } from "../../../api/estates";

const initialState = {
  likes: [-1],
  datas: [],
  detail: {}
}

export type estatesTypes = {
  token: string;
  estates_id: number;
}

export const getEstatesDatas = createAsyncThunk(
  "estates/getDatas",
  async (data, thunkAPI) => {
    const response = await estatesDatas();
    return response;
  }
);

export const getEstatesData = createAsyncThunk(
  "estates/getData",
  async (data: number, thunkAPI) => {
    const response = await estatesData(data);
    return response;
  }
);

export const addLikeEstates = createAsyncThunk(
  "estates/like",
  async (data: estatesTypes, thunkAPI) => {
    const response = await estatesLike(data);
    return response;
  }
);

export const delLikeEstates = createAsyncThunk(
  "estates/dislike",
  async (data: estatesTypes, thunkAPI) => {
    const response = await estatesDisLike(data);
    return response;
  }
);

const estatesSlice = createSlice({
  name: "estates",
  initialState: initialState,
  reducers: {
    setEstatesLike: (state, action) => {
      state.likes.push(action.payload);
    },
    delEstatesLike: (state, action) => {
      state.likes = state.likes.filter((el) => el !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEstatesDatas.fulfilled, (state, action) => {
        // state.datas = action.payload;
      })
      .addCase(getEstatesData.fulfilled, (state, action) => {
        // state.detail = action.payload;
      })
  },
});

export const { setEstatesLike, delEstatesLike } = estatesSlice.actions;

export default estatesSlice.reducer;