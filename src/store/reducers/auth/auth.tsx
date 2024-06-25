import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, tryLogin, updateInvestmentType } from '../../../api/auth';
import {
  UserDetail,
  initialUserDetail,
  LoginedUser,
  InvestmentType,
} from '../../../types/user_product';
import { WithToken, WithUserId } from '../../../types/response_product';

const initialState = {
  user: initialUserDetail,
  token: ''
};

type ActionPayload = {
  data: {
    response: {
      user: UserDetail;
      token: string;
    };
  };
};


export const postLogin = createAsyncThunk<LoginedUser, { snsType: string, code: string }>(
  'user/login',
  async ({ snsType, code }) => {
    const response = await tryLogin(snsType, code);
    const loginUser = response.data.response;
    console.log(loginUser);
    return loginUser as LoginedUser;
  },
);

export const postType = createAsyncThunk(
  'user/type',
  async (data: WithToken & WithUserId & { totalScore: number }) => {
    const response = await updateInvestmentType(data);
    return response.data.response as UserDetail;
  },
);


export const updateUser = createAsyncThunk(
  'user/update',
  async (data: WithToken & { email: string }) => {
    const response = await getUser(data.email);
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
      (state, action: PayloadAction<LoginedUser>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
    );
    builder.addCase(postType.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
