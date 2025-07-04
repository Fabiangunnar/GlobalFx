"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import pagestyles from "@/app/styles/home/Main.module.scss";
import { useEffect, useRef } from "react";
import MainLayout from "../../components/layout/Mainlayout";
import CryTypo from "@/components/home/CryTypo";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import InvestWithBtn from "@/components/home/InvestWithBtn";
import { setNav } from "@/redux/features/AppSlice";
import { closeNav } from "@/redux/features/NavSlice";
import { useAppDispatch } from "@/redux/hooks";
import { appname } from "@/data/maindata";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const dispatch = useAppDispatch();
  const sideNavRef: any = useRef();

  const handleClickOutside = (event: any) => {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      dispatch(closeNav());
    }
  };
  useEffect(() => {
    const navState = localStorage.getItem("home-nav");
    let navstate = navState ? JSON.parse(navState) : null;
    if (navstate) {
      dispatch(setNav(navstate));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Head>
        <title>PLANS | {appname}</title>
        <meta
          name="description"
          content="Explore the powerful GLOBAL TRADE ZELLA trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltradezella trading, globaltradezella, globaltradezella gold, gold globaltradezella, gold, globaltradezella.com, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading"
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>
      <MainLayout>
        <main className={` ${pagestyles.body} ${pagestyles.top_head}`}>
          <div className={pagestyles.finance_body}>
            <Text
              fontWeight={200}
              className="page-intro__title"
              p={{
                sm: "4rem 0rem",
              }}
              fontSize={[36, 40, 44, 48, 52]}
            >
              GOLD
            </Text>
          </div>
        </main>
        <div
          className={`footer_line_through`}
          style={{ zIndex: 1, position: "relative" }}
        />
        <Flex
          className={` ${pagestyles.body}`}
          style={{ background: "rgb(14, 17, 19)" }}
          paddingTop={8}
        >
          <Grid w={"100%"} templateColumns={{ lg: "1fr 1fr" }} gap={8}>
            <Box w={"100%"} h={"30rem"}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/jt4zL0xdoGo"
                title="Delaware Depository - Secure Bullion Storage"
                // frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // allowfullscreen
              ></iframe>
            </Box>
            <Flex direction={"column"} gap={4}>
              <Text fontSize={[24, 26, 28, 30, 32]} textAlign={"center"}>
                ABOUT {appname}{" "}
                <span
                  style={{
                    color: "#40efeb",
                  }}
                >
                  {" "}
                  GOLD{" "}
                </span>
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]} textAlign={"justify"}>
                Since the stock markets began, gold has gained a reputation to
                have a negative correlation to stocks and a positive correlation
                when compared to inflation. However, gold’s history as a
                financial asset and store of value began long before this.
                <br />
                <br />
                Gold coins were minted and used as currency as far back as
                550BC, but gold was known as a sign of wealth long before its
                use as a currency. Treasures containing gold have been
                discovered from as early as 4000BC, so the precious metal has
                been notorious for its relevance to power and wealth for many
                millennia.
                <br />
                <br />
                Gold is one of the earliest traded assets, existing long before
                other markets like stocks and bonds. Gold trading​ offers lots
                of opportunities for investors, but it is not without its
                downfalls. Join us while we cover why people invest in gold, how
                to invest in gold and review whether or not gold is a good
                investment in recent years.
              </Text>
              <InvestWithBtn>Get Started</InvestWithBtn>
            </Flex>
          </Grid>
          <CryTypo />
        </Flex>
      </MainLayout>
    </>
  );
}
