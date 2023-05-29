import {NavTypes, getIconComponent} from "@/data/maindata";
import Image from "next/image";

import {
  closeNav,
  resetCurrentPage,
  resetNav,
  setNavLink,
  setOpenNav,
  setSubNavLink,
} from "@/redux-actions/homeNavSlice";
import {RootState} from "@/redux-store/store";
import styles from "@/styles/home/Header.module.scss";
import {Box, Card, CardBody, Divider, Flex, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {RxHamburgerMenu} from "react-icons/rx";
import {useDispatch, useSelector} from "react-redux";
type Props = {};

const Header = (props: Props) => {
  const {openNav, navData} = useSelector((state: RootState) => state.homenav);
  const dispatch = useDispatch();
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
    dispatch(resetNav());
    dispatch(resetCurrentPage());
    dispatch(closeNav());
    router.push("/");
  };
  const handleChangeNav = async (
    item: string,
    itemId: NavTypes,
    state?: string,
    subnav?: boolean,
    sub?: any
  ) => {
    if (state === "Sign In") {
      const data = localStorage.getItem("user");
      if (data !== null) router.push("/admin");
      if (data === null) router.push(item);
      dispatch(resetCurrentPage());
      dispatch(resetNav());
    } else if (subnav) {
      console.log(sub, subnav, itemId);
      dispatch(setSubNavLink({itemId, sub}));
      await router.push(item);
      dispatch(closeNav());
    } else {
      dispatch(setNavLink(itemId));
      await router.push(item);
      dispatch(closeNav());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <nav className={`${styles.nav} `} style={{zIndex: 1000}}>
      <div className={`${styles.header}  ${styles.not_mobile}`}>
        <ul className={`${styles.header_links} `}>
          {navData.slice(0, 4).map((item: NavTypes) => {
            const icon = getIconComponent(item.icon);
            return (
              <li
                onMouseOver={() => setSubNav(false)}
                className={item.state ? styles.active : ""}
                key={item.id}
                onClick={() => handleChangeNav(`${item.link}`, item)}
              >
                <span>{icon}</span>
                <span>{item.head}</span>
              </li>
            );
          })}
        </ul>
        <Flex
          className={"neon_gradient_blur_bg"}
          direction={"column"}
          align={"center"}
          justify={"center"}
          w="100%"
          cursor={"pointer"}
          onClick={handleSendHome}
          gap={1}
        >
          <Image
            width={70}
            height={70}
            src={"/logo2-transparent.png"}
            alt={"GLOBAL TYCOON FX logo"}
          />
          <small>GLOBAL TYCOON FX</small>
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
                    onClick={() =>
                      handleChangeNav(`${item.link}`, item, item.head)
                    }
                  >
                    <span>{item.head}</span>
                  </li>
                </Fragment>
              );
            } else if (item.subnav) {
              return (
                <li key={item.id} ref={subnavref}>
                  <span
                    className={item.state ? styles.active : ""}
                    onMouseOver={() => setSubNav(true)}
                  >
                    <span>{item.head}</span>
                  </span>
                  {subNav && (
                    <Card
                      position={"absolute"}
                      top={12}
                      left={-6}
                      w={"8rem"}
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
                            <Flex
                              _hover={{
                                background: "#2b525a",
                              }}
                              paddingBlock={2}
                              paddingInline={4}
                              align={"center"}
                              gap={2}
                              key={sub.id}
                              onClick={() =>
                                handleChangeNav(`${sub.link}`, item)
                              }
                            >
                              <span>{icon} </span> <Text>{sub.head} </Text>
                            </Flex>
                          );
                        })}
                      </CardBody>
                    </Card>
                  )}
                </li>
              );
            } else {
              return (
                <li
                  className={item.state ? styles.active : ""}
                  key={item.id}
                  onMouseOver={() => setSubNav(false)}
                  onClick={() => handleChangeNav(`${item.link}`, item)}
                >
                  <span>{item.head}</span>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className={`${styles.header} ${styles.mobile}`}>
        <div className={`${styles.nav_icon_head} `}>
          <Flex
            className={"neon_gradient_blur_bg"}
            align={"center"}
            justify={"center"}
            cursor={"pointer"}
            onClick={handleSendHome}
            gap={1}
          >
            <Image
              width={40}
              height={40}
              src={"/logo2-transparent.png"}
              alt={"GLOBAL TYCOON FX logo"}
            />
            <small>GLOBAL TYCOON FX</small>
          </Flex>

          <RxHamburgerMenu
            className={`${styles.nav_icon} `}
            onClick={handleOpenNav}
          />
        </div>
        <div className={`${styles.sidenav} ${openNav ? styles.active : ""} `}>
          <Flex
            className={"neon_gradient_blur_bg"}
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
              alt={"GLOBAL TYCOON FX logo"}
            />
            <small>GLOBAL TYCOON FX</small>
          </Flex>
          <ul className={`${styles.header_links} `}>
            <Divider />
            {navData.map((item: NavTypes) => {
              const icon = getIconComponent(item.icon);
              if (item.head === "Sign In") {
                return (
                  <Fragment key={item.id}>
                    <Divider />
                    <li
                      className={styles.btn}
                      key={item.id}
                      onClick={() =>
                        handleChangeNav(`${item.link}`, item, item.head)
                      }
                    >
                      <span>{icon}</span>
                      <span>{item.head}</span>
                    </li>
                    <Divider />
                  </Fragment>
                );
              } else if (item.subnav) {
                return (
                  <Fragment key={item.id}>
                    {item.subnav.map((sub) => {
                      const icon = getIconComponent(sub.icon);

                      return (
                        <li
                          key={sub.id}
                          className={sub.state ? styles.active : ""}
                          onClick={() => {
                            setMobileSubNav((prev) => !prev);
                            handleChangeNav(`${sub.link}`, item, "", true, sub);
                          }}
                        >
                          <span>{icon}</span>
                          <span>{sub.head}</span>
                        </li>
                      );
                    })}
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={item.id}>
                    <li
                      className={item.state ? styles.active : ""}
                      key={item.id}
                      onClick={() => handleChangeNav(`${item.link}`, item)}
                      style={{gap: "0.4rem", display: "flex"}}
                    >
                      <span>{icon}</span>
                      <span>{item.head}</span>
                    </li>
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
