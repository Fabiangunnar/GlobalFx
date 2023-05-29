import { createSlice } from "@reduxjs/toolkit";
import { navData } from "../data/sidenav";

interface initialTypes {
  navData: any[];
  currentPage: string;
  openNav: boolean;
}
const initialState: initialTypes = {
  navData,
  currentPage: "dashboard",
  openNav: false,
};

export const NavSlice = createSlice({
  name: "nav-slice",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    resetNav: (state) => {
      state.navData = navData;
    },
    resetCurrentPage: (state) => {
      state.currentPage = "dashboard";
    },
    nullAllNavStates: (state) => {
      const newNavData: any = state.navData.map((item) => {
        return { ...item, state: false };
      });
      state.navData = newNavData;
    },
    setNavLink: (state, { payload }) => {
      const newNavData: any = state.navData.map((item) => {
        return item.id === payload.id
          ? { ...item, state: true }
          : { ...item, state: false };
      });
      state.navData = newNavData;
    },
    setNavDropLink: (state, { payload }) => {
      const newNavData: any = state.navData.map((item) => {
        return item.id === payload.id
          ? { ...item, state: !item.state }
          : { ...item, state: false };
      });
      state.navData = newNavData;
    },
    setOpenNav: (state) => {
      state.openNav = !state.openNav;
    },
    closeNav: (state) => {
      state.openNav = false;
    },
  },
});
export const {
  setCurrentPage,
  setNavLink,
  setOpenNav,
  closeNav,
  resetNav,
  setNavDropLink,
  nullAllNavStates,
  resetCurrentPage,
} = NavSlice.actions;
export default NavSlice.reducer;
