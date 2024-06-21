import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../../api/auth';
import { UserDetail, initialUserDetail } from '../../../types/user_product';

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
  },
});

export default userSlice.reducer;
