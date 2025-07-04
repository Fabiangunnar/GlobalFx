"use client";
import Head from "next/head";
import Image from "next/image";
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
          content="globaltradezella trading, globaltradezella, globaltradezella nft, nft globaltradezella, nft, globaltradezella.com, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading"
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
              NFT
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
                src="https://www.youtube.com/embed/4dkl5O9LOKg"
                title="What is an NFT? (Non-Fungible Tokens Explained)"
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
                  NFT{" "}
                </span>
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]} textAlign={"justify"}>
                NFT stands for 'non-fungible token'. When something is fungible,
                like a dollar bill, it is equivalent to, and can thus be
                exchanged for, any other dollar bill. In contrast, a
                non-fungible token is a unique asset in digital form that cannot
                be exchanged for any other NFT.
                <br />
                <br />
                This means that every NFT is a 'one-of-a-kind' item. NFTs are
                transferred from onw owner to another using blockchain
                technology, which creates a digital trail from seller to buyer
                that verifies the transaction.
                <br />
                <br />
                This encodes the unique ownership rights to the buyer (new
                owner). An NFT is a digital asset that represents real-world
                objects like art, music, in-game items and videos. They are
                bought and sold online, frequently with cryptocurrency, and they
                are generally encoded with the same underlying software as many
                cryptos. With our system, we invest in a high NFT Assets that
                yield profit for our client without the fear of lossing.
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
