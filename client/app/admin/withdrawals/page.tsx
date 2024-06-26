"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Select,
  createStandaloneToast,
  Divider,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdAccountBalance, MdArrowDropDown } from "react-icons/md";

import { GiProfit, GiTakeMyMoney } from "react-icons/gi";
import SpinnerPage from "@/components/home/Spinner";
import { WithdrawMessageModal } from "@/components/pages/Modal";
import {
  makeWithdrawal,
  getUser,
  resetWithdrawalState,
  getAllDeposits,
  UserTypes,
} from "@/redux/features/HomeAppSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

type Props = {};

const WithdrawFunds = (props: Props) => {
  const { withdrawalState, errorMessage } = useAppSelector(
    (store) => store.HomeAppSlice
  );
  const [userData, setUserData] = useState<UserTypes>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    totalProfit: 0,
    pendingDeposit: 0,
    earnings: 0,
    totalDeposit: 0,
    totalWithdrawal: 0,
    totalBalance: 0,
    picture: "",
    pictureInfo: "",
    phoneNumber: "",
  });
  const modal1 = useDisclosure();
  const { toast } = createStandaloneToast();

  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [walletInfo, setWalletInfo] = useState({
    walletCode: "",
    walletAddress: "",
  });
  const [isLoad, setIsLoad] = React.useState(false);
  const dispatch = useAppDispatch();
  const [btcEq, setBtcEq] = useState(0);
  const [amount, setAmount] = useState(1000);
  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };
  const handleInputChange = (e: any) => {
    setWalletInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let user = storedUser ? JSON.parse(storedUser) : null;
    setUserData(user);
    if (user) {
      dispatch(getAllDeposits(user.id));
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (Number(userData.totalBalance) < Number(amount)) {
      toast({
        title: "Insufficient Funds",
        description: "Insufficient Funds",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      return;
    }

    dispatch(
      makeWithdrawal({
        userId: userData.id,
        asset: selectedAsset,
        amount: amount,
        to: walletInfo.walletAddress,
        ...walletInfo,
      })
    );
  };
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(10deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);
  useEffect(() => {
    if (withdrawalState.isSuccess) {
      setOverlay(<OverlayOne />);
      modal1.onOpen();
      setIsLoad(false);
      setAmount(1000);
      setWalletInfo({
        walletCode: "",
        walletAddress: "",
      });
      dispatch(getUser(userData.id));
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
  useEffect(() => {
    convertDollarToBTC(Number(userData.totalBalance));
  });

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
  const handleAssetChange = (e: any) => {
    setSelectedAsset(e.target.value);
  };
  return (
    <>
      <main
        className={`${styles.manage_user_block} ${styles.manage_user_grid}`}
      >
        {isLoad && <SpinnerPage />}

        <section className={`${styles.user_block}`}>
          <div className={`${styles.management_block}`}>
            <div className={`${styles.management_head}`}>
              <MdAccountBalance />
              <p>Account details</p>
            </div>
            <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
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
                    {userData.totalBalance?.toLocaleString("en-US", {
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
                <CardBody
                  display={"flex"}
                  w="100%"
                  justifyContent={"space-between"}
                  alignItems={"flex-end"}
                >
                  {" "}
                  <Flex direction={"column"} gap={2}>
                    <Box fontSize={[40, 42, 44, 52]}>
                      <GiProfit />
                    </Box>
                    <Text fontSize={[13, 14, 15]}>BTC Equivalent</Text>
                  </Flex>
                  <Box>
                    <Text color={"#ffd700"} fontSize={[12, 13, 14]}>
                      {btcEq} btc
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          </div>
        </section>

        <section className={`${styles.user_block}`}>
          <div className={`${styles.management_block}`}>
            <div className={`${styles.management_head}`}>
              <BiMoneyWithdraw />
              <p>Withdraw Funds</p>
            </div>
            <Box p={2} background={"#759c4930"}>
              <form
                action=""
                onSubmit={handleSubmit}
                className={`${styles.form}`}
              >
                <FormControl p={2}>
                  <FormLabel fontSize={11}>Amount *</FormLabel>
                  <NumberInput defaultValue={1000} value={amount} min={1000}>
                    <NumberInputField
                      onChange={handleAmountChange}
                      className={`${styles.input}`}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color={"#fff"} />
                      <NumberDecrementStepper color={"#fff"} />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl p={2}>
                  <FormLabel fontSize={11}>Select Method *</FormLabel>
                  <Select
                    onChange={handleAssetChange}
                    className={`${styles.input}`}
                    fontSize={12}
                    icon={<MdArrowDropDown />}
                  >
                    <option
                      style={{ background: "rgba(32, 80, 79, 1)" }}
                      value="USDT"
                    >
                      USDT
                    </option>
                    <option
                      style={{ background: "rgba(32, 80, 79, 1)" }}
                      value="BTC"
                    >
                      Bitcoin
                    </option>
                    <option
                      style={{ background: "rgba(32, 80, 79, 1)" }}
                      value="ETH"
                    >
                      Ethereum
                    </option>
                  </Select>
                </FormControl>
                <FormControl p={2}>
                  <FormLabel fontSize={11}>Withdrawal Code *</FormLabel>
                  <Input
                    className={`${styles.input}`}
                    type="text"
                    fontSize={12}
                    value={walletInfo.walletCode}
                    required
                    name="walletCode"
                    placeholder="Wallet Code"
                    _placeholder={{
                      color: "gray.400",
                    }}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl p={2}>
                  <FormLabel fontSize={11}>Wallet Address * </FormLabel>
                  <Input
                    className={`${styles.input}`}
                    type="text"
                    fontSize={12}
                    required
                    value={walletInfo.walletAddress}
                    name="walletAddress"
                    _placeholder={{
                      color: "gray.400",
                    }}
                    placeholder="Wallet Address"
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl p={2}>
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
                    Request Withdrawals
                  </Button>
                </FormControl>
              </form>
            </Box>
          </div>
        </section>
      </main>
      <WithdrawMessageModal
        overlay={overlay}
        isOpen={modal1.isOpen}
        onClose={modal1.onClose}
        img={userData?.picture ? userData.picture : "/images.png"}
      />
    </>
  );
};

export default WithdrawFunds;
