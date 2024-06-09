import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { energyDisLike, energyLike, energyDatas, energyData } from "../../../api/energy";

const initialState = {
  likes: [-1],
  datas: [],
  detail: {}
}

export type energyTypes = {
  token: string;
  energy_id: number;
}

export const getEnergyDatas = createAsyncThunk(
  "energy/getDatas",
  async (data, thunkAPI) => {
    const response = await energyDatas();
    return response;
  }
);

export const getEnergyData = createAsyncThunk(
  "energy/getData",
  async (data: number, thunkAPI) => {
    const response = await energyData(data);
    return response;
  }
);

export const addLikeEnergy = createAsyncThunk(
  "energy/like",
  async (data: energyTypes, thunkAPI) => {
    const response = await energyLike(data);
    return response;
  }
);

export const delLikeEnergy = createAsyncThunk(
  "energy/like",
  async (data: energyTypes, thunkAPI) => {
    const response = await energyDisLike(data);
    return response;
  }
);

const energySlice = createSlice({
  name: "energy",
  initialState: initialState,
  reducers: {
    setEnergyLike: (state, action) => {
      state.likes.push(action.payload);
    },
    delEnergyLike: (state, action) => {
      state.likes = state.likes.filter((el) => el !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnergyDatas.fulfilled, (state, action) => {
        // state.datas = action.payload;
      })
      .addCase(getEnergyData.fulfilled, (state, action) => {
        // state.detail = action.payload;
      })
  },
});

export const { setEnergyLike, delEnergyLike } = energySlice.actions;

export default energySlice.reducer;