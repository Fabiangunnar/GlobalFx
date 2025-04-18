import React, { useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FormControl, FormLabel, Button, Input, Box } from "@chakra-ui/react";
import { MdAccountBalance } from "react-icons/md";
import { userDeposit } from "@/redux/features/AppSlice";
import { useParams } from "next/navigation";

type Props = {};

const UserCreateDeposit = (props: Props) => {
  const params = useParams();

  const dispatch = useAppDispatch();
  const { userManageData, manageUserDeposits, updateState } = useAppSelector(
    (state) => state.AppSlice
  );
  const [depositFormData, setDepositFormData] = useState({
    amount: 0,
  });
  const handleDeposit = (e: any) => {
    e.preventDefault();
    dispatch(userDeposit({ userId: params.id, ...depositFormData }));
  };
  const handleInputChange = (e: any) => {
    setDepositFormData((prev: any) => ({
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
            Create Deposit for{" "}
            {`${userManageData.firstname} ${userManageData.lastname}`}
          </p>
        </div>
        <Box p={2}>
          <form action="" onSubmit={handleDeposit}>
            <FormControl p={2}>
              <FormLabel fontSize={11}>Amount</FormLabel>
              <Input
                type="number"
                fontSize={12}
                required
                name="amount"
                value={depositFormData.amount}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl p={2}>
              <Button fontSize={14} type="submit" w="100%" colorScheme="blue">
                Create
              </Button>
            </FormControl>
          </form>
        </Box>
      </div>
    </section>
  );
};

export default UserCreateDeposit;
