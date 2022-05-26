import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "loginState",
  initialState: {
    login: false,
  },
  reducers: {
    loginState: (state, action) => {
      state.login = action.payload;
    },
  },
});
