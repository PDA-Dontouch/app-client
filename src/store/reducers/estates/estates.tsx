import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  estatesBuy,
  estatesData,
  estatesDatas,
  estatesDisLike,
  estatesLike,
  estatesSell,
} from '../../../api/estates';
import {
  EstatesList,
  clickEstates,
  EstatesDetail,
  initialEstatesDetail,
  BuyType,
} from '../../../types/estates_product';

interface EstatesState {
  estatesLike: number[];
  datas: EstatesList[];
  detail: EstatesDetail;
  clickEstates: EstatesList;
}

type ActionPayload<T> = {
  data: {
    response: T;
  };
};

const initialState: EstatesState = {
  estatesLike: [-1],
  datas: [],
  detail: initialEstatesDetail,
  clickEstates: clickEstates,
};

export type EstatesTypes = {
  token: string;
  estates_id: number;
};

export const getEstatesDatas = createAsyncThunk(
  'estates/getDatas',
  async () => {
    const response = await estatesDatas();
    return response as ActionPayload<EstatesList[]>;
  },
);

export const getEstatesData = createAsyncThunk(
  'estates/getData',
  async (data: number) => {
    const response = await estatesData(data);
    return response as ActionPayload<EstatesDetail>;
  },
);

export const addLikeEstates = createAsyncThunk(
  'estates/like',
  async (data: EstatesTypes) => {
    const response = await estatesLike(data);
    return response;
  },
);

export const delLikeEstates = createAsyncThunk(
  'estates/dislike',
  async (data: EstatesTypes) => {
    const response = await estatesDisLike(data);
    return response;
  },
);

export const buyEstates = createAsyncThunk(
  'estates/buyEstates',
  async (data: BuyType) => {
    const response = await estatesBuy(data);
    return response;
  },
);

export const sellEstates = createAsyncThunk(
  'estates/sellEstates',
  async (data: BuyType) => {
    const response = await estatesSell(data);
    return response;
  },
);

const estatesSlice = createSlice({
  name: 'estates',
  initialState,
  reducers: {
    setEstatesLike: (state, action: PayloadAction<number>) => {
      state.estatesLike.push(action.payload);
    },
    delEstatesLike: (state, action: PayloadAction<number>) => {
      state.estatesLike = state.estatesLike.filter(
        (el) => el !== action.payload,
      );
    },
    setClickEstates: (state, action: PayloadAction<EstatesList>) => {
      state.clickEstates = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getEstatesDatas.fulfilled,
      (state, action: PayloadAction<ActionPayload<EstatesList[]>>) => {
        state.datas = action.payload.data.response;
      },
    );
    builder.addCase(
      getEstatesData.fulfilled,
      (state, action: PayloadAction<ActionPayload<EstatesDetail>>) => {
        state.detail = action.payload.data.response;
      },
    );
  },
});

export const { setEstatesLike, delEstatesLike, setClickEstates } =
  estatesSlice.actions;

export default estatesSlice.reducer;
