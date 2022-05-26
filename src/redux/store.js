import { configureStore } from "@reduxjs/toolkit";
import changeThemeSlice from "../components/ChangeTheme/changeThemeSlice";
import loginStateSlice from "../components/Login/loginStateSlice";

const store = configureStore({
  reducer: {
    loginState: loginStateSlice.reducer,
    changeTheme: changeThemeSlice.reducer,
  },
});

export default store;
