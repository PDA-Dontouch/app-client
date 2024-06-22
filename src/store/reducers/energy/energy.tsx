import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  energyDisLike,
  energyLike,
  energyDatas,
  energyData,
  energyBuy,
  energySell,
  getEnergysLike,
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

type ActionPayload<T> = {
  data: {
    response: T;
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

export const getEnergyDatas = createAsyncThunk<
  ActionPayload<EnergyList[]>,
  void
>('energy/getDatas', async (data, thunkAPI) => {
  const response = await energyDatas();
  return response as ActionPayload<EnergyList[]>;
});

export const getEnergyData = createAsyncThunk<ActionPayloadDetail, string>(
  'energy/getData',
  async (data: string, thunkAPI) => {
    const response = await energyData(data);
    return response as ActionPayloadDetail;
  },
);

export const getLikeEnergys = createAsyncThunk(
  'energy/getLike',
  async (data: number) => {
    const response = await getEnergysLike(data);
    return response;
  },
);

export const addLikeEnergys = createAsyncThunk<
  ActionPayloadResult,
  energyTypes
>('energy/like', async (data: energyTypes, thunkAPI) => {
  const response = await energyLike(data);
  return response as ActionPayloadResult;
});

export const delLikeEnergys = createAsyncThunk(
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
    setLikeEnergy(state, action: PayloadAction<string[]>) {
      state.energyLike = action.payload;
    },
    addLikeEnergy(state, action: PayloadAction<string>) {
      state.energyLike.push(action.payload);
    },
    removeLikeEnergy(state, action: PayloadAction<string>) {
      state.energyLike = state.energyLike.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getEnergyDatas.fulfilled,
      (state, action: PayloadAction<ActionPayload<EnergyList[]>>) => {
        state.datas = action.payload.data.response;
        state.loading = false;
      },
    );
    builder.addCase(
      getEnergyData.fulfilled,
      (state, action: PayloadAction<ActionPayloadDetail>) => {
        state.detail = action.payload.data.response;
      },
    );
    builder.addCase(
      getLikeEnergys.fulfilled,
      (state, action: PayloadAction<ActionPayload<[]>>) => {
        state.energyLike = action.payload.data.response;
      },
    );
  },
});

export const { setLikeEnergy, addLikeEnergy, removeLikeEnergy } =
  energySlice.actions;

export default energySlice.reducer;
