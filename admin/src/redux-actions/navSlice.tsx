import { createSlice } from "@reduxjs/toolkit";
import { navData } from "../data/sidenav";

interface initialTypes {
	navData: any[];
	currentPage: string;
	openNav: boolean;
}
const initialState: initialTypes = {
	navData,
	currentPage: "user",
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
		setNavLink: (state, { payload }) => {
			const newNavData: any = state.navData.map((item) => {
				return item.id === payload.id
					? { ...item, state: true }
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
export const { setCurrentPage, setNavLink, setOpenNav, closeNav, resetNav } =
	NavSlice.actions;
export default NavSlice.reducer;
