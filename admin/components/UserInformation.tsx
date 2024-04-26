"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { Flex, WrapItem, Avatar, Stack, Text } from "@chakra-ui/react";
import { HiUser } from "react-icons/hi2";

type Props = {};

const UserInformation = (props: Props) => {
  const [btcEq, setBtcEq] = useState(0);
  const { userManageData, manageUserDeposits } = useAppSelector(
    (state) => state.AppSlice
  );
  useEffect(() => {
    convertDollarToBTC(Number(userManageData?.totalBalance));
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
      console.error("Error fetching exchange rate:", error);
      return null;
    }
  }

  const sumofDeposits = manageUserDeposits.reduce((accumulator, obj) => {
    return accumulator + obj.amount;
  }, 0);
  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <HiUser />
          <p>
            {`${userManageData.firstname} ${userManageData.lastname}`}'s
            Information
          </p>
        </div>
        <Flex p={4} gap={8} justify={"between"} align={"center"}>
          <WrapItem>
            <Avatar
              // onClick={() => {
              //   setOverlay(<OverlayOne />);
              //   modal1.onOpen();
              // }}
              cursor={"pointer"}
              size="2xl"
              name="Kola Tioluwani"
              src={
                userManageData?.picture
                  ? `${userManageData.picture}`
                  : "/images.png"
              }
            />
          </WrapItem>

          <Stack spacing={3} w={"100%"}>
            <Text fontSize="sm">
              Available Balance: ${userManageData.totalBalance}
            </Text>
            <Text fontSize="sm">Total Deposit: ${sumofDeposits} </Text>
            <Text fontSize="sm">
              Total Profit: ${userManageData.totalProfit}{" "}
            </Text>
            <Text fontSize="sm">
              Total Withdrawal: ${userManageData.totalWithdrawal}
            </Text>
            <Text fontSize="sm">Total Investment: {btcEq} BTC</Text>
            {/* <Button
            fontSize={14}
            type="submit"
            w="100%"
            colorScheme="messenger">
            Login Account
          </Button> */}
          </Stack>
        </Flex>
      </div>
    </section>
  );
};

export default UserInformation;
