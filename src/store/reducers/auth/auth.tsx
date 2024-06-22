import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, updateInvestmentType } from '../../../api/auth';
import {
  UserDetail,
  initialUserDetail,
  InvestmentType,
} from '../../../types/user_product';
import { WithToken, WithUserId } from '../../../types/response_product';

const initialState = {
  user: initialUserDetail,
  token: 'test',
};

type ActionPayload = {
  data: {
    response: {
      user: UserDetail;
      token: string;
    };
  };
};

export const postLogin = createAsyncThunk<ActionPayload, string>(
  'user/login',
  async (data: string) => {
    const response = await getUser(data);
    return response as ActionPayload;
  },
);

export const postType = createAsyncThunk(
  'user/type',
  async (data: WithToken & WithUserId & { totalScore: number }) => {
    const response = await updateInvestmentType(data);
    return response.data.response as UserDetail;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      postLogin.fulfilled,
      (state, action: PayloadAction<ActionPayload>) => {
        state.user = action.payload.data.response.user;
        state.token = action.payload.data.response.token;
      },
    );
    builder.addCase(postType.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
