import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  energyDisLike,
  energyLike,
  energyDatas,
  energyData,
  energyBuy,
  energySell,
} from '../../../api/energy';
import {
  EnergyList,
  energyDetail,
  initialEnergyDetail,
} from '../../../types/energy_product';
import { EnergyBuyType } from '../../../types/energy_product';

interface EnergyState {
  loading: boolean;
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

type ActionPayloadResult = {
  data: {
    success: true;
    response: {
      savedLikeEnergyFundId: '';
    };
    error: null;
  };
};

const initialState: EnergyState = {
  loading: true,
  energyLike: ['-1'],
  datas: [],
  detail: initialEnergyDetail,
};

export type energyTypes = {
  userId: number;
  energyFundId: string;
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

export const addLikeEnergy = createAsyncThunk<ActionPayloadResult, energyTypes>(
  'energy/like',
  async (data: energyTypes, thunkAPI) => {
    const response = await energyLike(data);
    return response as ActionPayloadResult;
  },
);

export const delLikeEnergy = createAsyncThunk(
  'energy/dislike',
  async (data: energyTypes, thunkAPI) => {
    const response = await energyDisLike(data);
    return response;
  },
);

export const buyEnergy = createAsyncThunk(
  'energy/buyEnergy',
  async (data: EnergyBuyType) => {
    const response = await energyBuy(data);
    return response;
  },
);

export const sellEnergy = createAsyncThunk(
  'energy/sellEnergy',
  async (data: EnergyBuyType) => {
    const response = await energySell(data);
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
          state.loading = false;
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
