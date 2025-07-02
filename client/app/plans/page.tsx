"use client";
import Head from "next/head";
import pagestyles from "@/app/styles/home/Main.module.scss";
import MainLayout from "../../components/layout/Mainlayout";
import CryTypo from "@/components/home/CryTypo";
import { Card, CardBody, Flex, Grid, Text } from "@chakra-ui/react";
import { appname, investmentPlans } from "@/data/maindata";
import InvestWithBtn from "@/components/home/InvestWithBtn";

export default function Index() {
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
          content="globaltradezella trading, globaltradezella, globaltradezella plans, plans globaltradezella, plans, plan, globaltradezella.com, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading"
        />
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
              PLANS
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
          w={"100%"}
        >
          <Grid
            gap={4}
            w={"100%"}
            justifyContent={"center"}
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            }}
          >
            {investmentPlans.map((investmentPlan) => (
              <Card
                border={"1px solid rgba(99, 255, 251, 0.4)"}
                bg={"rgba(0, 0, 0, 0.8)"}
                color={"grey.200"}
                w={"100%"}
                h={"100%"}
                backdropFilter={"blur(8px)"}
                key={investmentPlan.id}
              >
                <Flex
                  w={"100%"}
                  bg={"rgba(99, 255, 251, 0.8)"}
                  _hover={{
                    backgroundColor: "rgba(99, 255, 251, 0.4)",
                  }}
                  p={4}
                  textAlign={"center"}
                  justify={"center"}
                  color={"#fff"}
                  fontSize={[18, 20, 22, 24, 26]}
                  cursor={"pointer"}
                >
                  {investmentPlan.plan}S{" "}
                </Flex>
                <CardBody textAlign={"center"} display={"grid"} gap={4}>
                  <Grid
                    fontSize={[18, 20, 22, 24, 26]}
                    color={"gray.300"}
                    gap={2}
                  >
                    <Text>{investmentPlan.prop1} </Text>
                    <Text>{investmentPlan.prop2} </Text>
                    <Text>{investmentPlan.prop3} </Text>
                    <Text>{investmentPlan?.prop4} </Text>
                  </Grid>

                  <InvestWithBtn>Get Started</InvestWithBtn>
                </CardBody>
              </Card>
            ))}
          </Grid>
          <CryTypo />
        </Flex>
      </MainLayout>
    </>
  );
}
