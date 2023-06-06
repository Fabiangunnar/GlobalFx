import React, {useEffect, useState} from "react";
import styles from "@/styles/pages/User.module.scss";
import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Flex,
  Card,
  CardBody,
  Grid,
  Divider,
  createStandaloneToast,
} from "@chakra-ui/react";
import {MdArrowDropDown} from "react-icons/md";
import {AiOutlineSelect, AiOutlineToTop} from "react-icons/ai";
import {IoCashSharp} from "react-icons/io5";
import {GiProfit, GiTakeMyMoney, GiTrade} from "react-icons/gi";
import {RiLuggageDepositFill} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux-store/store";
import {SiCoinmarketcap} from "react-icons/si";
import {
  getAllDeposits,
  getAllPendingDeposits,
  getUser,
  makeInvestment,
  reset,
  resetWithdrawalState,
} from "@/redux-actions/HomeAppSlice";
import {setCurrentPage, setNavLink} from "@/redux-actions/navSlice";
type Props = {};

const Dashboard = (props: Props) => {
  const {
    userInfo,
    withdrawalState,
    errorMessage,
    pendingDeposits,
    tradeHistory,
    depositHistory,
  } = useSelector((store: RootState) => store.HomeAppSlice);
  const [isLoad, setIsLoad] = React.useState(false);

  const [amount, setAmount] = useState(1000);
  const {toast} = createStandaloneToast();

  const sumofPendingDeposits = pendingDeposits.reduce((accumulator, obj) => {
    return accumulator + obj.amount;
  }, 0);
  const sumofDeposits = depositHistory.reduce((accumulator, obj) => {
    return accumulator + obj.amount;
  }, 0);
  const sumofAllTrades = tradeHistory.reduce((accumulator, obj) => {
    return accumulator + obj.amount;
  }, 0);
  const dispatch = useDispatch();
  const handleClick = (link: string, id: object) => {
    dispatch(setNavLink(id));
    dispatch(setCurrentPage(link));
  };

  const [btcEq, setBtcEq] = useState(0);
  useEffect(() => {
    convertDollarToBTC(Number(userInfo?.totalBalance));
    dispatch(getAllDeposits(userInfo?.id));
    // dispatch(reset());
  }, []);

  async function convertDollarToBTC(amountInUSD: number) {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
      );
      const data = await response.json();
      const exchangeRate = data.bpi.USD.rate_float;
      const btcValue = amountInUSD / exchangeRate;
      setBtcEq(btcValue);
      return btcValue;
    } catch (error) {
      return null;
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (Number(userInfo?.totalBalance) < Number(amount)) {
      toast({
        title: "Insufficient Funds",
        description: "Make a deposit to continue your investment",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      return;
    }
    dispatch(
      makeInvestment({
        userId: userInfo?.id,
        amount,
        plan: "PROMO",
      })
    );
  };

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };
  useEffect(() => {
    if (withdrawalState.isSuccess) {
      toast({
        title: "Success.",
        description: "Investment made successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      setIsLoad(false);
      dispatch(getUser(userInfo?.id));
    }
    if (withdrawalState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
      setIsLoad(false);
    }
    if (withdrawalState.isLoading) {
      setIsLoad(true);
    }

    dispatch(resetWithdrawalState());
  }, [
    withdrawalState.isError,
    withdrawalState.isLoading,
    withdrawalState.isSuccess,
  ]);
  return (
    <div className={`${styles.manage_user_block} ${styles.manage_user_grid}`}>
      <section>
        <Grid templateColumns={"1fr 1fr"} gap={4}>
          <Card
            background={"#759c4930"}
            color={"#fff"}
            gridColumn={"1 / span 2"}
          >
            <CardBody
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
            >
              <Flex direction={"column"} gap={2}>
                <Box fontSize={[40, 42, 46, 52]}>
                  <GiTakeMyMoney />
                </Box>

                <Text fontSize={[12, 13, 14]}>Total Balance</Text>
              </Flex>
              <Text color={"#ffd700"} fontSize={[12, 13, 14]}>
                $
                {userInfo?.totalBalance?.toLocaleString("en-US", {
                  style: "decimal",
                })}
              </Text>
            </CardBody>
          </Card>

          <Card
            background={"#759c4930"}
            color={"#fff"}
            display={"flex"}
            justifyContent={"space-between"}
            overflow={"hidden"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            gap={2}
          >
            <CardBody
              display={"flex"}
              width={"100%"}
              flexDirection={"column"}
              gap={1}
            >
              <Box fontSize={[40, 42, 44, 52]}>
                <RiLuggageDepositFill />
              </Box>
              <Flex
                width={"100%"}
                justifyContent={"space-between"}
                gap={4}
                alignItems={"center"}
              >
                <Box>
                  <Text fontSize={[12, 13, 14]}>Pending Deposit</Text>
                </Box>
                <Box>
                  <Text
                    fontWeight={600}
                    size={"sm"}
                    color={"#ffd700"}
                    fontSize={[12, 13, 14]}
                  >
                    {pendingDeposits.length}
                  </Text>
                </Box>
              </Flex>
              <Divider
                marginBlock={2}
                position={"relative"}
                left={"-50%"}
                w={"4000%"}
              />

              <Text color={"#ffd700"} fontSize={[12, 13, 14]}>
                $
                {sumofPendingDeposits.toLocaleString("en-US", {
                  style: "decimal",
                })}
              </Text>
            </CardBody>
          </Card>
          <Card
            background={"#759c4930"}
            color={"#fff"}
            display={"flex"}
            overflow={"hidden"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            gap={2}
          >
            <CardBody display={"flex"} flexDirection={"column"} gap={1}>
              {" "}
              <Box fontSize={[40, 42, 44, 52]}>
                <GiProfit />
              </Box>
              <Text fontSize={[13, 14, 15]}>BTC Equivalent</Text>
              <Divider
                marginBlock={2}
                position={"relative"}
                left={"-50%"}
                w={"4000%"}
              />
              <Text color={"#ffd700"} fontSize={[12, 13, 14]}>
                {btcEq} btc
              </Text>
            </CardBody>
          </Card>
          <Card
            background={"#759c4930"}
            color={"#fff"}
            display={"flex"}
            overflow={"hidden"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            gap={2}
          >
            <CardBody display={"flex"} flexDirection={"column"} gap={1}>
              <Box fontSize={[40, 42, 44, 52]}>
                <RiLuggageDepositFill />
              </Box>
              <Text fontSize={[12, 13, 14]}>Total Deposit</Text>
              <Divider
                marginBlock={2}
                position={"relative"}
                left={"-50%"}
                w={"400%"}
              />
              <Text color={"#ffd700"} fontSize={[12, 13, 14]}>
                $
                {sumofDeposits.toLocaleString("en-US", {
                  style: "decimal",
                })}
              </Text>
            </CardBody>
          </Card>
          <Card
            background={"#759c4930"}
            color={"#fff"}
            display={"flex"}
            overflow={"hidden"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            gap={2}
          >
            <CardBody display={"flex"} flexDirection={"column"} gap={1}>
              {" "}
              <Box fontSize={[40, 42, 44, 52]}>
                <IoCashSharp />
              </Box>
              <Text fontSize={[13, 13, 14]}>Total Trades</Text>
              <Divider
                marginBlock={2}
                position={"relative"}
                left={"-50%"}
                w={"400%"}
              />
              <Text color={"#ffd700"} fontSize={[12, 13, 14]}>
                $
                {sumofAllTrades?.toLocaleString("en-US", {
                  style: "decimal",
                })}
              </Text>
            </CardBody>
          </Card>
          <Card
            background={"#759c4930"}
            color={"#fff"}
            gridColumn={"1 / span 2"}
          >
            <CardBody
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
            >
              <Flex direction={"column"} gap={2}>
                <Box fontSize={[40, 42, 46, 52]}>
                  <GiTakeMyMoney />
                </Box>

                <Text fontSize={[12, 13, 14]}>Total Profit</Text>
              </Flex>
              <Text color={"#ffd700"} fontSize={[12, 13, 14]}>
                $
                {userInfo?.totalProfit?.toLocaleString("en-US", {
                  style: "decimal",
                })}
              </Text>
            </CardBody>
          </Card>
        </Grid>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <SiCoinmarketcap />
            <p>Market</p>
          </div>
          <Box p={0} h={"100%"} background={"#759c4930"}>
            <Box h={"100%"} minH={"25rem"} w={"100%"}>
              <iframe
                style={{
                  minHeight: "26rem",
                  height: "100%",
                  width: "100%",
                }}
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_348fb&symbol=COINBASE%3ABTCUSD&interval=1&hidelegend=1&symboledit=1&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=2&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=pfi-my.com&utm_medium=widget&utm_campaign=chart&utm_term=COINBASE%3ABTCUSD#%7B%22page-uri%22%3A%22pfi-my.com%2Fdashboard%2F%3Floggin_success%22%7D"
                frameBorder={4}
              ></iframe>
            </Box>
          </Box>
        </div>
      </section>

      {/* Deposit Section */}
      <Flex gap={4} p={0} w="100%">
        <Button
          onClick={() => handleClick("deposit-funds", {id: "YHB84Z"})}
          fontSize={14}
          type="submit"
          maxW={"20rem"}
          w="100%"
          _hover={{
            background: "#64d2b1",
          }}
          color={"#fff"}
          background="#55b598"
        >
          Deposits
        </Button>
        <Button
          onClick={() => handleClick("withdrawals", {id: "RST48H"})}
          fontSize={14}
          type="submit"
          maxW={"20rem"}
          w="100%"
          _hover={{
            background: "#64d2b1",
          }}
          color={"#fff"}
          background="#759c49"
        >
          Withdrawals
        </Button>
      </Flex>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <AiOutlineSelect />
            <p>Promo</p>
          </div>
          <Box p={2} background={"#759c4930"}>
            <Box p={2} w="100%">
              <Text fontSize={{base: 12, sm: 14, md: 16}}>
                Hey dear Big Investor! Wouldn't you like to come in our
                extremely Accurate AI driven trade strategy? we promise 86.70%
                yields if you enter at a minimum of $2000.00. THIS IS A TIME
                LIMITED OFFER!
              </Text>
            </Box>

            <Box p={2} background={""}>
              <div className={`${styles.form}`}>
                <Flex
                  justify={"flex-start"}
                  gap={2}
                  w={"100%"}
                  align={"center"}
                >
                  <Text fontSize={18}>Time:</Text>{" "}
                  <Text fontSize={16}>72 Hours</Text>
                </Flex>
                <Flex
                  justify={"flex-start"}
                  gap={2}
                  w={"100%"}
                  align={"center"}
                >
                  <Text fontSize={18}>Profit:</Text>
                  <Text fontSize={16}>85%</Text>
                </Flex>
                <Flex
                  justify={"flex-start"}
                  gap={2}
                  w={"100%"}
                  align={"center"}
                >
                  <Text fontSize={18}>Min:</Text>
                  <Text fontSize={16}>$2000</Text>
                </Flex>
                <Flex
                  justify={"flex-start"}
                  gap={2}
                  w={"100%"}
                  align={"center"}
                >
                  <Text fontSize={18}>Max:</Text>
                  <Text fontSize={16}>$20000</Text>
                </Flex>
                <Flex
                  justify={"flex-start"}
                  gap={2}
                  w={"100%"}
                  align={"center"}
                >
                  <Text fontSize={18}>Current Balance:</Text>
                  <Text fontSize={16}>$0</Text>
                </Flex>
              </div>
              <form onSubmit={handleSubmit}>
                <Flex direction={"column"} gap={4} py={2}>
                  <FormControl>
                    <FormLabel fontSize={11}>Enter Amount *</FormLabel>
                    <NumberInput defaultValue={amount} min={100}>
                      <NumberInputField
                        onChange={handleAmountChange}
                        fontSize={16}
                        className={`${styles.input}`}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper color={"#fff"} />
                        <NumberDecrementStepper color={"#fff"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <Button
                      fontSize={14}
                      type="submit"
                      w="100%"
                      _hover={{
                        background: "#64d2b1",
                      }}
                      color={"#fff"}
                      background="#55b598"
                    >
                      Start Investment
                    </Button>
                  </FormControl>
                </Flex>
              </form>
            </Box>
          </Box>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
