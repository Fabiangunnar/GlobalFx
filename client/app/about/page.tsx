"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/app/styles/Home.module.scss";
import pagestyles from "@/app/styles/home/Main.module.scss";
import { useEffect, useRef } from "react";
import {
  Flex,
  Card,
  CardBody,
  Grid,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import PaymentSystems from "@/components/home/PaymentSystems";
import IconBoxes from "@/components/home/IconBoxes";
import MainLayout from "../../components/layout/Mainlayout";
import { appname, awards, plaques } from "@/data/maindata";
import { setNav } from "@/redux/features/AppSlice";
import { closeNav } from "@/redux/features/NavSlice";
import { useAppDispatch } from "@/redux/hooks";

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
        <title>About | {appname}</title>
        <meta
          name="description"
          content={`Learn about the powerful ${appname} trading platform.`}
        />
        <meta
          name="keywords"
          content={`globaltradezella trading, ${appname}, ${appname} about, about ${appname}, about, ${appname}.com, global trade zella, ${appname}, global, trade, global fx, ${appname}, tradezella, trade zella, globalfx,  fx trade, forex, currency exchange, online trading`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>
      <MainLayout>
        <main className={` ${pagestyles.body}`}>
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
                ABOUT US
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
              <Text textAlign={"center"} fontSize={[16, 18, 20, 22, 24]} p={12}>
                {appname} - PROFESSIONAL TEAM CRYPTO INDUSTRY DEVELOPERS
              </Text>
              <Text fontSize={[12, 14, 15, 16, 18]} textAlign={"justify"}>
                Our company has been developing stable cryptocurrency income for
                6 years. Today {appname}employees are leaders in the field of IT
                technologies. They have created a unique robot that generates
                daily profit and guesses the steps of the Bitcoin value. That is
                why the {appname} robot is able to benefit at any stage of the
                market: both growth and decline. This development is unique in
                that it is the first in the world. Today, not many people know
                about this. That is why they are given the chance to receive a
                stable income for the rest of their lives. Many people will try
                to fake it in fraudulent ways after the platform is known around
                the world. But we assure that only our company {appname} IS
                unique.
              </Text>
            </Flex>
          </Flex>
          {/* <Flex w="100%" direction={"column"}>
            <Grid
              className={pagestyles.grid_third}
              p={2}
              w="100%"
              gridTemplateColumns={{
                base: "1fr",
                sm: "1fr 1fr",
              }}
              placeItems={"center"}
            >
              {awards.map((award) => (
                <Grid
                  textAlign={"center"}
                  key={award.img}
                  cursor={"pointer"}
                  placeItems={"space-between"}
                >
                  <Image
                    width={500}
                    height={500}
                    src={award.img}
                    alt={award.alt}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              p={2}
              w="100%"
              gridTemplateColumns={{
                base: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
                lg: "1fr 1fr 1fr",
              }}
              placeItems={"center"}
            >
              {plaques.map((plaque) => (
                <Grid textAlign={"center"} key={plaque.img} cursor={"pointer"}>
                  <Image
                    width={500}
                    height={500}
                    src={plaque.img}
                    alt={plaque.alt}
                  />
                </Grid>
              ))}
            </Grid>
          </Flex> */}
          <Card
            w={"100%"}
            p={{ md: "2rem", sm: "0.5rem" }}
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
                      {appname} - UK LEGAL REGISTRATION {"- "}
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
                      <Text fontSize={[12, 13, 14, 15, 16]} color={"gray.400"}>
                        {appname} LTD
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
                      templateColumns={"1fr 3fr"}
                      justifyContent={"flex-start"}
                      gap={2}
                      alignItems={"flex-start"}
                    >
                      <Text fontSize={[14, 15, 16, 17, 18]}>
                        Official address:
                      </Text>
                      <Link
                        target="_blank"
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
          <div
            className={` ${pagestyles.about2_top_head} ${pagestyles.bottom_block} ${pagestyles.top_head}`}
          >
            <Flex direction={"column"} gap={8} textAlign={"center"}>
              <Flex direction={"column"} gap={4}>
                <Heading
                  fontFamily={"inherit"}
                  color={"rgb(105, 226, 176)"}
                  fontWeight={400}
                  fontSize={[24, 26, 28, 30, 32]}
                >
                  {appname} STATS
                </Heading>
                <Text fontSize={[12, 14, 15, 16, 18]} textAlign={"justify"}>
                  Here are online statistics of our company. Competent
                  distribution of investments in the {appname} robot allows you
                  to maximize profits at all stages of the market. Gradual
                  development is a guarantee of world recognition in the market.
                  It is important for us to ensure the protection of our
                  investors, as well as the stability and uninterrupted
                  operation of the platform. The {appname} robot is fully
                  automated to operate without user intervention.
                </Text>
              </Flex>
            </Flex>
          </div>
          <IconBoxes boxOne={true} boxTwo={true} />
          <div
            className={`footer_line_through`}
            style={{
              zIndex: 1,
              position: "relative",
              left: "-50%",
              width: "200%",
            }}
          />
          <PaymentSystems />
        </main>
      </MainLayout>
    </>
  );
}
