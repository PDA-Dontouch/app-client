import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  estatesData,
  estatesDatas,
  estatesDisLike,
  estatesLike,
} from '../../../api/estates';
import { initialDetail, productDetail } from '../../../types/product';

export interface Products {
  id: number;
  earningRate: number;
  length: number;
  loanAmountBaseLtv: number;
  sumOfInvestmentAndReservation: number;
  title: string;
  titleMainImageUrl: string;
  totalAmountInvestments: number;
}

interface EstatesState {
  likes: number[];
  datas: Products[];
  detail: productDetail;
}

type ActionPayload = {
  data: {
    response: Products[];
  };
};

type ActionPayloadDetail = {
  data: {
    response: productDetail;
  };
};

const initialState: EstatesState = {
  likes: [-1],
  datas: [],
  detail: initialDetail,
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
      state.likes.push(action.payload);
    },
    delEstatesLike: (state, action) => {
      state.likes = state.likes.filter((el) => el !== action.payload);
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

export const { setEstatesLike, delEstatesLike } = estatesSlice.actions;

export default estatesSlice.reducer;
