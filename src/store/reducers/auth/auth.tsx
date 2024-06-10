import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../../api/auth";

const initialState = {
  user: {},
}

export const postLogin = createAsyncThunk(
  "user/login",
  async (data: string, thunkAPI) => {
    const response = await login(data);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        // state.user = action.payload;
      })
  },
});

export default userSlice.reducer;
