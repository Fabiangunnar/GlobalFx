import {createSlice} from "@reduxjs/toolkit";
import {NavTypes, faqData, navData} from "../data/maindata";

interface initialTypes {
  navData: NavTypes[];
  faqData: any[];
  currentPage: string;
  openNav: boolean;
}

const initialState: initialTypes = {
  navData,
  faqData,
  currentPage: "/",
  openNav: false,
};

export const HomeNavSlice = createSlice({
  name: "home-nav-slice",
  initialState,
  reducers: {
    setCurrentPage: (state, {payload}) => {
      state.currentPage = payload;
    },
    resetNav: (state) => {
      state.navData = navData;
    },
    setNav: (state, {payload}) => {
      state.navData = payload;
    },
    resetCurrentPage: (state) => {
      state.currentPage = "/";
    },
    setNavLink: (state, {payload}) => {
      const newNavData: any = state.navData.map((item) => {
        return item.id === payload.id
          ? {...item, state: true}
          : {...item, state: false};
      });
      state.navData = newNavData;
      localStorage.setItem("home-nav", JSON.stringify(newNavData));
    },
    setSubNavLink: (state, {payload}) => {
      const newNavData: any = state.navData.map((item) => {
        return item.id === payload.itemId.id && item.subnav
          ? {
              ...item,
              subnav: item.subnav.map((sub) => {
                return sub.id === payload.sub.id
                  ? {...sub, state: true}
                  : {...sub, state: false};
              }),
            }
          : {...item, state: false};
      });
      console.log(payload, newNavData);
      state.navData = newNavData;
      localStorage.setItem("home-nav", JSON.stringify(newNavData));
    },
    setFaqSubData: (state, {payload}) => {
      const newFaqData: any = state.faqData.map((item: any) => {
        return item.id === payload.faqItem.id
          ? {
              ...item,
              subheads: item.subheads.map((subItem: any) => {
                return subItem.id === payload.subhead.id
                  ? {...subItem, state: !subItem.state}
                  : {...subItem, state: false};
              }),
            }
          : {...item};
      });
      state.faqData = newFaqData;
    },
    setFaqData: (state, {payload}) => {
      const newFaqData: any = state.faqData.map((item: any) => {
        return item.id === payload.id
          ? {...item, state: !item.state}
          : {...item, state: false};
      });
      state.faqData = newFaqData;
    },
    setNavDropLink: (state, {payload}) => {
      const newNavData: any = state.navData.map((item) => {
        return item.id === payload.id
          ? {...item, state: !item.state}
          : {...item, state: false};
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
  setSubNavLink,
  resetCurrentPage,
  setFaqData,
  setFaqSubData,
  setNav,
} = HomeNavSlice.actions;
export default HomeNavSlice.reducer;
