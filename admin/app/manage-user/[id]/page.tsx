"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import { MdAccountBalance, MdArrowDropDown } from "react-icons/md";
import { RiLuggageDepositFill, RiProfileLine } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  TableContainer,
  TableCaption,
  Table,
  Tbody,
  Td,
  Tr,
  Th,
  Thead,
  Tfoot,
  Flex,
  Divider,
  CardBody,
  Card,
  createStandaloneToast,
  Select,
} from "@chakra-ui/react";
import SpinnerPage from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import {
  sendNotification,
  sendTransactionState,
  getUser,
  resetUsersState,
  getMyUserDeposits,
  resetUpdateState,
  resetSendState,
  resetUpdateDepositState,
  updateDeposit,
  deleteDeposit,
} from "@/redux/features/AppSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useParams } from "next/navigation";
import UserInformation from "@/components/UserInformation";
import UserBalance from "@/components/UserBalance";
import UserCreateDeposit from "@/components/UserCreateDeposit";
import UserProfile from "@/components/UserProfile";
import UserWithdrawMessage from "@/components/UserWithdrawMessage";
import UserNotifications from "@/components/UserNotifications";

type Props = {};

const ManageUser = (props: Props) => {
  const params = useParams();
  const {
    manageUserDeposits,
    updateDepositState,
    sendState,
    usersState,
    errorMessage,
    updateState,
  } = useAppSelector((state) => state.AppSlice);
  const stateBoxRef: any = useRef();
  const [formData, setFormData] = useState({
    amount: 0,
  });
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);

  const [postsPerPage, sePostsPerPage] = useState(4);

  const [transactionState, setTransactionState] = useState("PENDING");

  const { toast } = createStandaloneToast();
  const dispatch = useAppDispatch();

  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTransactionStateChange = (e: any) => {
    if (e.target.value === "") return;
    console.log(132, e.target.value);
    setTransactionState(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentDeposits = manageUserDeposits.slice(
    indexofFirstPost,
    indexOfLastPost
  );
  const makeTransactionStateChange = (id: any, transactionstatedata: any) => {
    dispatch(sendTransactionState([id, transactionstatedata]));
  };

  useEffect(() => {
    if (usersState.isSuccess) {
      toast({
        title: "Success",
        description: "account state changed successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading2(false);
      dispatch(getUser(params.id));
    }
    if (usersState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading2(false);
    }

    if (usersState.isLoading) {
      setisLoading2(true);
    }

    dispatch(resetUsersState());
  }, [
    usersState.isSuccess,
    usersState.isError,
    usersState.isLoading,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(getMyUserDeposits(params.id));
  }, []);
  useEffect(() => {
    if (updateState.isSuccess) {
      toast({
        title: "Success",
        description: "Updated Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      const x = async () => {
        dispatch(getMyUserDeposits(params.id));
        dispatch(getUser(params.id));
        setisLoading(false);
      };
      x();
    }
    if (updateState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
    }
    if (updateState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetUpdateState());
  }, [updateState.isSuccess, updateState.isError, updateState.isLoading]);
  useEffect(() => {
    if (sendState.isSuccess) {
      toast({
        title: "Success",
        description: "Sent Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(getUser(params.id));
      dispatch(getMyUserDeposits(params.id));
      setisLoading(false);
    }
    if (sendState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
    }
    if (sendState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetSendState());
  }, [sendState.isSuccess, sendState.isError, sendState.isLoading, dispatch]);
  useEffect(() => {
    if (updateDepositState.isSuccess) {
      toast({
        title: "Success",
        description: "Sent Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(getMyUserDeposits(params.id));
      dispatch(getUser(params.id));
      setisLoading(false);
    }
    if (updateDepositState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
    }
    if (updateDepositState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetUpdateDepositState());
  }, [
    updateDepositState.isSuccess,
    updateDepositState.isError,
    updateDepositState.isLoading,
  ]);

  return (
    <div className={`${styles.manage_user_block}`}>
      {isLoading && <SpinnerPage />}
      {isLoading2 && <SpinnerPage />}
      <section className={`${styles.manage_user_head}`}>
        <h1>Manage User</h1>
        <small>Dashboard</small>
      </section>
      <UserInformation />
      <UserBalance />
      <UserCreateDeposit />
      <UserProfile />
      <UserWithdrawMessage />
      <UserNotifications />

      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <RiLuggageDepositFill />
            <p>Deposits</p>
          </div>
          <TableContainer gap={1}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {/* <Th fontSize={11}>S/N</Th> */}
                  <Th fontSize={11}>Amount</Th>
                  <Th fontSize={11}>Amt change</Th>
                  <Th fontSize={11}>Method</Th>
                  <Th fontSize={11}>Wallet</Th>
                  <Th fontSize={11}>Status</Th>
                  <Th fontSize={11}>Time</Th>

                  <Th fontSize={11} isNumeric>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {[...currentDeposits].map((manageUserDeposit: any, index) => {
                  const date = new Date(`${manageUserDeposit.createdAt}`);
                  const options: any = {
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  };

                  const formattedDate = `${date.toLocaleDateString(
                    "en-US",
                    options
                  )}`;
                  return (
                    <Tr key={manageUserDeposit.id}>
                      {/* <Td fontSize={11}>{index + 1}</Td> */}
                      <Td fontSize={11}>${manageUserDeposit.amount}</Td>
                      <Td fontSize={11}>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(
                              updateDeposit([manageUserDeposit.id, formData])
                            );
                          }}
                        >
                          <Flex
                            direction={"column"}
                            gap={1}
                            justify={"center"}
                            align={"center"}
                            maxW={20}
                            minW={"6rem"}
                          >
                            <Input
                              type="number"
                              fontSize={12}
                              maxW={16}
                              required
                              size={"sm"}
                              name="amount"
                              defaultValue={manageUserDeposit.amount}
                              //   value={manageUserDeposit.amount}
                              onChange={handleInputChange}
                            />
                            <Button
                              fontSize={11}
                              w="100%"
                              size={"sm"}
                              maxW={16}
                              type="submit"
                              // onClick={() =>
                              //   makeTransactionStateChange(manageUserDeposit.id, {
                              //     transactionState,
                              //   })
                              // }
                              colorScheme="whatsapp"
                            >
                              Update
                            </Button>
                          </Flex>
                        </form>
                      </Td>
                      <Td fontSize={11}>{manageUserDeposit.asset}</Td>
                      <Td fontSize={11}>{manageUserDeposit.to}</Td>
                      <Td fontSize={11}>
                        {manageUserDeposit.transactionState === "PENDING" ? (
                          <Text
                            fontSize={14}
                            fontWeight={"bold"}
                            color="#3a7ae0"
                          >
                            PENDING
                          </Text>
                        ) : manageUserDeposit.transactionState ===
                          "NOT_VERIFIED" ? (
                          <Text
                            size={"sm"}
                            fontSize={14}
                            fontWeight={"bold"}
                            color="red"
                          >
                            REJECTED
                          </Text>
                        ) : (
                          <Text
                            size={"sm"}
                            fontSize={14}
                            fontWeight={"bold"}
                            color="#248724"
                          >
                            VERIFIED
                          </Text>
                        )}
                      </Td>
                      <Td fontSize={11}>{formattedDate}</Td>
                      <Td fontSize={11}>
                        {" "}
                        <Flex
                          direction={"column"}
                          gap={1}
                          align={"center"}
                          minW={"6rem"}
                        >
                          <Select
                            cursor={"pointer"}
                            fontSize={11}
                            onClick={handleTransactionStateChange}
                            px={0}
                            placeholder={
                              manageUserDeposit.transactionState ===
                              "NOT_VERIFIED"
                                ? "REJECTED"
                                : manageUserDeposit.transactionState
                            }
                            size="sm"
                          >
                            {manageUserDeposit.transactionState !==
                              "PENDING" && <option>PENDING</option>}
                            {manageUserDeposit.transactionState !==
                              "VERIFIED" && <option>VERIFIED</option>}
                            {manageUserDeposit.transactionState !==
                              "NOT_VERIFIED" && (
                              <option value={"NOT_VERIFIED"}>REJECTED</option>
                            )}
                          </Select>
                          <Button
                            fontSize={11}
                            maxW={24}
                            size={"sm"}
                            w="100%"
                            onClick={() =>
                              makeTransactionStateChange(manageUserDeposit.id, {
                                transactionState,
                              })
                            }
                            colorScheme="whatsapp"
                          >
                            Update
                          </Button>
                          <Button
                            fontSize={11}
                            maxW={24}
                            size={"sm"}
                            w="100%"
                            type="button"
                            onClick={() =>
                              dispatch(deleteDeposit(manageUserDeposit.id))
                            }
                            colorScheme="red"
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  {/* <Th fontSize={11} isNumeric>
                    S/N
                  </Th> */}
                  <Th fontSize={11} isNumeric>
                    Amount
                  </Th>
                  <Th fontSize={11}>Amt change</Th>

                  <Th fontSize={11}>Method</Th>

                  <Th fontSize={11}>Wallet</Th>
                  <Th fontSize={11}>Status</Th>

                  <Th fontSize={11}>Created</Th>
                  <Th fontSize={11}>Action</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Table>
            <TableCaption>
              {" "}
              Showing {indexofFirstPost + 1} to{" "}
              {indexofFirstPost + currentDeposits.length} of{" "}
              {manageUserDeposits.length} entries{" "}
            </TableCaption>
          </Table>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={manageUserDeposits.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
        </div>
      </section>
    </div>
  );
};

export default ManageUser;
