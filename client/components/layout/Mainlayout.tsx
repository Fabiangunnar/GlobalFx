"use client";
import Header from "@/components/home/Header";
import { Head } from "next/document";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/Home.module.scss";
import TopWidget from "@/components/pages/TopWidget";
import { Card, CardBody, Text } from "@chakra-ui/react";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";
import { appname, navData } from "@/data/maindata";
import Footer from "@/components/home/Footer";
import BottomWidget from "@/components/pages/BottomWidget";
import NotificationPopup from "@/components/home/NotificationPopup";
import { usePathname, useRouter } from "next/navigation";
import { BsChatSquareTextFill } from "react-icons/bs";
import { closeNav, setNav } from "@/redux/features/AppSlice";
import { AdminAccount, getAdminAccounts } from "@/redux/features/HomeAppSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TidioChat from "./TidioChat";
import { createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer } = createStandaloneToast();

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [showPrompt, setShowPrompt] = useState(false);
  const [storedAccount, setStoredAccount] = useState<AdminAccount[]>([]);
  const sideNavRef: any = useRef();
  const pathname = usePathname();
  const router = useRouter();
  const { adminAccounts } = useAppSelector((store) => store.HomeAppSlice);
  const handleClickOutside = (event: any) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target)
      // !topNavRef.current.contains(event.target)
    ) {
      dispatch(closeNav());
    }
  };
  useEffect(() => {
    dispatch(closeNav());
  }, [pathname]);
  useEffect(() => {
    const navState = localStorage.getItem("home-nav");
    let navstate = navState ? JSON.parse(navState) : null;
    if (navstate) {
      pathname === "/" && dispatch(setNav(navData));
      pathname !== "/" && dispatch(setNav(navState));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    // This will run only once when the app loads
    const script = document.createElement("script");
    script.src = "//code.tidio.co/your-unique-code.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(getAdminAccounts());
    const storedAccounts = localStorage.getItem("admin-account");
    let accountData = storedAccounts ? JSON.parse(storedAccounts) : null;
    if (accountData) {
      setStoredAccount(accountData);
    }
    // dispatch(reset());
  }, []);

  useEffect(() => {
    let timeout: any;

    if (showPrompt) {
      timeout = setTimeout(() => {
        setShowPrompt(false);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [showPrompt]);

  return (
    <>
      {/* <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head> */}
   <script src="//code.tidio.co/qsqp2myyqwwchzgmosabv6adxgjkybpc.js" async></script>
      <NotificationPopup />
      <div className={`app-block  ${styles.home_app_block}`}>
        <header
          className={`app-block fixed bg-[#0e1113] z-[1000] ${styles.header}`}
          ref={sideNavRef}
        >
          <Header />
          <TopWidget />
        </header>
        <div className={`page-body pt-24  ${styles.main}`}>
          {children}
          {!storedAccount
            ? ""
            : storedAccount.length && (
                <>
                  <Card
                    background={"#2cc73e"}
                    color={"#fff"}
                    position={"fixed"}
                    bottom={"4.4rem"}
                    right={"1rem"}
                    zIndex={40}
                  >
                    <Link
                      target="_blank"
                      //   href={`https://api.whatsapp.com/send?phone=17736498501&text=`}
                      href={`https://api.whatsapp.com/send?phone=${storedAccount[0].phone}&text=`}
                    >
                      <CardBody p={2}>
                        <SiWhatsapp fontSize={24} />
                      </CardBody>
                    </Link>
                  </Card>
                  <Card
                    background={"#033dfc"}
                    color={"#fff"}
                    position={"fixed"}
                    bottom={"7.4rem"}
                    right={"1rem"}
                    zIndex={40}
                  >
                    <Card
                      position={"absolute"}
                      textAlign={"center"}
                      bg={"#ffffff90"}
                      backdropFilter={"blur(2px)"}
                      transition={"500ms ease"}
                      w={44}
                      top={"-6rem"}
                      left={showPrompt ? "0rem" : "20rem"}
                    >
                      <Link
                        target="_blank"
                        //   href={`mailto:gtfxcustomerservice@outlook.com?subject=GlobalTycoonFX%20HelpME`}
                        href={`mailto:${storedAccount[0].email}`}
                      >
                        <CardBody p={2}>
                          <Text fontSize={14}>
                            Welcome to <strong>{appname}</strong>{" "}
                          </Text>

                          <Text fontSize={14}>How can we help you?</Text>
                        </CardBody>
                      </Link>
                    </Card>

                    <Link
                      target="_blank"
                      //   href={`mailto:gtfxcustomerservice@outlook.com?subject=GlobalTycoonFX%20HelpME`}
                      href={`mailto:${storedAccount[0].email}`}
                    >
                      <CardBody
                        p={2}
                        pt={3}
                        display={"flex"}
                        justifyContent={"center"}
                        gap={2}
                        h={"2.6rem"}
                        w={showPrompt ? "12rem" : "2.5rem"}
                        transition={"500ms ease"}
                        alignItems={"center"}
                      >
                        <BsChatSquareTextFill fontSize={24} />{" "}
                        {showPrompt && (
                          <Text
                            //   display={showPrompt ? "flex" : "none"}
                            fontSize={14}
                            opacity={showPrompt ? 1 : 0}
                            whiteSpace={"nowrap"}
                            transition={"opacity 500ms ease"}
                          >
                            Compose your reply
                          </Text>
                        )}
                      </CardBody>
                    </Link>
                  </Card>
                </>
              )}

          <TidioChat />
          <BottomWidget />
          <footer>
            <div className={`footer_line_through`} />
            <Footer />
          </footer>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
