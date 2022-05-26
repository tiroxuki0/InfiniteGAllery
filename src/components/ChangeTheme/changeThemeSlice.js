import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
  name: "changeTheme",
  initialState: {
    theme: "black",
  },
  reducers: {
    changeColor: (state, action) => {
      state.theme = action.payload;
    },
  },
});
