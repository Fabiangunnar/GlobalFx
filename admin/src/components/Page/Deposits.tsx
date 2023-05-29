import React, { Fragment, useEffect, useState } from "react";
import styles from "@/styles/pages/User.module.scss";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Select,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Text,
  Tr,
  createStandaloneToast,
} from "@chakra-ui/react";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RiLuggageDepositFill } from "react-icons/ri";
import { RootState } from "@/redux-store/store";
import {
  getAllDeposits,
  resetSendState,
  sendTransactionState,
} from "@/redux-actions/AppSlice";
import handler from "@/pages/api/hello";
import SpinnerPage from "./Spinner";
type Props = {};

const Deposits = (props: Props) => {
  const { deposits, users, sendState, errorMessage } = useSelector(
    (state: RootState) => state.AppSlice
  );

  const dispatch = useDispatch();
  const { toast } = createStandaloneToast();
  const [isLoading, setisLoading] = useState(false);
  const [transactionState, setTransactionState] = useState("PENDING");
  const [postsPerPage, sePostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = deposits.slice(indexofFirstPost, indexOfLastPost);

  const handleTransactionStateChange = (e: any) => {
    if (e.target.value === "") return;
    setTransactionState(e.target.value);
  };
  const makeTransactionStateChange = (id: any, transactionstatedata: any) => {
    dispatch(sendTransactionState([id, transactionstatedata]));
  };

  useEffect(() => {
    dispatch(getAllDeposits());
  }, [dispatch]);
  useEffect(() => {
    if (sendState.isSuccess) {
      toast({
        title: "Success",
        description: "Deposit Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
      dispatch(getAllDeposits());
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
  return (
    <section className={`${styles.user_block}`}>
      {isLoading && <SpinnerPage />}

      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <RiLuggageDepositFill />
          <p>Deposits</p>
        </div>
        <div>
          <Flex p={2}>
            <Spacer />
            <Box>
              <Input p={2} placeholder="Search ..." fontSize={12} />
            </Box>
          </Flex>
          <TableContainer gap={1}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={12} isNumeric>
                    S/N
                  </Th>
                  <Th fontSize={12}>Username</Th>
                  <Th fontSize={12}>Amount</Th>
                  <Th fontSize={12}>Asset</Th>
                  <Th fontSize={12}>Wallet</Th>
                  <Th fontSize={12}>Status</Th>
                  <Th fontSize={12}>Time Created</Th>
                  <Th fontSize={12}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {deposits.length > 0 ? (
                  [...currentPosts].map((deposit, index) => {
                    const date = new Date(`${deposit.createdAt}`);
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
                      <Tr key={deposit.id}>
                        <Td fontSize={11} isNumeric>
                          {index + 1}
                        </Td>
                        <Td fontSize={11}>
                          {`${deposit.firstname} ${deposit.lastname}`}
                        </Td>
                        <Td fontSize={11}>${deposit.amount}</Td>
                        <Td fontSize={11}>{deposit.asset}</Td>
                        <Td fontSize={11}>{deposit.to}</Td>
                        <Td fontSize={11}>
                          {deposit.transactionState === "PENDING" ? (
                            <Text
                              fontSize={14}
                              fontWeight={"bold"}
                              color="#3a7ae0">
                              PENDING
                            </Text>
                          ) : deposit.transactionState === "NOT_VERIFIED" ? (
                            <Text
                              size={"sm"}
                              fontSize={14}
                              fontWeight={"bold"}
                              color="red">
                              REJECTED
                            </Text>
                          ) : (
                            <Text
                              size={"sm"}
                              fontSize={14}
                              fontWeight={"bold"}
                              color="#248724">
                              VERIFIED
                            </Text>
                          )}
                        </Td>
                        <Td fontSize={11}>{formattedDate}</Td>
                        <Td fontSize={11}>
                          <Flex
                            direction={"column"}
                            gap={1}
                            align={"center"}
                            minW={"6rem"}>
                            <Select
                              cursor={"pointer"}
                              fontSize={11}
                              onClick={handleTransactionStateChange}
                              px={0}
                              placeholder={
                                deposit.transactionState === "NOT_VERIFIED"
                                  ? "REJECTED"
                                  : deposit.transactionState
                              }
                              size="sm">
                              {deposit.transactionState !== "PENDING" && (
                                <option>PENDING</option>
                              )}
                              {deposit.transactionState !== "VERIFIED" && (
                                <option>VERIFIED</option>
                              )}
                              {deposit.transactionState !== "NOT_VERIFIED" && (
                                <option value={"NOT_VERIFIED"}>REJECTED</option>
                              )}
                            </Select>
                            <Button
                              fontSize={11}
                              maxW={24}
                              size={"sm"}
                              w="100%"
                              onClick={() =>
                                makeTransactionStateChange(deposit.id, {
                                  transactionState,
                                })
                              }
                              colorScheme="whatsapp">
                              Update
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>-</Td>
                    <Td fontSize={12}>No Deposits here</Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={11} isNumeric>
                    S/N
                  </Th>
                  <Th fontSize={11}>Username</Th>
                  <Th fontSize={11}>Amount</Th>
                  <Th fontSize={11}>Asset</Th>
                  <Th fontSize={11}>Wallet</Th>
                  <Th fontSize={11}>Status</Th>
                  <Th fontSize={11}>Time Created</Th>
                  <Th fontSize={11}>Action</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Table>
            <TableCaption>
              {" "}
              Showing {indexofFirstPost + 1} to{" "}
              {indexofFirstPost + currentPosts.length} of {deposits.length}{" "}
              entries{" "}
            </TableCaption>
          </Table>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={deposits.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
        </div>
      </div>
    </section>
  );
};

export default Deposits;
