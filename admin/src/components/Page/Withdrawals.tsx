import React, { Fragment, useEffect, useState } from "react";
import styles from "@/styles/pages/User.module.scss";
import { BiMoneyWithdraw } from "react-icons/bi";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
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
  Tr,
  createStandaloneToast,
} from "@chakra-ui/react";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store/store";
import { getAllDeposits, getAllWithdrawals } from "@/redux-actions/AppSlice";

type Props = {};

const Withdrawals = (props: Props) => {
  const [postsPerPage, sePostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = createStandaloneToast();
  const { withdrawals, users, sendState, errorMessage } = useSelector(
    (state: RootState) => state.AppSlice
  );
  const dispatch = useDispatch();
  const [transactionState, setTransactionState] = useState("PENDING");
  const [isLoading, setisLoading] = useState(false);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = withdrawals.slice(indexofFirstPost, indexOfLastPost);
  const paginate = (number: any) => {};

  const handleTransactionStateChange = (e: any) => {
    if (e.target.value === "") return;
    setTransactionState(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllWithdrawals());
  }, []);
  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <BiMoneyWithdraw />
          <p>Withdrawals</p>
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
                {withdrawals.length > 0 ? (
                  [...currentPosts].map((withdrawal, index) => {
                    const date = new Date(`${withdrawal.createdAt}`);
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
                      <Tr key={withdrawal.id}>
                        <Td fontSize={11} isNumeric>
                          {index + 1}
                        </Td>
                        <Td fontSize={11}>
                          {`${withdrawal.firstname} ${withdrawal.lastname}`}
                        </Td>
                        <Td fontSize={11}>${withdrawal.amount}</Td>
                        <Td fontSize={11}>{withdrawal.asset}</Td>
                        <Td fontSize={11}>{withdrawal.walletAddress}</Td>
                        <Td fontSize={11}>
                          {withdrawal.transactionState === "PENDING" ? (
                            <Text
                              fontSize={14}
                              fontWeight={"bold"}
                              color="#3a7ae0">
                              PENDING
                            </Text>
                          ) : withdrawal.transactionState === "NOT_VERIFIED" ? (
                            <Text
                              size={"sm"}
                              fontSize={14}
                              fontWeight={"bold"}
                              color="red">
                              NOT_VERIFIED
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
                                withdrawal.transactionState === "NOT_VERIFIED"
                                  ? "REJECTED"
                                  : withdrawal.transactionState
                              }
                              size="sm">
                              {withdrawal.transactionState !== "PENDING" && (
                                <option>PENDING</option>
                              )}
                              {withdrawal.transactionState !== "VERIFIED" && (
                                <option>VERIFIED</option>
                              )}
                              {withdrawal.transactionState !==
                                "NOT_VERIFIED" && (
                                <option value={"NOT_VERIFIED"}>REJECTED</option>
                              )}
                            </Select>
                            <Button
                              fontSize={11}
                              maxW={24}
                              size={"sm"}
                              w="100%"
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
                    <Td fontSize={12}>No Withdrawals yet</Td>
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
              {indexofFirstPost + currentPosts.length} of {withdrawals.length}{" "}
              entries{" "}
            </TableCaption>
          </Table>

          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={withdrawals.length}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
        </div>
      </div>
    </section>
  );
};

export default Withdrawals;
