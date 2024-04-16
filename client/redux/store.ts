import { configureStore } from "@reduxjs/toolkit";
import nav from "./features/NavSlice";
import App from "./features/AppSlice";
import HomeAppSlice from "./features/HomeAppSlice";

export const store = configureStore({
  reducer: {
    nav,
    homenav: App,
    HomeAppSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
