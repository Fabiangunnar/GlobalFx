"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/app/styles/Home.module.scss";
import pagestyles from "@/app/styles/home/Main.module.scss";

import { Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import PaymentSystems from "@/components/home/PaymentSystems";
import MainLayout from "../../components/layout/Mainlayout";
import { appname } from "@/data/maindata";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <>
      <Head>
        <title>Investments</title>
        <meta
          name="description"
          content="Explore the powerful globaltycoonfx trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltycoonfx trading, globaltycoonfx, globaltycoonfx investments, investments globaltycoonfx, investments, investment, globaltycoonfx.com, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading"
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>
      <MainLayout>
        <main className={` ${pagestyles.body}`}>
          <div
            className={` ${pagestyles.investments_top_head} ${pagestyles.top_head}`}
          >
            <Flex
              direction={"column"}
              gap={[7, 8, 9, 10, 12]}
              textAlign={{ base: "center", lg: "start", xl: "start" }}
              className={` ${pagestyles.about_top_head} ${pagestyles.top_head}`}
            >
              <Text fontSize={[28, 32, 38, 42, 52]}>
                RELIABLE INVESTMENT WITH <br /> {appname}
              </Text>
              <Flex
                direction={"column"}
                gap={[5, 6, 7, 8, 9]}
                w={"100%"}
                textAlign={{ base: "center", lg: "start", xl: "start" }}
              >
                <Text
                  color={"rgb(105, 226, 176)"}
                  fontSize={[28, 30, 34, 38, 42]}
                >
                  INVESTMENTS
                </Text>
                <Text
                  color={"rgb(105, 226, 176)"}
                  fontWeight={"700"}
                  fontSize={[22, 26, 30, 34, 38]}
                >
                  GET LIFE INCOME
                </Text>
              </Flex>

              <Flex
                direction={"column"}
                className={` ${pagestyles.about_top_text_box}`}
              >
                <Text
                  textAlign={"center"}
                  fontSize={[16, 18, 20, 22, 24]}
                  p={12}
                >
                  {appname} MARKETING PLAN
                </Text>
                <Text fontSize={[12, 14, 15, 16, 18]} textAlign={"justify"}>
                  {appname} developers have created a unique cryptocurrency
                  robot. It predicts the value of Bitcoin while generating daily
                  profit on trades. The {appname} robot is able to benefit at
                  any stage of the market: both growth and decline. <br />
                  {appname} CFO has developed a unique marketing plan for the
                  platform to function fully. The Investors of our company have
                  an excellent opportunity to receive financial benefits on
                  stable terms. You can also use the profitability calculator.
                  It will calculate the exact return on your investment.
                </Text>
              </Flex>
            </Flex>
          </div>
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
              fontSize={[24, 26, 28, 30, 32]}
            >
              INVESTMENT PROPOSALS
            </Heading>
            <Text
              color={"gray.400"}
              fontWeight={100}
              fontSize={[14, 16, 18, 20, 22]}
            >
              {appname} employees ensures every investor with our company earns
              money
            </Text>
          </Flex>

          <PaymentSystems />
        </main>
      </MainLayout>
    </>
  );
}
