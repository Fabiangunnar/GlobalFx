import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/styles/SideNav.module.scss";
import { NavTypes, getIconComponent } from "@/data/sidenav";
import { Divider, Flex } from "@chakra-ui/react";

import { IoMdArrowDropdown } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import {
  setCurrentPage,
  setNavLink,
  closeNav,
  resetNav,
  resetCurrentPage,
  setNavDropLink,
} from "@/redux/features/NavSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { appname } from "@/data/maindata";

const SideNav = ({ ref }: any) => {
  let pathname = usePathname();
  pathname = pathname.split("/")[2];
  const { navData } = useAppSelector((state) => state.nav);
  const dispatch = useAppDispatch();
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
        className={"neon_gradient_blur_bg h-16"}
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
          alt={`${appname} logo`}
          className="object-contain w-full h-full"
        />
        <small className="">{appname}</small>
      </Flex>
      <div className={`${styles.sidenav_items}`}>
        <ul className={`${styles.nav_links}`}>
          <Divider />

          {navData.slice(0, 1).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);
            return (
              <Link
                href={`/admin`}
                className={`${styles.nav_link} ${!pathname ? styles.active : ""}
                            `}
                key={item?.id}
                onClick={() => handleChangeNav(item)}
              >
                <span>{icon}</span>
                <span>{item?.desc} </span>
              </Link>
            );
          })}
          <Divider />
          {navData.slice(1, 6).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);

            return (
              <Link
                href={`/admin/${item.link}`}
                className={`${styles.nav_link} ${
                  pathname === item.link ? styles.active : ""
                }
                            `}
                key={item?.id}
                onClick={() => handleChangeNav(item)}
              >
                <span>{icon}</span>
                <span>{item?.desc} </span>
              </Link>
            );
          })}
          <Divider />

          {navData.slice(6).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);
            if (item?.submenu) {
              return (
                <Fragment key={item?.id}>
                  <li
                    className={`${styles.nav_link_sub} ${
                      item.state ? styles.active : ""
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
                      <Link
                        href={`/admin/${subitem.link}`}
                        className={`${styles.nav_link}`}
                        onClick={() => handleChangeSubNav(subitem)}
                        key={subitem?.id}
                      >
                        <span>{icon}</span>
                        <span>{subitem?.desc} </span>
                      </Link>
                    ))}
                    <Divider />
                  </ul>
                </Fragment>
              );
            } else {
              return (
                <Link
                  href={`/admin/${item.link}`}
                  className={`${styles.nav_link} ${
                    pathname === item.link ? styles.active : ""
                  }
								         `}
                  key={item?.id}
                  onClick={() => handleChangeNav(item)}
                >
                  <span>{icon}</span>
                  <span>{item?.desc} </span>
                </Link>
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
