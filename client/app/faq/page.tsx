"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/app/styles/Home.module.scss";
import pagestyles from "@/app/styles/home/Main.module.scss";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { IoAddSharp } from "react-icons/io5";
import { HiOutlineMinus } from "react-icons/hi2";
import { BsCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { getIconComponent } from "@/data/maindata";
import BottomWidget from "@/components/pages/BottomWidget";
import TopWidget from "@/components/pages/TopWidget";
import NotificationPopup from "@/components/home/NotificationPopup";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";
import MainLayout from "../../components/layout/Mainlayout";
import { setNav, setFaqData, setFaqSubData } from "@/redux/features/AppSlice";
import { closeNav } from "@/redux/features/NavSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const { faqData } = useAppSelector((state) => state.homenav);
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>Faq</title>
        <meta
          name="description"
          content="Explore the powerful GLOBAL TRADE ZELLA trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltradezella trading, globaltradezella, globaltradezella faq, faq globaltradezella, faq, faqs, globaltradezella.com, global trade zella, globaltradezella fx, global, trade, global fx, globalfx, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading"
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>
      <MainLayout>
        <div>
          <main className={` ${pagestyles.body}`}>
            <div
              className={` ${pagestyles.contacts_top_head} ${pagestyles.top_head}`}
            >
              <Flex
                direction={"column"}
                gap={[7, 8, 9, 10, 12]}
                height={{ base: "10rem", lg: "12rem", xl: "12rem" }}
                align={"center"}
                justify={"center"}
                textAlign={{ base: "center", lg: "start", xl: "start" }}
                className={` ${pagestyles.about_top_head} ${pagestyles.top_head}`}
              >
                <Text fontSize={[32, 38, 44, 48, 52]}>
                  FREQUENTLY ASKED QUESTIONS (FAQ)
                </Text>
              </Flex>
            </div>
          </main>
          <div
            className={`footer_line_through`}
            style={{ zIndex: 1, position: "relative" }}
          />
          <Flex
            className={` ${pagestyles.body}`}
            style={{ background: "rgb(14, 17, 19)" }}
            paddingTop={4}
          >
            <Flex direction={"column"} w="100%">
              {faqData.map((faqItem: any) => {
                const icon = getIconComponent(faqItem?.icon);
                return (
                  <Box key={faqItem.id}>
                    <Box
                      cursor={"pointer"}
                      onClick={() => dispatch(setFaqData(faqItem))}
                    >
                      <Divider />
                      <Flex p={4} align={"center"}>
                        <Flex
                          fontSize={[26, 30, 34, 38, 42]}
                          gap={4}
                          align={"center"}
                          as="span"
                          flex="1"
                          textAlign="left"
                        >
                          <Flex
                            align={"center"}
                            fontSize={[32, 36, 40, 44, 48]}
                          >
                            <svg width="20" height="20">
                              <defs>
                                <linearGradient
                                  id="blue-gradient"
                                  x1="100%"
                                  y1="100%"
                                  x2="0%"
                                  y2="0%"
                                >
                                  <stop offset="5%" stopColor="#40efeb" />
                                  <stop stopColor=" #9ed163" offset="100%" />
                                </linearGradient>
                              </defs>
                            </svg>
                            {icon}
                          </Flex>

                          <Text
                            bgGradient=" linear-gradient(90deg, #40efeb, #9ed163)"
                            bgClip="text"
                          >
                            {faqItem.head}
                          </Text>
                        </Flex>
                        <Box fontSize={[16, 18, 20, 22, 24]}>
                          {faqItem.state ? (
                            <BsCaretUpFill />
                          ) : (
                            <BsFillCaretDownFill />
                          )}
                        </Box>
                      </Flex>
                    </Box>
                    <Box
                      className={
                        faqItem.state
                          ? pagestyles.drop_active
                          : pagestyles.drop_inactive
                      }
                    >
                      {faqItem.subheads.map((subhead: any) => (
                        <Box key={subhead.id} p={4}>
                          <Flex
                            cursor={"pointer"}
                            onClick={() =>
                              dispatch(setFaqSubData({ faqItem, subhead }))
                            }
                            align={"center"}
                            paddingBottom={2}
                            gap={8}
                            fontSize={[14, 16, 18, 20, 22]}
                            justify={"space-between"}
                          >
                            <Text>{subhead.head}</Text>
                            <Box fontSize={[12, 14, 16, 18, 20]}>
                              {subhead.state ? (
                                <HiOutlineMinus />
                              ) : (
                                <IoAddSharp />
                              )}
                            </Box>
                          </Flex>

                          <Box
                            className={
                              subhead.state
                                ? pagestyles.subdrop_active
                                : pagestyles.subdrop_inactive
                            }
                            overflow={"hidden"}
                          >
                            <Box fontSize={[12, 13, 14, 15, 16]} p={4}>
                              {subhead.desc}
                            </Box>
                          </Box>
                          <Divider />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        </div>
      </MainLayout>
    </>
  );
}
