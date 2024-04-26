import { changeState, setWithdrawMessage } from "@/redux/features/AppSlice";
import { Flex, Select, Button, Box, Text } from "@chakra-ui/react";
import styles from "@/app/styles/pages/User.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import React, { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { useParams } from "next/navigation";

type Props = {};

const UserWithdrawMessage = (props: Props) => {
  const params = useParams();
  const { userManageData } = useAppSelector((state) => state.AppSlice);
  const [accountState, setAccountState] = useState(1);
  const dispatch = useAppDispatch();

  const handleAccountStateChange = (e: any) => {
    if (e.target.value === 0) return;
    setAccountState(e.target.value);
  };

  return (
    <section id="notifications" className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <IoNotifications />
          <p>Withdraw Message</p>
        </div>

        <Flex gap={4} p={4} direction={"column"}>
          {userManageData.withdrawMessage && (
            <div
              className={`p-4 flex w-full justify-center items-center  font-bold`}
            >
              {userManageData.withdrawMessage}
            </div>
          )}
          <Select
            cursor={"pointer"}
            fontSize={20}
            onClick={handleAccountStateChange}
            px={0}
            placeholder={
              userManageData.withdrawMessage === 1
                ? 1
                : userManageData.withdrawMessage
            }
            size="md"
          >
            {!userManageData.withdrawMessage && (
              <option className="cursor-pointer">Not Set</option>
            )}
            {userManageData.withdrawMessage !== 1 && <option>1</option>}
            {userManageData.withdrawMessage !== 2 && <option>2</option>}
            {userManageData.withdrawMessage !== 3 && (
              <option value={3}>3</option>
            )}
          </Select>
          <Button
            fontSize={12}
            onClick={() => {
              dispatch(
                setWithdrawMessage([
                  params.id,
                  { withdrawMessage: Number(accountState) },
                ])
              );
            }}
            colorScheme="whatsapp"
          >
            Set Message
          </Button>
        </Flex>
      </div>
    </section>
  );
};

export default UserWithdrawMessage;
