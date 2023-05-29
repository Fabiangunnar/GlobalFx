import React, {Fragment, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/SideNav.module.scss";
import {useSelector, useDispatch} from "react-redux";
import {NavTypes, getIconComponent} from "@/data/sidenav";
import {Divider, Flex} from "@chakra-ui/react";
import {
  closeNav,
  setCurrentPage,
  setNavLink,
  setNavDropLink,
  resetNav,
  resetCurrentPage,
} from "@/redux-actions/navSlice";
import {IoMdArrowDropdown} from "react-icons/io";
import {useRouter} from "next/router";
import {RootState} from "@/redux-store/store";

const SideNav = ({ref}: any) => {
  const {navData} = useSelector((state: RootState) => state.nav);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleChangeNav = (link: NavTypes) => {
    dispatch(setCurrentPage(link.link));
    dispatch(setNavLink(link));
    dispatch(closeNav());
  };
  const handleSendHome = () => {
    dispatch(resetNav());
    dispatch(resetCurrentPage());
    dispatch(closeNav());
    router.push("/");
  };
  const handleChangeSubNav = (link: NavTypes) => {
    dispatch(setCurrentPage(link.link));
    dispatch(closeNav());
  };
  const handleNavDrop = (link: NavTypes) => {
    dispatch(setNavDropLink(link));
  };

  return (
    <div className={`${styles.sidenav_block}`} ref={ref}>
      <Flex
        className={"neon_gradient_blur_bg"}
        direction={"column"}
        align={"center"}
        justify={"center"}
        textAlign={"center"}
        w="100%"
        cursor={"pointer"}
        onClick={handleSendHome}
        gap={1}
      >
        <Image
          width={60}
          height={60}
          src={"/logo2-transparent.png"}
          alt={"GLOBAL TYCOON FX logo"}
        />
        <small>GLOBAL TYCOON FX</small>
      </Flex>
      <div className={`${styles.sidenav_items}`}>
        <ul className={`${styles.nav_links}`}>
          <Divider />

          {navData.slice(0, 1).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);
            return (
              <li
                className={`${styles.nav_link} ${
                  item?.state ? styles.active : ""
                }
                            `}
                key={item?.id}
                onClick={() => handleChangeNav(item)}
              >
                <span>{icon}</span>
                <span>{item?.desc} </span>
              </li>
            );
          })}
          <Divider />
          {navData.slice(1, 5).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);

            return (
              <li
                className={`${styles.nav_link} ${
                  item?.state ? styles.active : ""
                }
                            `}
                key={item?.id}
                onClick={() => handleChangeNav(item)}
              >
                <span>{icon}</span>
                <span>{item?.desc} </span>
              </li>
            );
          })}
          <Divider />

          {navData.slice(5).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);
            if (item?.submenu) {
              return (
                <Fragment key={item?.id}>
                  <li
                    className={`${styles.nav_link_sub} ${
                      item?.state ? styles.active : ""
                    }
									 `}
                    key={item?.id}
                    onClick={() => handleNavDrop(item)}
                  >
                    <span>
                      <span>{icon}</span>
                      <span>{item?.desc} </span>
                    </span>
                    <span>
                      <IoMdArrowDropdown />
                    </span>
                  </li>
                  <ul
                    className={`${styles.nav_link_sub_menu} 
										${item?.state ? styles.sub_active : ""}
									 `}
                  >
                    {item.submenu.map((subitem: any) => (
                      <li
                        className={`${styles.nav_link}`}
                        onClick={() => handleChangeSubNav(subitem)}
                        key={subitem?.id}
                      >
                        <span>{icon}</span>
                        <span>{subitem?.desc} </span>
                      </li>
                    ))}
                    <Divider />
                  </ul>
                </Fragment>
              );
            } else {
              return (
                <li
                  className={`${styles.nav_link} ${
                    item?.state ? styles.active : ""
                  }
								         `}
                  key={item?.id}
                  onClick={() => handleChangeNav(item)}
                >
                  <span>{icon}</span>
                  <span>{item?.desc} </span>
                </li>
              );
            }
          })}
          <Divider />
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
