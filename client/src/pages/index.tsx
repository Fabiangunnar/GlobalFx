import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.scss";
import pagestyles from "@/styles/home/Main.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {
  closeNav,
  resetCurrentPage,
  resetNav,
  setNav,
} from "@/redux-actions/homeNavSlice";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
  WrapItem,
  Wrap,
  Avatar,
} from "@chakra-ui/react";
import PaymentSystems from "@/components/home/PaymentSystems";
import {
  getIconComponent,
  homeBoxes,
  investmentPlans,
  investmentProposals,
  pifTraders,
  stepBoxes,
  testimonies,
  navData,
} from "@/data/maindata";
import LastData from "@/components/home/LastData";
import IconBoxes from "@/components/home/IconBoxes";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import {useRouter} from "next/router";
import {Swiper, SwiperSlide} from "swiper/react";
import {
  EffectFlip,
  Autoplay,
  EffectCube,
  EffectFade,
  EffectCoverflow,
} from "swiper";
import "swiper/css";

import Link from "next/link";
import NotificationPopup from "@/components/home/NotificationPopup";
import NumberCount, {
  NumberCountThree,
  NumberCountTwo,
} from "@/components/home/NumberCount";
import MainLayout from "./layout/Mainlayout";
import InvestWithBtn from "@/components/home/InvestWithBtn";
import {getAdminAccounts} from "@/redux-actions/HomeAppSlice";
import {RootState} from "@/redux-store/store";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const sideNavRef: any = useRef();
  const cardRef: any = useRef();
  const {adminAccounts} = useSelector((store: RootState) => store.HomeAppSlice);
  const adminAccount = adminAccounts[0];
  const [width, setWidth] = useState(540);
  const handleClickOutside = (event: any) => {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      dispatch(closeNav());
    }
  };
  useEffect(() => {
    const navState = localStorage.getItem("home-nav");
    let navstate = navState ? JSON.parse(navState) : null;
    if (navstate) {
      dispatch(setNav(navData));
    }
  }, []);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting);
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isInView]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let windowWidth = window.innerWidth;
    setWidth(window.innerWidth);
    function handleResize() {
      setWidth(windowWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <Head>
        <title>GLOBAL TYCOON FX</title>
        <meta
          name="description"
          content="the landing page of premim financial investment"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>
      <MainLayout>
        <main className={` ${pagestyles.body}`}>
          <Flex
            className={` ${pagestyles.home_top_head} ${pagestyles.top_head}`}
            direction={"column"}
            gap={[8, 10, 12, 14, 16]}
          >
            <NotificationPopup />
            <Flex position={"relative"} justify={"center"} align={"center"}>
              <Box
                zIndex={-4}
                position={"absolute"}
                h={"40rem"}
                w={"140vw"}
                top={"-4rem"}
                left={"-50%"}
              >
                <Swiper
                  centeredSlides={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  navigation={true}
                  modules={[
                    Autoplay,
                    EffectFlip,
                    EffectCube,
                    EffectFade,
                    EffectCoverflow,
                  ]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <Box w={"100%"} opacity={0.7} h={"40rem"}>
                      <Image
                        width={10000}
                        height={10000}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={"/nick.jpg"}
                        alt="image"
                      />
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box w={"100%"} opacity={0.7} h={"40rem"}>
                      <Image
                        width={10000}
                        height={10000}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={"/dylan.jpg"}
                        alt="image"
                      />
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box w={"100%"} opacity={0.7} h={"40rem"}>
                      <Image
                        width={10000}
                        height={10000}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={"/traxer.jpg"}
                        alt="image"
                      />
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box w={"100%"} opacity={0.7} h={"40rem"}>
                      <Image
                        width={10000}
                        height={10000}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={"/zoltan.jpg"}
                        alt="image"
                      />
                    </Box>
                  </SwiperSlide>
                </Swiper>
              </Box>
            </Flex>
            <Grid
              templateColumns={{
                sm: "1fr",
                lg: "1fr 1fr",
              }}
            >
              <Box
                display={{
                  sm: "none",
                  base: "none",
                  md: "none",
                  lg: "flex",
                }}
              >
                <Image width={500} height={500} src={"/robot.png"} alt={""} />
              </Box>
              <Flex
                direction={"column"}
                gap={{base: "2rem", lg: "3rem"}}
                justify={"space-between"}
                align={{base: "center", lg: "flex-start"}}
                textAlign={{base: "center", lg: "start"}}
              >
                <Flex direction={"column"} gap={4}>
                  <Text
                    fontWeight={200}
                    className="page-intro__title"
                    fontSize={[28, 32, 38, 42, 52]}
                  >
                    SAFE INVESTMENT WITH <br /> GLOBAL TYCOON FX
                  </Text>
                  <Text fontSize={[18, 20, 22, 24, 28]}>
                    <span className={pagestyles.green}>GET </span> LIFETIME
                    INCOME ON INVESTMENT
                  </Text>
                </Flex>
                <Flex w="100%" justify={{base: "center", lg: "flex-start"}}>
                  <Button
                    fontSize={[14, 15, 16, 17, 18]}
                    onClick={() => {
                      const data = localStorage.getItem("user");
                      if (data !== null) router.push("/admin");
                      if (data === null) router.push("/admin/auth");
                      dispatch(resetCurrentPage());
                      dispatch(resetNav());
                    }}
                    className={pagestyles.btn}
                  >
                    OPEN DEPOSIT
                  </Button>
                </Flex>
                <Flex w="100%">
                  <Grid
                    gap={3}
                    className={pagestyles.grid_third}
                    p={2}
                    w="100%"
                    gridTemplateColumns={{
                      base: "1fr 1fr",
                      sm: "1fr 1fr",
                      md: "1fr 1fr 1fr",
                      lg: "1fr 1fr 1fr",
                    }}
                  >
                    {homeBoxes.map((item, index) => {
                      const icon = getIconComponent(item?.icon);

                      return (
                        <Grid
                          gridTemplateRows={"0.8fr 0.4fr"}
                          textAlign={"center"}
                          px={2}
                          key={index}
                          cursor={"pointer"}
                          placeItems={"space-between"}
                        >
                          <Flex
                            className={pagestyles.grid_third_icon}
                            fontSize={[62, 66, 70, 74, 78]}
                            justify={"center"}
                            h={{sm: "6rem", md: "8rem"}}
                            align={"center"}
                          >
                            <svg
                              style={{position: "absolute"}}
                              width="20"
                              height="20"
                            >
                              <defs>
                                <linearGradient
                                  id="blue"
                                  x1="100%"
                                  y1="100%"
                                  x2="0%"
                                  y2="0%"
                                >
                                  <stop offset="5%" stopColor="#40efeb" />
                                  <stop stopColor=" #40efeb" offset="100%" />
                                </linearGradient>
                              </defs>
                            </svg>
                            {icon}
                          </Flex>

                          <Text
                            color={"gray.400"}
                            fontSize={[12, 13, 14, 15, 16]}
                          >
                            {item.desc}
                          </Text>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Flex>
              </Flex>
            </Grid>
            <Flex justify={"center"} direction={"column"} align={"center"}>
              <Card
                w={{
                  base: "100vw",
                  sm: "100vw",
                  lg: "90vw",
                }}
                background={"#0e1113"}
              >
                <CardBody display={"flex"} flexDir={"column"} gap={8}>
                  <Box w={"100%"} h={"30rem"}>
                    <iframe
                      style={{width: "100%", height: "100%"}}
                      src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212m%22%2C%22showChart%22%3Atrue%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22plotLineColorGrowing%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22symbolActiveColor%22%3A%22rgba(65%2C%20224%2C%20136%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22OANDA%3ASPX500USD%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22OANDA%3ANAS100USD%22%2C%22d%22%3A%22Nasdaq%20100%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow%2030%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADEU30%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22OANDA%3AUK100GBP%22%2C%22d%22%3A%22FTSE%20100%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Commodities%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22E-Mini%20S%26P%22%7D%2C%7B%22s%22%3A%22CME%3A6E1!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Natural%20Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Commodities%22%7D%2C%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME%3AGE1!%22%2C%22d%22%3A%22Eurodollar%22%7D%2C%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUB1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22pfi-my.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22market-overview%22%2C%22page-uri%22%3A%22pfi-my.com%2F%22%7D"
                    />
                  </Box>
                  <Text textAlign={"center"} color={"#fff"}>
                    <a
                      href="https://www.tradingview.com/"
                      rel="noopener"
                      target="_blank"
                    >
                      <span style={{color: "#2962FF"}}>Market Data</span>
                    </a>{" "}
                    by TradingView
                  </Text>
                  <Box w={"100%"} h={"30rem"}>
                    <iframe
                      scrolling="no"
                      style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                      }}
                      src="https://s.tradingview.com/embed-widget/forex-cross-rates/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A400%2C%22colorTheme%22%3A%22dark%22%2C%22currencies%22%3A%5B%22EUR%22%2C%22USD%22%2C%22JPY%22%2C%22GBP%22%2C%22CHF%22%2C%22AUD%22%2C%22CAD%22%2C%22NZD%22%2C%22CNY%22%5D%2C%22utm_source%22%3A%22pfi-my.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22forex-cross-rates%22%2C%22page-uri%22%3A%22pfi-my.com%2F%22%7D"
                    />
                  </Box>
                </CardBody>
              </Card>
            </Flex>
            <Flex
              direction={"column"}
              gap={4}
              w={"100%"}
              textAlign={"center"}
              position={"relative"}
              paddingTop={6}
              align={"center"}
              justify={"center"}
            >
              <Heading
                className={` ${pagestyles.payment_top}`}
                fontFamily={"inherit"}
                fontWeight={400}
                fontSize={[22, 24, 26, 28, 30]}
              >
                INVESTMENT PROPOSALS
              </Heading>
              <Text
                color={"gray.400"}
                fontWeight={100}
                fontSize={[12, 14, 16, 18, 20]}
              >
                GLOBAL TYCOON FX employees ensure that every investor in our
                company can earn money
              </Text>
              <Card
                w={{
                  base: "100vw",
                  sm: "100vw",
                  lg: "90vw",
                }}
                background={"rgba(99, 255, 251, 0.2)"}
              >
                <CardBody
                  display={"flex"}
                  flexDir={"column"}
                  gap={8}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text
                    className={pagestyles.green}
                    fontSize={12}
                    textAlign={"center"}
                  >
                    These are the innvestments plans with potential earnings in
                    just seven days
                    <br />
                    <br />
                  </Text>
                  <Text
                    className={pagestyles.green}
                    fontSize={[20, 21, 22, 23, 24]}
                  >
                    {" "}
                    EARNING 450% ROI
                  </Text>
                  <Flex
                    w={{base: "96vw", md: "100%"}}
                    //   h={40}s
                    align={"center"}
                    justify={"center"}
                  >
                    <Splide
                      options={{
                        rewind: true,
                        width: "100%",
                        type: "loop",
                        gap: "1rem",
                        focus: "center",
                        perPage: width >= 840 ? 2 : 1,
                        perMove: 1,
                      }}
                      hasTrack={false}
                      aria-label="..."
                    >
                      <SplideTrack>
                        {investmentPlans.map((investmentPlan) => (
                          <SplideSlide
                            key={investmentPlan.id}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "0.4rem",
                            }}
                          >
                            <Card
                              color={"#fff"}
                              cursor={"pointer"}
                              w={"calc(100% - 8px)"}
                              h={"100%"}
                              minW={"fit-content"}
                              _hover={{
                                background: `#40efeb`,
                                color: "#000",
                              }}
                              bg={
                                "linear-gradient(90deg, #40efeb30, #9ed16330)"
                              }
                            >
                              <CardBody>
                                <Flex
                                  justify={"space-between"}
                                  align={"center"}
                                >
                                  <Text fontSize={[40, 44, 38, 42, 46]}>
                                    {investmentPlan.percentage}
                                  </Text>
                                  <Box fontSize={[12, 14, 12, 18, 20]}>
                                    {investmentPlan.plan}
                                  </Box>
                                </Flex>
                                <Divider marginBlock={4} paddingBottom={0} />
                                <Flex
                                  justify={"space-between"}
                                  gap={1}
                                  align={"center"}
                                >
                                  <Text fontSize={[14, 16, 18, 20, 22]}>
                                    Duration
                                  </Text>
                                  <Box fontSize={[12, 14, 16, 18, 20]}>
                                    {investmentPlan.timeLine}
                                  </Box>
                                </Flex>

                                <Flex
                                  justify={"space-between"}
                                  gap={1}
                                  align={"center"}
                                >
                                  <Text fontSize={[12, 14, 16, 18]}>
                                    MIN DEPOSIT
                                  </Text>
                                  <Box
                                    whiteSpace={"nowrap"}
                                    fontSize={[12, 14, 14, 18, 20]}
                                  >
                                    {investmentPlan.min}
                                  </Box>
                                </Flex>
                                <Divider marginBlock={1} paddingBottom={0} />
                                <Flex
                                  justify={"space-between"}
                                  gap={1}
                                  align={"center"}
                                >
                                  <Text fontSize={[12, 14, 16, 18]}>
                                    Proposals
                                  </Text>
                                </Flex>
                                <Divider marginBlock={1} paddingBottom={0} />

                                <Flex
                                  justify={"flex-end"}
                                  gap={1}
                                  align={"center"}
                                >
                                  <Text fontSize={[12, 14, 16, 18]}>
                                    {investmentPlan.prop1}
                                  </Text>
                                </Flex>
                                <Flex
                                  justify={"flex-end"}
                                  gap={1}
                                  align={"center"}
                                >
                                  <Box
                                    whiteSpace={"nowrap"}
                                    fontSize={[12, 14, 14, 18, 20]}
                                  >
                                    {investmentPlan.prop2}
                                  </Box>
                                </Flex>
                                <Flex
                                  justify={"flex-end"}
                                  gap={1}
                                  align={"center"}
                                >
                                  <Text fontSize={[12, 14, 16, 18]}>
                                    {investmentPlan.prop3}
                                  </Text>
                                </Flex>
                                <Flex
                                  justify={"flex-end"}
                                  gap={1}
                                  align={"center"}
                                >
                                  <Box
                                    whiteSpace={"nowrap"}
                                    fontSize={[12, 14, 14, 18, 20]}
                                  >
                                    {investmentPlan?.prop4}
                                  </Box>
                                </Flex>
                              </CardBody>
                            </Card>
                          </SplideSlide>
                        ))}
                      </SplideTrack>
                    </Splide>
                  </Flex>
                  <Grid gap={2} templateColumns={{sm: "1fr", lg: "1fr 1fr"}}>
                    <Flex direction="column">
                      {investmentProposals.map((investmentProposal) => (
                        <Flex
                          p={4}
                          paddingLeft={8}
                          color={"#fff"}
                          direction="column"
                          textAlign={"start"}
                          gap={2}
                          key={investmentProposal.id}
                        >
                          <Text
                            className={` ${pagestyles.proposal_head}`}
                            fontWeight={600}
                            fontSize={[14, 18, 20, 21, 22]}
                          >
                            {investmentProposal.head}
                          </Text>
                          <Text
                            fontSize={[10, 11, 12, 13, 14]}
                            fontWeight={100}
                          >
                            <span style={{color: "rgb(105, 226, 176)"}}>
                              {investmentProposal.percentage}
                            </span>
                            <span style={{color: "#c4c4c4"}}>
                              {" "}
                              {investmentProposal.desc}
                            </span>
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                    <Card
                      color={"#fff"}
                      p={2}
                      textAlign={"start"}
                      bg={"linear-gradient(180deg,#2b525a,#072427)"}
                    >
                      <CardBody>
                        <Flex direction="column" gap={4}>
                          <Text
                            fontSize={[20, 21, 22, 23, 24]}
                            bgGradient="linear-gradient(90deg, #40efeb, #9ed163)"
                            bgClip="text"
                          >
                            GENERAL COMMISSIONS
                          </Text>
                          <Text
                            fontSize={[12, 13, 14, 15, 16]}
                            fontWeight={100}
                          >
                            These commissions are charged by GLOBAL TYCOON FX
                            for the platform to work. They are not related to
                            the profit received by our investors
                          </Text>
                        </Flex>
                      </CardBody>
                    </Card>
                  </Grid>
                </CardBody>
              </Card>
            </Flex>
            <Flex
              direction={"column"}
              gap={{base: "4rem", lg: "2rem"}}
              justify={"center"}
              align={"center"}
              textAlign={{base: "center", lg: "start"}}
              className={` ${pagestyles.about_top_head} ${pagestyles.top_head}`}
            >
              <Flex
                direction={"column"}
                gap={4}
                w={"100%"}
                textAlign={"center"}
                paddingTop={6}
              >
                <Heading
                  className={` ${pagestyles.payment_top}`}
                  fontFamily={"inherit"}
                  fontWeight={400}
                  fontSize={[22, 24, 26, 28, 30]}
                >
                  BEST GLOBAL TYCOON FX TRADERS
                </Heading>
                <Text
                  color={"gray.400"}
                  fontWeight={100}
                  fontSize={[12, 14, 16, 18, 20]}
                >
                  The best cryptocurrency developers works in our company. They
                  have a wealth of experience and understanding of the crypto
                  market behind them. They brought GLOBAL TYCOON FX to the world
                  level of development
                </Text>
              </Flex>
              <Flex
                w={{base: "94vw", md: "100%"}}
                //   h={40}s
                align={"center"}
                justify={"center"}
              >
                <Splide
                  hasTrack={false}
                  options={{
                    rewind: true,
                    width: "100%",
                    type: "loop",
                    gap: "2rem",
                    focus: "center",
                    perPage: width >= 840 ? 2 : 1,
                    perMove: 1,
                  }}
                  aria-label="..."
                >
                  <SplideTrack>
                    {pifTraders.map((pifTrader) => (
                      <SplideSlide
                        key={pifTrader.id}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          padding: "3.4rem 0.4rem",
                        }}
                      >
                        <Card
                          color={"#fff"}
                          h={"100%"}
                          minW={"fit-content"}
                          w={"calc(100% - 8px)"}
                          position={"relative"}
                          paddingBlock={2}
                          bg={"linear-gradient(180deg,#2b525a,#072427)"}
                        >
                          <Flex
                            width={"100%"}
                            height={"2rem"}
                            position={"relative"}
                            justify={"center"}
                            align={"center"}
                            transform={"translateY(-2rem)"}
                          >
                            <Box width={"8rem"} position={"absolute"}>
                              <Image
                                src={`${pifTrader.img}`}
                                alt={""}
                                width={200}
                                height={200}
                              />
                            </Box>
                          </Flex>
                          <CardBody
                            display={"flex"}
                            gap={2}
                            flexDir={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                          >
                            <Text fontSize={[14, 18, 20, 21, 22]}>
                              {pifTrader.head}
                            </Text>
                            <Text
                              textAlign={"justify"}
                              fontSize={[12, 12, 12, 13, 14]}
                            >
                              {pifTrader.desc}
                            </Text>
                          </CardBody>
                        </Card>
                      </SplideSlide>
                    ))}
                  </SplideTrack>
                </Splide>{" "}
              </Flex>

              <InvestWithBtn>
                INVEST WITH US AND GET STABLE INCOME
              </InvestWithBtn>
            </Flex>
            <Card
              w={"100%"}
              p={{md: "2rem", sm: "0.5rem"}}
              bg={"#00000020"}
              backdropBlur={200}
              color={"#fff"}
              border={"1px solid rgba(99, 255, 251, 0.2) "}
            >
              <CardBody>
                <Grid
                  templateColumns={{
                    lg: "1fr 1fr",
                    md: "1fr",
                    sm: "1fr",
                  }}
                  gap={8}
                >
                  <Flex
                    gridColumn={{
                      lg: "2 / 2",
                    }}
                    direction={"column"}
                    gap={8}
                    textAlign={"start"}
                  >
                    <Flex direction={"column"} gap={4}>
                      <Heading
                        fontFamily={"inherit"}
                        pointerEvents={"none"}
                        fontWeight={400}
                        fontSize={[28, 32, 38, 42, 52]}
                      >
                        OFFICIAL REGISTERED <strong>COMPANY</strong>
                      </Heading>
                      <Text
                        fontSize={[16, 18, 20, 22, 24]}
                        bgGradient="linear-gradient(90deg, #40efeb, #9ed163)"
                        bgClip="text"
                      >
                        #13699699
                      </Text>
                      <Flex
                        fontFamily={"inherit"}
                        pointerEvents={"none"}
                        fontWeight={400}
                        align={"center"}
                        justify={"space-between"}
                        gap={1}
                        fontSize={[20, 22, 24, 26, 28]}
                      >
                        GLOBAL TYCOON FX - UK LEGAL REGISTRATION {"- "}
                        <Text
                          cursor={"pointer"}
                          fontSize={[16, 18, 20, 22, 24]}
                          color={"rgb(105, 226, 176)"}
                        >
                          {" "}
                          №13699699
                        </Text>
                      </Flex>
                      <Text fontSize={[12, 14, 15, 16, 18]} color={"gray.300"}>
                        The unique development of our company has an official
                        legal registration. You can check this information by
                        clicking on the registration number.
                      </Text>
                    </Flex>
                    <Grid gap={4} w={"100%"} ref={cardRef}>
                      <Card
                        bgGradient={"linear-gradient(90deg, #4dfffc, #bfff76);"}
                      >
                        <CardBody display={"flex"} flexDir={"column"} gap={2}>
                          <Text fontSize={16} fontWeight={600}>
                            Days in Week:
                          </Text>
                          <Text fontSize={22} fontWeight={800}>
                            712
                          </Text>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody display={"flex"} flexDir={"column"} gap={2}>
                          <Text fontSize={16} fontWeight={600}>
                            Total Members:
                          </Text>
                          <Text fontSize={22} fontWeight={800}>
                            <NumberCountTwo
                              targetNumber={89650}
                              isInView={isInView}
                            />
                          </Text>
                        </CardBody>
                      </Card>
                      <Card bg={"linear-gradient(180deg,#2b525a,#072427)"}>
                        <CardBody>
                          <Grid
                            templateColumns={{base: "1fr", sm: "1fr 1fr"}}
                            gap={2}
                          >
                            <Box>
                              <Text
                                color={"#fff"}
                                fontSize={16}
                                fontWeight={600}
                              >
                                Total Invested
                              </Text>
                              <Text
                                fontSize={22}
                                bgClip="text"
                                bgGradient=" linear-gradient(90deg, #40efeb, #9ed163)"
                                fontWeight={800}
                              >
                                <NumberCountThree
                                  targetNumber={338400989}
                                  isInView={isInView}
                                />{" "}
                                USD
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                color={"#fff"}
                                fontSize={16}
                                fontWeight={600}
                              >
                                Total Paid
                              </Text>
                              <Text
                                fontSize={22}
                                bgClip="text"
                                bgGradient=" linear-gradient(90deg, #40efeb, #9ed163)"
                                fontWeight={800}
                              >
                                <NumberCount
                                  targetNumber={101689885}
                                  isInView={isInView}
                                />{" "}
                                USD
                              </Text>
                            </Box>
                          </Grid>
                        </CardBody>
                      </Card>
                    </Grid>
                  </Flex>
                  <Flex
                    gridColumn={{
                      lg: "1 / 2",
                    }}
                    gridRow={{
                      lg: "1 / 1",
                    }}
                    direction={"column"}
                    gap={8}
                  >
                    <Flex w={"100%"} justify={"center"}>
                      <Image
                        src={"/certi.png"}
                        alt={""}
                        width={500}
                        height={500}
                      />
                    </Flex>
                    <Flex direction={"column"} gap={2}>
                      <Grid
                        templateColumns={"1fr 3fr"}
                        justifyContent={"flex-start"}
                        gap={12}
                        alignItems={"flex-start"}
                      >
                        <Text fontSize={[14, 15, 16, 17, 18]}>Reg name:</Text>
                        <Text
                          fontSize={[12, 13, 14, 15, 16]}
                          color={"gray.400"}
                        >
                          GLOBAL TYCOON FX LTD
                        </Text>
                      </Grid>
                      <Grid
                        templateColumns={"1fr 3fr"}
                        justifyContent={"flex-start"}
                        gap={12}
                        alignItems={"flex-start"}
                      >
                        <Text fontSize={[14, 15, 16, 17, 18]}>Number:</Text>
                        <Text
                          fontSize={[12, 13, 14, 15, 16]}
                          textDecoration={"underline"}
                          color={"rgb(105, 226, 176)"}
                        >
                          #13699699
                        </Text>
                      </Grid>
                      <Grid
                        templateColumns={"1fr 2.4fr"}
                        justifyContent={"flex-start"}
                        gap={2}
                        alignItems={"flex-start"}
                      >
                        <Text fontSize={[14, 15, 16, 17, 18]}>
                          Official address:
                        </Text>
                        <Link
                          target="_blank"
                          //   href={`mailto:gtfxcustomerservice@outlook.com?subject=GlobalTycoonFX%20HelpME`}
                          href={`https://www.google.com/maps/search/United+Kingdom+Level+9,+One+Canada+Square,+Canary+Wharf,+E14+5AA,+London,+United+Kingdom/@51.5049697,-0.0221382,17z/data=!3m1!4b1?entry=ttu`}
                        >
                          <Text
                            fontSize={[12, 13, 14, 15, 16]}
                            color={"gray.400"}
                          >
                            United Kingdom Level 9, One Canada Square, Canary
                            Wharf, E14 5AA, London, United Kingdom
                          </Text>
                        </Link>
                      </Grid>
                    </Flex>
                  </Flex>
                </Grid>
              </CardBody>
            </Card>
            <LastData />
            <Flex
              direction={"column"}
              gap={4}
              w={"100%"}
              align={"center"}
              justify={"center"}
              textAlign={"center"}
              paddingTop={6}
            >
              <Heading
                className={` ${pagestyles.payment_top}`}
                fontFamily={"inherit"}
                fontWeight={400}
                fontSize={[22, 24, 26, 28, 30]}
              >
                3 STEPS TO START
              </Heading>
              <Flex
                w={{base: "96vw", md: "100%"}}
                //   h={40}s
                align={"center"}
                justify={"center"}
              >
                <Splide
                  hasTrack={false}
                  options={{
                    rewind: true,
                    width: "100%",
                    type: "loop",
                    gap: "2rem",
                    focus: "center",
                    perPage: width >= 840 ? 2 : 1,
                    perMove: 1,
                  }}
                  aria-label="..."
                >
                  <SplideTrack>
                    {stepBoxes.map((stepBox) => (
                      <SplideSlide
                        key={stepBox.id}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0.4rem",
                        }}
                      >
                        <Card
                          color={"#fff"}
                          position={"relative"}
                          h={"100%"}
                          paddingBlock={4}
                          paddingInline={2}
                          // bg={"linear-gradient(180deg,#2b525a,#072427)"}
                          border={"1px solid #2b525a"}
                          bg={"rgba(0, 0, 0, 0.3)"}
                        >
                          <CardBody
                            display={"flex"}
                            gap={2}
                            flexDir={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                          >
                            <Text
                              bgGradient=" linear-gradient(90deg, #40efeb, #9ed163)"
                              bgClip="text"
                              fontSize={[18, 20, 21, 22, 24]}
                            >
                              {stepBox.step}
                            </Text>
                            <Text fontSize={[18, 20, 21, 22, 24]}>
                              {stepBox.head}
                            </Text>
                            <Text
                              textAlign={"start"}
                              fontSize={[14, 15, 16, 17, 18]}
                            >
                              {stepBox.desc}
                            </Text>
                          </CardBody>
                        </Card>
                      </SplideSlide>
                    ))}
                  </SplideTrack>
                </Splide>
              </Flex>
              {/* <Grid
                  gap={{base: "2rem", md: "1rem"}}
                  w={{
                    base: "100%",
                    sm: "100%",
                    md: "100vw",
                    lg: "100%",
                  }}
                  p={4}
                  paddingBlock={8}
                  templateColumns={{
                    sm: "1fr ",
                    md: "1fr 1fr 1fr",
                    lg: "1fr 1fr 1fr",
                  }}
                >
                  {stepBoxes.map((stepBox) => (
                    <Card
                      key={stepBox.id}
                      color={"#fff"}
                      position={"relative"}
                      paddingBlock={4}
                      paddingInline={2}
                      bg={"linear-gradient(180deg,#2b525a,#072427)"}
                    >
                      <CardBody
                        display={"flex"}
                        gap={2}
                        flexDir={"column"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                      >
                        <Text
                          bgGradient=" linear-gradient(90deg, #40efeb, #9ed163)"
                          bgClip="text"
                          fontSize={[18, 20, 21, 22, 24]}
                        >
                          {stepBox.step}
                        </Text>
                        <Text fontSize={[18, 20, 21, 22, 24]}>
                          {stepBox.head}
                        </Text>
                        <Text
                          textAlign={"justify"}
                          fontSize={[12, 12, 12, 13, 14]}
                        >
                          {stepBox.desc}
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </Grid> */}
            </Flex>
            <Flex
              direction={"column"}
              gap={4}
              w={"100%"}
              textAlign={"center"}
              paddingTop={6}
            >
              <Heading
                className={` ${pagestyles.payment_top}`}
                fontFamily={"inherit"}
                fontWeight={400}
                fontSize={[22, 24, 26, 28, 30]}
              >
                REFERRAL PROGRAM
              </Heading>
              <Text
                color={"gray.400"}
                fontWeight={100}
                fontSize={[12, 14, 16, 18, 20]}
              >
                Anyone can take part in the affiliate program. It allows you to
                receive generous rewards by inviting new members
              </Text>
            </Flex>
            <Flex
              direction={"column"}
              gap={4}
              w={"100%"}
              textAlign={"center"}
              paddingTop={6}
              className={` ${pagestyles.about2_top_head}  ${pagestyles.top_head}`}
            >
              <Heading
                className={` ${pagestyles.payment_top}`}
                fontFamily={"inherit"}
                fontWeight={400}
                fontSize={[22, 24, 26, 28, 30]}
              >
                4 LEVELS OF REFERRAL PROGRAM
              </Heading>
              <Text
                color={"gray.400"}
                fontWeight={100}
                fontSize={[12, 14, 16, 18, 20]}
              >
                Get extra profit when people in your structure invite new
                investors to the company
              </Text>
            </Flex>
            <IconBoxes boxTwo={true} />
            <PaymentSystems />
            <Flex
              position={"relative"}
              align={"center"}
              justify={"center"}
              direction={"column"}
              gap={4}
              w={"100%"}
              textAlign={"center"}
              paddingTop={6}
              paddingInline={4}
            >
              <Heading
                className={` ${pagestyles.payment_top}`}
                fontFamily={"inherit"}
                fontWeight={400}
                fontSize={[22, 24, 26, 28, 30]}
              >
                Testimonies
              </Heading>
              <Box
                w={{
                  base: "100vw",
                  sm: "100vw",
                  md: "100%",
                  lg: "90vw",
                }}
                padding={4}
              >
                <Splide
                  options={{
                    rewind: true,
                    width: "100%",
                    type: "loop",
                    gap: "1rem",
                    focus: "center",
                    perPage: width >= 840 ? 2 : 1,
                    perMove: 1,
                  }}
                  hasTrack={false}
                  aria-label="..."
                >
                  <SplideTrack>
                    {testimonies.map((testimony) => (
                      <SplideSlide key={testimony.id}>
                        <Card
                          key={testimony.id}
                          height={"100%"}
                          color={"#fff"}
                          position={"relative"}
                          padding={2}
                          border={"1px solid #2b525a"}
                          bg={"rgba(0, 0, 0, 0.3)"}
                        >
                          <CardBody gap={1} display={"grid"}>
                            <Flex wrap="wrap" direction={"column"} gap={2}>
                              <Link
                                href={testimony.instagram}
                                target="_blank"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",

                                  gap: "1rem",
                                }}
                              >
                                <Flex align={"center"} gap={4}>
                                  <Wrap minW={"4.2rem"} h={"4.2rem"}>
                                    <WrapItem>
                                      <Avatar
                                        size={"lg"}
                                        name="A B"
                                        src={testimony.img}
                                      />
                                    </WrapItem>
                                  </Wrap>
                                  <Box>
                                    <Text
                                      className={pagestyles.green}
                                      fontSize={[14, 15, 16, 17, 18]}
                                    >
                                      {testimony.name}
                                    </Text>
                                    <Text
                                      bgGradient=" linear-gradient(90deg, #8ffffc, #e0ffbd)"
                                      bgClip="text"
                                      fontSize={[12, 13, 14, 15, 16]}
                                    >
                                      {testimony.igname}
                                    </Text>
                                  </Box>
                                </Flex>{" "}
                              </Link>
                              <Box
                                textAlign={"start"}
                                flex="1"
                                fontSize={[12, 13, 14, 15, 16]}
                              >
                                <p>{testimony.testimony}</p>
                              </Box>

                              <Card
                                bg={"transparent"}
                                bgGradient={
                                  " linear-gradient(41deg, rgba(158,209,99,0.1) 0%, rgba(64,239,235,0.2) 100%)"
                                }
                                color={"#fff"}
                              >
                                <CardBody
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  gap={1}
                                  alignItems={{
                                    base: "flex-start",
                                    sm: "center",
                                  }}
                                  flexDirection={{base: "column", sm: "row"}}
                                >
                                  <Box fontSize={[12, 13, 14]}>
                                    Account Manager
                                  </Box>
                                  <Link
                                    href={testimony?.traderinstagram}
                                    target="_blank"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",

                                      gap: "1rem",
                                    }}
                                  >
                                    <Flex align={"center"} gap={4}>
                                      <Box>
                                        <Text
                                          className={pagestyles.green}
                                          fontSize={[12, 13, 14, 15, 16]}
                                        >
                                          {testimony?.tradeername}
                                        </Text>
                                        <Text
                                          bgGradient=" linear-gradient(90deg, #8ffffc, #e0ffbd)"
                                          bgClip="text"
                                          fontSize={[10, 11, 12, 13, 14]}
                                        >
                                          {testimony?.traderigname}
                                        </Text>
                                      </Box>
                                      <Wrap minW={"2.4rem"} h={"2rem"}>
                                        <WrapItem>
                                          <Avatar
                                            size={"sm"}
                                            name="A B"
                                            src={testimony?.traderimg}
                                          />
                                        </WrapItem>
                                      </Wrap>
                                    </Flex>{" "}
                                  </Link>
                                </CardBody>
                              </Card>
                            </Flex>
                          </CardBody>
                        </Card>
                      </SplideSlide>
                    ))}
                  </SplideTrack>
                </Splide>
                {/* {testimonies.map((testimony) => (
                    <Card
                      key={testimony.id}
                      color={"#fff"}
                      position={"relative"}
                      padding={2}
                      bg={"linear-gradient(180deg,#2b525a,#072427)"}
                    >
                      <CardBody gap={1} display={"grid"}>
                        <Flex wrap="wrap" gap={2}>
                          <Wrap minW={"4.2rem"} h={"4.2rem"}>
                            <WrapItem>
                              <Avatar
                                size={"lg"}
                                name="Dan Abrahmov"
                                src={testimony.img}
                              />
                            </WrapItem>
                          </Wrap>
                          <Box flex="1" fontSize={[12, 13, 14, 15, 16]}>
                            <p>{testimony.testimony}</p>
                          </Box>
                        </Flex>
                        <Text
                          bgGradient=" linear-gradient(90deg, #40efeb, #9ed163)"
                          bgClip="text"
                          fontSize={[14, 15, 16, 17, 18]}
                        >
                          {testimony.name}
                        </Text>
                        <Link
                          href={testimony.instagram}
                          target="_blank"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",

                            gap: "1rem",
                          }}
                        >
                          <Text fontSize={[12, 13, 14]}>
                            Text me on instagram
                          </Text>
                          <CiInstagram fontSize={24} />
                        </Link>
                      </CardBody>
                    </Card>
                  ))} */}
              </Box>
            </Flex>
          </Flex>
        </main>
      </MainLayout>
    </>
  );
}
