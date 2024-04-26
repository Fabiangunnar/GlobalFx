import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { changeState, getUser } from "@/redux/features/AppSlice";
import { Flex, Divider, Button, Box, Text } from "@chakra-ui/react";
import { RiProfileLine } from "react-icons/ri";
import { Select } from "@chakra-ui/react";
type Props = {};

const UserProfile = (props: Props) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const stateBoxRef: any = useRef();
  const { userManageData } = useAppSelector((state) => state.AppSlice);
  const [accountBox, setAccountBox] = useState(false);
  const [accountState, setAccountState] = useState("PENDING");

  const date = new Date(`${userManageData.createdAt}`);
  const date2 = new Date(`${userManageData.lastLogin}`);
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = `${date.toLocaleDateString("en-US", options)}`;
  const formattedDate2 = `${date2.toLocaleDateString("en-US", options)}`;

  const handleChangeAccountState = () => {
    setAccountBox((prev) => !prev);
  };
  const handleClickOutside = (event: any) => {
    if (stateBoxRef.current && !stateBoxRef.current.contains(event.target)) {
      setAccountBox(false);
    }
  };

  useEffect(() => {
    dispatch(getUser(params.id));

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleAccountStateChange = (e: any) => {
    if (e.target.value === "") return;
    console.log(132, e.target.value);
    setAccountState(e.target.value);
  };
  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <RiProfileLine />
          <p>
            {" "}
            {`${userManageData.firstname} ${userManageData.lastname}`}'s Profile
          </p>
        </div>
        <Flex p={4} gap={1} direction={"column"}>
          <Box>
            <Text fontSize="sm">Name:</Text>
            <Text fontSize={12}>
              {" "}
              {`${userManageData.firstname} ${userManageData.lastname}`}
            </Text>
          </Box>
          <Divider />
          <Box>
            <Text fontSize="sm">Email:</Text>
            <Text fontSize={12}>{userManageData.email}</Text>
          </Box>
          <Divider colorScheme={"red"} variant={"solid"} />
          <Box>
            <Text fontSize="sm">Registered on:</Text>
            <Text fontSize={12}>{formattedDate}</Text>
          </Box>
          <Divider />
          <Box>
            <Text fontSize="sm">Referral link:</Text>
            {/* <Text fontSize={12}>been</Text> */}
            <Button size={"sm"} fontSize={11} colorScheme="messenger">
              VIEW REFERRALS
            </Button>
          </Box>
          <Divider colorScheme={"red"} variant={"solid"} />
          <Box ref={stateBoxRef}>
            <Text fontSize="sm">Account State:</Text>
            <Flex gap={4} direction={"column"} w={80}>
              <div
                className={`${
                  userManageData.accountState === "PENDING"
                    ? "!bg-blue-600"
                    : userManageData.accountState === "VERIFIED"
                    ? "!bg-green-600"
                    : userManageData.accountState === "BLOCKED" && "!bg-red-600"
                } p-4 flex w-full justify-center items-center text-white font-bold`}
              >
                {userManageData.accountState}
              </div>
              <Select
                cursor={"pointer"}
                fontSize={11}
                onClick={handleAccountStateChange}
                px={0}
                placeholder={
                  userManageData.accountState === "BLOCKED"
                    ? "REJECTED"
                    : userManageData.accountState
                }
                size="sm"
              >
                {userManageData.accountState !== "PENDING" && (
                  <option>PENDING</option>
                )}
                {userManageData.accountState !== "VERIFIED" && (
                  <option>VERIFIED</option>
                )}
                {userManageData.accountState !== "BLOCKED" && (
                  <option value={"BLOCKED"}>BLOCKED</option>
                )}
              </Select>
              <Button
                fontSize={12}
                onClick={() =>
                  dispatch(changeState([params.id, { accountState }]))
                }
                colorScheme="whatsapp"
              >
                Update
              </Button>
            </Flex>
          </Box>
          <Divider colorScheme={"red"} variant={"solid"} />
          <Box>
            <Text fontSize="sm">Last Login Information:</Text>
            <Text fontSize={12}>{formattedDate2}</Text>
          </Box>
          <Divider colorScheme={"red"} variant={"solid"} />
        </Flex>
      </div>
    </section>
  );
};

export default UserProfile;
