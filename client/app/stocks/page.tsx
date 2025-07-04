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
          content="globaltradezella trading, globaltradezella, globaltradezella stocks, stocks globaltradezella, stocks, globaltradezella.com, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading"
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
              STOCKS
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
                src="https://www.youtube.com/embed/SNJduzbAzdY"
                title="What Exactly Are Stocks?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
                  STOCKS{" "}
                </span>
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]} textAlign={"justify"}>
                A stock is a security that represents an ownership share in a
                company. When you purchase a company's stock, you're purchasing
                a small piece of that company, called a share.
                <br />
                <br />
                Investors purchase stocks in companies they think will go up in
                value. If that happens, the company's stock increases in value
                as well. The stock can then be sold for a profit.
                <br />
                <br />
                For companies, issuing stock is a way to raise money to grow and
                invest in their business. For investors, stocks are a way to
                grow their money and outpace inflation over time. When you own
                stock in a company, you are called a shareholder because you
                share in the company's profits.
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
