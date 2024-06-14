import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  energyDisLike,
  energyLike,
  energyDatas,
  energyData,
} from '../../../api/energy';
import {
  EnergyList,
  energyDetail,
  initialEnergyDetail,
} from '../../../types/energy_product';

interface EnergyState {
  energyLike: string[];
  datas: EnergyList[];
  detail: energyDetail;
}

type ActionPayload = {
  data: {
    response: EnergyList[];
  };
};

type ActionPayloadDetail = {
  data: {
    response: energyDetail;
  };
};

const initialState: EnergyState = {
  energyLike: ['-1'],
  datas: [],
  detail: initialEnergyDetail,
};

export type energyTypes = {
  token: string;
  energy_id: number;
};

export const getEnergyDatas = createAsyncThunk<ActionPayload, void>(
  'energy/getDatas',
  async (data, thunkAPI) => {
    const response = await energyDatas();
    return response as ActionPayload;
  },
);

export const getEnergyData = createAsyncThunk<ActionPayloadDetail, string>(
  'energy/getData',
  async (data: string, thunkAPI) => {
    const response = await energyData(data);
    return response as ActionPayloadDetail;
  },
);

export const addLikeEnergy = createAsyncThunk(
  'energy/like',
  async (data: energyTypes, thunkAPI) => {
    const response = await energyLike(data);
    return response;
  },
);

export const delLikeEnergy = createAsyncThunk(
  'energy/like',
  async (data: energyTypes, thunkAPI) => {
    const response = await energyDisLike(data);
    return response;
  },
);

const energySlice = createSlice({
  name: 'energy',
  initialState: initialState,
  reducers: {
    setEnergyLike: (state, action) => {
      state.energyLike.push(action.payload);
    },
    delEnergyLike: (state, action) => {
      state.energyLike = state.energyLike.filter((el) => el !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getEnergyDatas.fulfilled,
        (state, action: PayloadAction<ActionPayload>) => {
          state.datas = action.payload.data.response;
        },
      )
      .addCase(
        getEnergyData.fulfilled,
        (state, action: PayloadAction<ActionPayloadDetail>) => {
          state.detail = action.payload.data.response;
        },
      );
  },
});

export const { setEnergyLike, delEnergyLike } = energySlice.actions;

export default energySlice.reducer;
