"use client";
import { NavTypes, appname, getIconComponent, navData } from "@/data/maindata";
import Image from "next/image";

import styles from "@/app/styles/home/Header.module.scss";
import { Box, Card, CardBody, Divider, Flex, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { closeNav, setOpenNav, setSubNavLink } from "@/redux/features/AppSlice";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
type Props = {};

const Header = (props: Props) => {
  const { openNav } = useAppSelector((state) => state.homenav);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [subNav, setSubNav] = useState(false);
  const [mobileSubNav, setMobileSubNav] = useState(false);
  const subnavref: any = useRef();
  const handleClickOutside = (event: any) => {
    if (subnavref.current && !subnavref.current.contains(event.target)) {
      setSubNav(false);
    }
  };
  const router = useRouter();
  const handleOpenNav = () => {
    dispatch(setOpenNav());
  };
  const handleSendHome = () => {
    dispatch(closeNav());
    router.push("/");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <nav className={`${styles.nav} `} style={{ zIndex: 1000 }}>
      <div className={`${styles.header}  ${styles.not_mobile}`}>
        <ul className={`${styles.header_links} `}>
          {navData.slice(0, 4).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);
            return (
              <Link href={item?.link ? item.link : "/"} key={item.id}>
                <li
                  onMouseOver={() => setSubNav(false)}
                  className={`/${item.link}` === pathname ? styles.active : ""}
                >
                  <span>{icon}</span>
                  <span>{item.head}</span>
                </li>
              </Link>
            );
          })}
        </ul>
        <Flex
          className={
            "neon_gradient_blur_bg h-16 flex justify-center items-center"
          }
          direction={"column"}
          align={"center"}
          justify={"center"}
          w="100%"
          cursor={"pointer"}
          onClick={handleSendHome}
          gap={1}
        >
          <Image
            width={180}
            height={180}
            src={"/logo2-transparent.png"}
            alt={`${appname} logo`}
            className="w-full h-full object-contain"
          />
          <small className="whitespace-nowrap">{appname}</small>
        </Flex>
        <ul className={`${styles.header_links}`}>
          {navData.slice(4).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);
            if (item.head === "Sign In") {
              return (
                <Fragment key={item.id}>
                  <Divider orientation="vertical" />
                  <li
                    className={styles.btn}
                    key={item.id}
                    onMouseOver={() => setSubNav(false)}
                    onClick={() => {
                      const data = localStorage.getItem("user");
                      if (data !== null) router.push("/admin");
                      if (data === null) router.push("/admin/auth");
                    }}
                  >
                    <span>{item.head}</span>
                  </li>
                </Fragment>
              );
            } else if (item.subnav) {
              return (
                <li key={item.id} ref={subnavref}>
                  <span
                    className={
                      `/${item.link}` === pathname ? styles.active : ""
                    }
                    onMouseOver={() => setSubNav(true)}
                  >
                    <span>{item.head}</span>
                  </span>
                  {subNav && (
                    <Card
                      position={"absolute"}
                      top={12}
                      left={-6}
                      w={"12rem"}
                      h={"14rem"}
                      zIndex={100}
                      border={"1px solid #2b525a"}
                      bg={"rgba(0, 0, 0, 0.8)"}
                      backdropFilter={"blur(4px)"}
                      color={"gray.400"}
                      overflow={"hidden"}
                    >
                      <CardBody
                        p={0}
                        display={"flex"}
                        flexDir={"column"}
                        alignItems={"flex-start"}
                        justifyContent={"center"}
                      >
                        {item.subnav.map((sub) => {
                          const icon = getIconComponent(sub.icon);
                          return (
                            <Link
                              href={sub.link}
                              key={sub.id}
                              className="w-full"
                            >
                              <Flex
                                _hover={{
                                  background: "#2b525a",
                                }}
                                paddingBlock={2}
                                paddingInline={4}
                                align={"center"}
                                gap={2}
                              >
                                <span>{icon} </span>{" "}
                                <Text className="whitespace-nowrap">
                                  {sub.head}{" "}
                                </Text>
                              </Flex>
                            </Link>
                          );
                        })}
                      </CardBody>
                    </Card>
                  )}
                </li>
              );
            } else {
              return (
                <Link href={`${item.link}`} key={item.id}>
                  <li
                    className={
                      `/${item.link}` === pathname ? styles.active : ""
                    }
                    onMouseOver={() => setSubNav(false)}
                  >
                    <span>{item.head}</span>
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      </div>
      <div className={`${styles.header} ${styles.mobile} `}>
        <div className={`${styles.nav_icon_head} `}>
          <Flex
            className={
              "neon_gradient_blur_bg h-12 flex justify-center items-center"
            }
            align={"center"}
            justify={"center"}
            cursor={"pointer"}
            onClick={handleSendHome}
            gap={1}
          >
            <Image
              width={80}
              height={80}
              src={"/logo2-transparent.png"}
              alt={`${appname} logo`}
              className="w-full h-full object-contain"
            />
            <small className="whitespace-nowrap">{appname}</small>
          </Flex>

          <RxHamburgerMenu
            className={`${styles.nav_icon} `}
            onClick={handleOpenNav}
          />
        </div>
        <div className={`${styles.sidenav} ${openNav ? styles.active : ""} `}>
          <Flex
            className={"neon_gradient_blur_bg h-16"}
            direction={"column"}
            align={"center"}
            justify={"center"}
            cursor={"pointer"}
            onClick={handleSendHome}
            w="100%"
            gap={1}
          >
            <Image
              width={60}
              height={60}
              src={"/logo2-transparent.png"}
              alt={`${appname} logo`}
              className="w-full h-full object-contain"
            />
            <small className="whitespace-nowrap">{appname}</small>
          </Flex>
          <ul className={`${styles.header_links} `}>
            {navData.slice(-1).map((item: NavTypes) => {
              const icon = getIconComponent(item.icon);
              return (
                <Fragment key={item.id}>
                  <Divider />
                  <li
                    className={styles.btn}
                    key={item.id}
                    onClick={() => {
                      const data = localStorage.getItem("user");
                      if (data !== null) router.push("/admin");
                      if (data === null) router.push("/admin/auth");
                    }}
                  >
                    <span>{icon}</span>
                    <span>{item.head}</span>
                  </li>
                  <Divider />
                </Fragment>
              );
            })}
            {navData
              .filter((item) => item.head !== "Sign In")
              .map((item: NavTypes) => {
                const icon = getIconComponent(item.icon);
                if (item.subnav) {
                  return (
                    <Fragment key={item.id}>
                      {item.subnav.map((sub) => {
                        const icon = getIconComponent(sub.icon);

                        return (
                          <Link
                            href={`/${sub.link}`}
                            key={sub.id}
                            className="w-full"
                          >
                            <li
                              className={
                                `/${sub.link}` === pathname ? styles.active : ""
                              }
                            >
                              <span>{icon}</span>
                              <span>{sub.head}</span>
                            </li>
                          </Link>
                        );
                      })}
                    </Fragment>
                  );
                } else if (item.link !== undefined) {
                  return (
                    <Fragment key={item.id}>
                      <Link
                        href={`/${item.link}`}
                        key={item.id}
                        className="w-full"
                      >
                        <li
                          style={{ gap: "0.4rem", display: "flex" }}
                          className={`${
                            `/${item.link}` === pathname ? styles.active : ""
                          } w-full`}
                        >
                          <span className="flex">{icon}</span>
                          <span>{item.head}</span>
                        </li>
                      </Link>
                    </Fragment>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
