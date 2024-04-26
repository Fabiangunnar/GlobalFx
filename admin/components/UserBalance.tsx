"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { FormControl, FormLabel, Button, Input, Box } from "@chakra-ui/react";
import { MdAccountBalance } from "react-icons/md";
import { resetUpdateState, updateUser } from "@/redux/features/AppSlice";

type Props = {};

const UserBalance = (props: Props) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { userManageData, updateState } = useAppSelector(
    (state) => state.AppSlice
  );
  const [balanceFormData, setBalanceFormData] = useState({
    totalBalance: 0,
    totalProfit: 0,
  });
  useEffect(() => {
    if (updateState.isSuccess) {
      setBalanceFormData({ totalBalance: 0, totalProfit: 0 });
    }
  }, [updateState.isSuccess]);

  const handleUpdateBalance = async (e: any) => {
    e.preventDefault();
    await dispatch(updateUser([params.id, balanceFormData]));
  };
  const handleInputChange = (e: any) => {
    setBalanceFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <MdAccountBalance />
          <p>
            Update {`${userManageData.firstname} ${userManageData.lastname}`}
            's Balance
          </p>
        </div>
        <Box p={2}>
          <form action="" onSubmit={handleUpdateBalance}>
            <FormControl p={2}>
              <FormLabel fontSize={11}>Total Balance</FormLabel>
              <Input
                type="text"
                fontSize={12}
                name="totalBalance"
                value={balanceFormData.totalBalance}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl p={2}>
              <FormLabel fontSize={11}>Total Profit</FormLabel>
              <Input
                type="text"
                fontSize={12}
                name="totalProfit"
                value={balanceFormData.totalProfit}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl p={2}>
              <Button
                fontSize={14}
                type="submit"
                w="100%"
                colorScheme="messenger"
              >
                Update
              </Button>
            </FormControl>
          </form>
        </Box>
      </div>
    </section>
  );
};

export default UserBalance;
