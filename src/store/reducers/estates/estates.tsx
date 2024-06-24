import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  estatesBuy,
  estatesData,
  estatesDatas,
  estatesDisLike,
  estatesLike,
  estatesSell,
  getEstatesLike,
} from '../../../api/estates';
import {
  EstatesList,
  clickEstates,
  EstatesDetail,
  initialEstatesDetail,
  EstateBuyType,
} from '../../../types/estates_product';

interface EstatesState {
  loading: boolean;
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
  loading: true,
  estatesLike: [-1],
  datas: [],
  detail: initialEstatesDetail,
  clickEstates: clickEstates,
};

export type EstatesLikeTypes = {
  userId: number;
  estateFundId: number;
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

export const getLikeEstates = createAsyncThunk(
  'estates/getLike',
  async (data: number) => {
    const response = await getEstatesLike(data);
    return response;
  },
);

export const addLikeEstates = createAsyncThunk(
  'estates/like',
  async (data: EstatesLikeTypes) => {
    const response = await estatesLike(data);
    return response;
  },
);

export const delLikeEstates = createAsyncThunk(
  'estates/dislike',
  async (data: EstatesLikeTypes) => {
    const response = await estatesDisLike(data);
    return response;
  },
);

export const buyEstates = createAsyncThunk(
  'estates/buyEstates',
  async (data: EstateBuyType) => {
    const response = await estatesBuy(data);
    return response;
  },
);

export const sellEstates = createAsyncThunk(
  'estates/sellEstates',
  async (data: EstateBuyType) => {
    const response = await estatesSell(data);
    return response;
  },
);

const estatesSlice = createSlice({
  name: 'estates',
  initialState,
  reducers: {
    setClickEstates: (state, action: PayloadAction<EstatesList>) => {
      state.clickEstates = action.payload;
    },
    setLikeEstates(state, action: PayloadAction<number[]>) {
      state.estatesLike = action.payload;
    },
    addLikeEstate(state, action: PayloadAction<number>) {
      state.estatesLike.push(action.payload);
    },
    removeLikeEstate(state, action: PayloadAction<number>) {
      state.estatesLike = state.estatesLike.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getEstatesDatas.fulfilled,
      (state, action: PayloadAction<ActionPayload<EstatesList[]>>) => {
        state.datas = action.payload.data.response;
        state.loading = false;
      },
    );
    builder.addCase(
      getEstatesData.fulfilled,
      (state, action: PayloadAction<ActionPayload<EstatesDetail>>) => {
        state.detail = action.payload.data.response;
      },
    );
    builder.addCase(
      getLikeEstates.fulfilled,
      (state, action: PayloadAction<ActionPayload<[]>>) => {
        state.estatesLike = action.payload.data.response;
      },
    );
  },
});

export const {
  setClickEstates,
  setLikeEstates,
  addLikeEstate,
  removeLikeEstate,
} = estatesSlice.actions;

export default estatesSlice.reducer;
