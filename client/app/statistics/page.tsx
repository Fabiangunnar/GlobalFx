"use client";
import Head from "next/head";

import pagestyles from "@/app/styles/home/Main.module.scss";

import { Flex, Text, Button } from "@chakra-ui/react";
import LastData from "@/components/home/LastData";
import IconBoxes from "@/components/home/IconBoxes";
import { useRouter } from "next/navigation";
import MainLayout from "../../components/layout/Mainlayout";

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Statistics</title>
        <meta
          name="description"
          content="Explore the powerful GLOBAL TRADE ZELLA trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltradezella trading, globaltradezella, globaltradezella statistics, statistics globaltradezella, statistics, globaltradezella.com, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading"
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>
      <MainLayout>
        <main className={` ${pagestyles.body}`}>
          <Flex
            direction={"column"}
            gap={6}
            className={` ${pagestyles.statistics_top_head} ${pagestyles.top_head}`}
          >
            <Flex
              direction={{ base: "column", lg: "row" }}
              gap={8}
              justify={"space-between"}
              align={"center"}
              textAlign={{ base: "center", lg: "start" }}
              className={` ${pagestyles.about_top_head} ${pagestyles.top_head}`}
            >
              <Flex direction={"column"} gap={4}>
                <Text
                  fontWeight={200}
                  className="page-intro__title"
                  fontSize={[32, 38, 42, 48, 52]}
                >
                  OUR CLIENTS ARE ALREADY <br /> MAKING MONEY
                </Text>
                <Text
                  fontSize={[18, 20, 22, 24, 28]}
                  color={"rgb(105, 226, 176)"}
                >
                  GET LIFE INCOME
                </Text>
              </Flex>

              <Flex w="100%" justify={{ base: "center", lg: "flex-end" }}>
                <Button
                  fontSize={[16, 16, 17, 18, 20]}
                  className={pagestyles.btn}
                  onClick={() => {
                    const data = localStorage.getItem("user");
                    if (data !== null) router.push("/admin");
                    if (data === null) router.push("/admin/auth");
                  }}
                >
                  OPEN DEPOSIT
                </Button>
              </Flex>
            </Flex>
            <IconBoxes boxOne={true} />

            <LastData />
          </Flex>
        </main>
      </MainLayout>
    </>
  );
}
