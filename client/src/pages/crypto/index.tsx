import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import pagestyles from "@/styles/home/Main.module.scss";
import {useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {closeNav, setNav} from "@/redux-actions/homeNavSlice";
import MainLayout from "../layout/Mainlayout";
import CryTypo from "@/components/home/CryTypo";
import {Box, Flex, Grid, Text} from "@chakra-ui/react";
import InvestWithBtn from "@/components/home/InvestWithBtn";

const inter = Inter({subsets: ["latin"]});

export default function Index() {
  const dispatch = useDispatch();
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
        <title>PLANS | GLOBAL TYCOON FX</title>
        <meta
          name="description"
          content="Explore the powerful globaltycoonfx trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltycoonfx trading, globaltycoonfx, globaltycoonfx crypto, crypto globaltycoonfx, crypto, globaltycoonfx.com, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading"
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
              CRYPTO
            </Text>
          </div>
        </main>
        <div
          className={`footer_line_through`}
          style={{zIndex: 1, position: "relative"}}
        />
        <Flex
          className={` ${pagestyles.body}`}
          style={{background: "rgb(14, 17, 19)"}}
          paddingTop={8}
        >
          <Grid w={"100%"} templateColumns={{lg: "1fr 1fr"}} gap={8}>
            <Box w={"100%"} h={"30rem"}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/rYQgy8QDEBI"
                title="How Cryptocurrency ACTUALLY works."
                // framerBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // allowfullscreen
              ></iframe>
            </Box>
            <Flex direction={"column"} gap={4}>
              <Text fontSize={[24, 26, 28, 30, 32]} textAlign={"center"}>
                ABOUT GLOBAL TYCOON FX{" "}
                <span
                  style={{
                    color: "#40efeb",
                  }}
                >
                  {" "}
                  CRYPTO{" "}
                </span>
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]} textAlign={"justify"}>
                The most popular cryptocurrencies, by market capitalization, are
                Bitcoin, Ethereum, Bitcoin Cash and Litecoin. Other well-known
                cryptocurrencies include Tezos, EOS, and ZCash. Some are similar
                to Bitcoin. Others are based on different technologies, or have
                new features that allow them to do more than transfer value.
                Crypto makes it possible to transfer value online without the
                need for a middleman like a bank or payment processor, allowing
                value to transfer globally, near-instantly, 24/7, for low fees.
                <br />
                <br />
                Cryptocurrencies have become increasingly popular over the past
                several years - as of 2018, there were more than 1,600 of them!
                And the number is constantly growing. With that has come to an
                increase in demand for developers of the blockchain (the
                underlying technology of cryptocurrencies such as bitcoin). The
                salaries blockchain developers earn show how much they are
                valued: According to Indeed, the average salary of a full-stack
                developer is more than $112,000. There’s even a dedicated
                website for cryptocurrency jobs.
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
