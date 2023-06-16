import Head from "next/head";
import Image from "next/image";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.scss";
import pagestyles from "@/styles/home/Main.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {closeNav, setNav} from "@/redux-actions/homeNavSlice";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  Textarea,
  createStandaloneToast,
} from "@chakra-ui/react";
import TopWidget from "@/components/pages/TopWidget";
import BottomWidget from "@/components/pages/BottomWidget";
import NotificationPopup from "@/components/home/NotificationPopup";
import {SiWhatsapp} from "react-icons/si";
import MainLayout from "../layout/Mainlayout";
import {RootState} from "@/redux-store/store";
import {IoMailOutline} from "react-icons/io5";
import {CiInstagram, CiTwitter} from "react-icons/ci";
import {MdEmail, MdOutlineWhatsapp} from "react-icons/md";
import {sendContactForm} from "@/lib/api";
import SpinnerPage from "@/components/home/Spinner";

const inter = Inter({subsets: ["latin"]});

export default function Index() {
  const dispatch = useDispatch();
  const sideNavRef: any = useRef();
  const {toast} = createStandaloneToast();
  const [isLoad, setIsLoad] = useState(false);
  const {adminAccounts} = useSelector((store: RootState) => store.HomeAppSlice);
  const adminAccount = adminAccounts[0];
  const [emailData, setEmailData] = useState({
    addressto: "",
    message: "",
  });
  const handleClickOutside = (event: any) => {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      dispatch(closeNav());
    }
  };
  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoad(true);
    await sendContactForm(emailData);
    setIsLoad(false);
    toast({
      title: "Success.",
      description: "Mail Sent Successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
      variant: "subtle",
    });
    setEmailData({
      addressto: "",
      message: "",
    });
  };
  useEffect(() => {
    const navState = localStorage.getItem("home-nav");
    let navstate = navState ? JSON.parse(navState) : null;
    if (navstate) {
      dispatch(setNav(navstate));
    }
  }, []);
  const handleInputChange = (e: any) => {
    setEmailData((prev: any) => ({...prev, [e.target.name]: e.target.value}));
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Contact | GLOBAL TYCOON FX</title>
        <meta
          name="description"
          content="Explore the powerful globaltycoonfx trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltycoonfx trading, globaltycoonfx, globaltycoonfx contact, contact globaltycoonfx, contact , contact us, globaltycoonfx.com, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading"
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2-transparent.png" />
      </Head>
      <MainLayout>
        {isLoad && <SpinnerPage />}
        <div>
          <main className={` ${pagestyles.body}`}>
            <div
              className={` ${pagestyles.contacts_top_head} ${pagestyles.top_head}`}
            >
              <Flex
                direction={"column"}
                gap={[7, 8, 9, 10, 12]}
                height={{base: "10rem", lg: "12rem", xl: "12rem"}}
                align={"center"}
                justify={"center"}
                textAlign={{base: "center", lg: "start", xl: "start"}}
                className={` ${pagestyles.about_top_head} ${pagestyles.top_head}`}
              >
                <Text fontSize={[32, 38, 44, 48, 52]}>OUR CONTACTS</Text>
              </Flex>
            </div>
          </main>
          <div
            className={`footer_line_through`}
            style={{zIndex: 1, position: "relative"}}
          />
          <Flex
            className={` ${pagestyles.body}`}
            style={{background: "rgb(14, 17, 19)"}}
          >
            <Flex direction={"column"} gap={1} align={"center"} w={"100%"}>
              <Text fontSize={[20, 24, 28, 32, 36]}>SEND MESSAGE</Text>
              <Text
                fontSize={[16, 17, 18, 19, 20]}
                color={"#bdbdbd"}
                textAlign={"center"}
              >
                Send us a message and we will reply to you within 24 hours!
              </Text>
            </Flex>
            <Flex justify={"center"} w={"100%"}>
              <Link
                color={"#bdbdbd"}
                target="_blank"
                href={`mailto:${adminAccount.email}?subject=GlobalTycoonFX%20HelpME`}
              >
                <Flex
                  justify={"center"}
                  bg={"#000"}
                  p={1}
                  px={4}
                  borderRadius={18}
                  align={"center"}
                  gap={2}
                >
                  <IoMailOutline fontSize={20} />
                  <Box>{adminAccount.email}</Box>
                </Flex>
              </Link>
            </Flex>
            <Flex justify={"center"} w={"100%"}>
              <Card
                background={"rgb(37, 44, 49)"}
                minW={{
                  base: "20rem",
                  sm: "24rem",
                  md: "28rem",
                  lg: "32rem",
                  xl: "40rem",
                }}
              >
                <form action="" onSubmit={handleEmailSubmit}>
                  <Flex
                    direction={"column"}
                    gap={2}
                    p={{base: "1rem", lg: "2rem"}}
                  >
                    <FormControl p={2} color={"#fff"}>
                      <Text
                        mb="8px"
                        fontSize={[12, 12, 14, 14, 16]}
                        color={"#fff"}
                      >
                        Email:{" "}
                      </Text>
                      <InputGroup>
                        <Input
                          type="tel"
                          name={"addressto"}
                          value={emailData.addressto}
                          onChange={handleInputChange}
                          className={`${styles.input}`}
                          fontSize={[12, 12, 14, 16, 18]}
                          required
                          placeholder="Email Address"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl p={2} color={"#fff"}>
                      <Text
                        mb="8px"
                        fontSize={[12, 12, 14, 14, 16]}
                        color={"#fff"}
                      >
                        Messages:{" "}
                      </Text>
                      <Textarea
                        name={"message"}
                        value={emailData.message}
                        onChange={handleInputChange}
                        fontSize={[12, 12, 14, 16, 18]}
                        placeholder="What's the message"
                      />
                    </FormControl>
                    <FormControl>
                      <Button
                        fontSize={[12, 13, 14, 15, 16]}
                        type="submit"
                        w="100%"
                        _hover={{
                          background: "#64d2b1",
                        }}
                        color={"#fff"}
                        background="#55b598"
                      >
                        Send
                      </Button>
                    </FormControl>
                  </Flex>
                </form>
              </Card>
            </Flex>
            <Flex
              justify={"center"}
              p={2}
              w={"100%"}
              align={"center"}
              gap={4}
              direction="column"
            >
              <Grid
                templateColumns={"1fr 3fr"}
                justifyContent={"flex-start"}
                gap={2}
                alignItems={"flex-start"}
                maxW={"26rem"}
              >
                <Text fontSize={[14, 15, 16, 17, 18]}>Official address:</Text>
                <Link
                  target="_blank"
                  //   href={`mailto:gtfxcustomerservice@outlook.com?subject=GlobalTycoonFX%20HelpME`}
                  href={`https://www.google.com/maps/search/United+Kingdom+Level+9,+One+Canada+Square,+Canary+Wharf,+E14+5AA,+London,+United+Kingdom/@51.5049697,-0.0221382,17z/data=!3m1!4b1?entry=ttu`}
                >
                  <Text fontSize={[12, 13, 14, 15, 16]} color={"gray.400"}>
                    United Kingdom Level 9, One Canada Square, Canary Wharf, E14
                    5AA, London, United Kingdom
                  </Text>
                </Link>
              </Grid>
              <Flex justify={"space-between"} maxW={"26rem"} w={"100%"}>
                <CiInstagram fontSize={42} />
                <CiTwitter fontSize={42} />

                <Link
                  target="_blank"
                  //   href={`mailto:gtfxcustomerservice@outlook.com?subject=GlobalTycoonFX%20HelpME`}
                  href={`mailto:${adminAccount.email}`}
                >
                  <MdEmail fontSize={42} />
                </Link>
                <Link
                  target="_blank"
                  //   href={`https://api.whatsapp.com/send?phone=17736498501&text=`}
                  href={`https://api.whatsapp.com/send?phone=${adminAccount.phone}&text=`}
                >
                  <MdOutlineWhatsapp fontSize={42} />
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </MainLayout>
    </>
  );
}
