import React, { useEffect } from "react";
import { NavTypes, getIconComponent } from "../data/sidenav";
import Link from "next/link";
import styles from "@/styles/SideNav.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { closeNav, setCurrentPage, setNavLink } from "@/redux-actions/navSlice";

type Props = {};

const SideNav = (props: Props) => {
	const { navData } = useSelector((state: any) => state.nav);
	const dispatch = useDispatch();
	const handleChangeNav = (link: NavTypes) => {
		dispatch(setCurrentPage(link.link));
		dispatch(setNavLink(link));
		dispatch(closeNav());
	};

	return (
		<div className={`${styles.sidenav_block}`}>
			<h1>Admin</h1>
			<div className={`${styles.sidenav_items}`}>
				<h5>Menus</h5>
				<ul className={`${styles.nav_links}`}>
					{navData.map((item: NavTypes) => {
						const icon = getIconComponent(item.icon);
						return (
							<li
								className={`${styles.nav_link} ${
									item?.state ? styles.active : ""
								}
                            `}
								key={item?.id}
								onClick={() => handleChangeNav(item)}>
								<span>{icon}</span>
								<span>{item?.desc} </span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default SideNav;
