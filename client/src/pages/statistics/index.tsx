import Head from "next/head";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.scss";
import pagestyles from "@/styles/home/Main.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {
  closeNav,
  resetCurrentPage,
  resetNav,
  setNav,
} from "@/redux-actions/homeNavSlice";
import {Flex, Text, Button} from "@chakra-ui/react";
import LastData from "@/components/home/LastData";
import IconBoxes from "@/components/home/IconBoxes";
import {useRouter} from "next/router";
import MainLayout from "../layout/Mainlayout";

const inter = Inter({subsets: ["latin"]});

export default function Index() {
  const dispatch = useDispatch();
  const router = useRouter();

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
        <title>Statistics</title>
        <meta
          name="description"
          content="Explore the powerful globaltycoonfx trading platform for seamless FX trade."
        />
        <meta
          name="keywords"
          content="globaltycoonfx trading, globaltycoonfx, globaltycoonfx statistics, statistics globaltycoonfx, statistics, globaltycoonfx.com, global tycoon fx, globaltycoon fx, global, tycoon, global fx, globalfx, tycoonfx, tycoon fx, globalfx,  fx trade, forex, currency exchange, online trading"
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
              direction={{base: "column", lg: "row"}}
              gap={8}
              justify={"space-between"}
              align={"center"}
              textAlign={{base: "center", lg: "start"}}
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

              <Flex w="100%" justify={{base: "center", lg: "flex-end"}}>
                <Button
                  fontSize={[16, 16, 17, 18, 20]}
                  className={pagestyles.btn}
                  onClick={() => {
                    const data = localStorage.getItem("user");
                    if (data !== null) router.push("/admin");
                    if (data === null) router.push("/admin/auth");
                    dispatch(resetCurrentPage());
                    dispatch(resetNav());
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
