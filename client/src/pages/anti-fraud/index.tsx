import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.scss";
import pagestyles from "@/styles/home/Main.module.scss";
import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {closeNav, setNav} from "@/redux-actions/homeNavSlice";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import {Card, CardBody, Flex, Grid, Heading, Text} from "@chakra-ui/react";
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
import BottomWidget from "@/components/pages/BottomWidget";
import TopWidget from "@/components/pages/TopWidget";
import {useRouter} from "next/router";
import {Swiper, SwiperSlide} from "swiper/react";
import {
  Navigation,
  Virtual,
  Scrollbar,
  A11y,
  EffectFlip,
  Autoplay,
  EffectCube,
  EffectFade,
  EffectCoverflow,
  Pagination,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-flip";
import Link from "next/link";
import {CiInstagram} from "react-icons/ci";
import NotificationPopup from "@/components/home/NotificationPopup";
import {SiWhatsapp} from "react-icons/si";
import NumberCount, {
  NumberCountThree,
  NumberCountTwo,
} from "@/components/home/NumberCount";
import MainLayout from "../layout/Mainlayout";

// import "swiper/css/pagination";
// import "swiper/css/bundle";
const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const dispatch = useDispatch();
  const sideNavRef: any = useRef();

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
    const navState = localStorage.getItem("home-nav");
    let navstate = navState ? JSON.parse(navState) : null;
    if (navstate) {
      dispatch(setNav(navData));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const header = {
    title: "MAX",
    description: "",
  };
  return (
    <>
      <Head>
        <title>ANTI-FRAUD | GLOBAL TYCOON FX</title>
        <meta name="description" content="My page is here" />

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
            <Grid gap={4}>
              <Heading
                fontFamily={"inherit"}
                pointerEvents={"none"}
                fontWeight={400}
                fontSize={[24, 26, 28, 32, 34]}
              >
                GLOBAL TYCOON FX Anti-Fraud Notice
              </Heading>
              <Text fontSize={[12, 14, 15, 16, 18]}>
                GLOBAL TYCOON FX ("GTFX") would like to alert you to the risk of
                websites which may impersonate GTFX. These fraudulent websites
                may try to swindle clients out of money and personal
                information, such as identification documents. These fraudulent
                websites may attempt to mimic the "look and feel" of an GTFX
                website by using similar branding, logos, design or content. To
                be clear, GTFX official website is www.globaltycoon.com. While
                GTFX does have additional website domains, it does not have any
                connection or affiliation with third-party websites and/or
                companies. Members of the public should be alerted to the
                possibility of scams and should always exercise care in giving
                out personal data and information.
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]}>
                Regulatory and law enforcement agencies maintain online lists of
                potentially fraudulent website. For more information on websites
                that have been reported to, or investigated by, regulators or
                law enforcement agencies as potentially fraudulent, please refer
                to these agencies' websites.
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]}>
                If you suspect that fraudulent activity or irregularities may
                have occurred with respect to your account(s), please contact
                GTFX Client Services immediately.
              </Text>
            </Grid>
            <Flex justify={"center"} align={"center"}>
              <Flex justify={"center"} align={"center"} w={"100vw"}>
                <Card
                  w={{
                    base: "100vw",
                    sm: "100vw",
                    lg: "90vw",
                  }}
                  bg={"#00000020"}
                  color={"#fff"}
                  border={"1px solid rgba(99, 255, 251, 0.2) "}
                >
                  <CardBody display={"flex"} flexDir={"column"} gap={8}>
                    <Text fontSize={[12, 14, 15, 16, 18]}>
                      Pursuant to the Treasury Laws Amendment (Design and
                      Distribution Obligations and Product Intervention Powers)
                      Act 2019, GLOBAL TYCOON FX. Ltd. has prepared the
                      following target market determinations relating to certain
                      financial products for which it is deemed to be the
                      issuer. Our Target Market Determinations are located here:
                      Target Market Determinations.
                    </Text>
                    <Text fontSize={[12, 14, 15, 16, 18]}>
                      Product Disclosure Statements are also available for each
                      of these products. You should carefully consider these
                      Disclosures in deciding whether to acquire, or to continue
                      to hold, the relevant financial product.
                    </Text>
                  </CardBody>
                </Card>
              </Flex>
            </Flex>
            <Grid gap={2}>
              <Text fontSize={[12, 14, 15, 16, 18]}>
                The risk of loss in online trading of stocks, options, futures,
                forex, foreign equities, and fixed Income can be substantial.
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]}>
                Options involve risk and are not suitable for all investors. For
                more information read the Characteristics and Risks of
                Standardized Options, also known as the options disclosure
                document (ODD). Alternatively, please contact IB Customer
                Service to receive a copy of the ODD. Before trading, clients
                must read the relevant risk disclosure statements on our
                Warnings and Disclosures page. Trading on margin is only for
                experienced investors with high risk tolerance. You may lose
                more than your initial investment.
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]}>
                For additional information about rates on margin loans, please
                see Margin Loan Rates. Security futures involve a high degree of
                risk and are not suitable for all investors. The amount you may
                lose may be greater than your initial investment. Before trading
                security futures, read the Security Futures Risk Disclosure
                Statement. Structured products and fixed income products such as
                bonds are complex products that are more risky and are not
                suitable for all investors. Before trading, please read the Risk
                Warning and Disclosure Statement.
              </Text>
            </Grid>
          </Flex>
        </main>
      </MainLayout>
    </>
  );
}
