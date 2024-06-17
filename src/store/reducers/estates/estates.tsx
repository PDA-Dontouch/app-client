import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  estatesData,
  estatesDatas,
  estatesDisLike,
  estatesLike,
} from '../../../api/estates';
import {
  EstatesList,
  clickEstates,
  estatesDetail,
  initialEstatesDetail,
} from '../../../types/estates_product';

interface EstatesState {
  estatesLike: number[];
  datas: EstatesList[];
  detail: estatesDetail;
  clickEstates: EstatesList;
}

type ActionPayload = {
  data: {
    response: EstatesList[];
  };
};

type ActionPayloadDetail = {
  data: {
    response: estatesDetail;
  };
};

const initialState: EstatesState = {
  estatesLike: [-1],
  datas: [],
  detail: initialEstatesDetail,
  clickEstates: clickEstates,
};

export type estatesTypes = {
  token: string;
  estates_id: number;
};

export const getEstatesDatas = createAsyncThunk<ActionPayload, void>(
  'estates/getDatas',
  async (data, thunkAPI) => {
    const response = await estatesDatas();
    return response as ActionPayload;
  },
);

export const getEstatesData = createAsyncThunk<ActionPayloadDetail, number>(
  'estates/getData',
  async (data: number, thunkAPI) => {
    const response = await estatesData(data);
    return response as ActionPayloadDetail;
  },
);

export const addLikeEstates = createAsyncThunk(
  'estates/like',
  async (data: estatesTypes, thunkAPI) => {
    const response = await estatesLike(data);
    return response;
  },
);

export const delLikeEstates = createAsyncThunk(
  'estates/dislike',
  async (data: estatesTypes, thunkAPI) => {
    const response = await estatesDisLike(data);
    return response;
  },
);

const estatesSlice = createSlice({
  name: 'estates',
  initialState: initialState,
  reducers: {
    // setEstatesDatas: (state, action) => {
    //   state.datas = action.payload;
    // },
    setEstatesLike: (state, action) => {
      state.estatesLike.push(action.payload);
    },
    delEstatesLike: (state, action) => {
      state.estatesLike = state.estatesLike.filter(
        (el) => el !== action.payload,
      );
    },
    setClickEstates: (state, action) => {
      state.clickEstates = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getEstatesDatas.fulfilled,
      (state, action: PayloadAction<ActionPayload>) => {
        state.datas = action.payload.data.response;
      },
    );
    builder.addCase(
      getEstatesData.fulfilled,
      (state, action: PayloadAction<ActionPayloadDetail>) => {
        state.detail = action.payload.data.response;
      },
    );
  },
});

export const { setEstatesLike, delEstatesLike, setClickEstates } =
  estatesSlice.actions;

export default estatesSlice.reducer;
