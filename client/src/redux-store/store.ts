import HomeAppSlice from "@/redux-actions/HomeAppSlice";
import HomeNavSlice from "@/redux-actions/homeNavSlice";
import navReducer from "@/redux-actions/navSlice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    nav: navReducer,
    homenav: HomeNavSlice,
    HomeAppSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
