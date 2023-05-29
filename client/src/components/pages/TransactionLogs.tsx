import React, {useEffect, useState} from "react";
import styles from "@/styles/pages/User.module.scss";
import {
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  TableContainer,
  Table,
  TableCaption,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import {CiLink} from "react-icons/ci";
import {useSelector, useDispatch} from "react-redux";

import {setCurrentPage, setNavLink} from "@/redux-actions/navSlice";
import {getAllDeposits, getAllWithdrawals} from "@/redux-actions/HomeAppSlice";
import {RootState} from "@/redux-store/store";
import {MdAccountBalance} from "react-icons/md";
import {BiMoneyWithdraw} from "react-icons/bi";
import Pagination from "./Pagination";
import {BsClockHistory} from "react-icons/bs";

type Props = {};

const TransactionLogs = (props: Props) => {
  const {depositHistory, tradeHistory, userInfo, withdrawalHistory} =
    useSelector((state: RootState) => state.HomeAppSlice);
  const dispatch = useDispatch();

  const [currentDepositPostPage, setCurrentDepositPostPage] = useState(1);
  const [currentWithdrawPostPage, setCurrentWithdrawPostPage] = useState(1);
  const [currentTradesPostPage, setCurrentTradesPostPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const indexOfLastWithdrawPost = currentWithdrawPostPage * postsPerPage;
  const indexOfLastDepositPost = currentDepositPostPage * postsPerPage;
  const indexOfLastTradesPage = currentTradesPostPage * postsPerPage;
  const indexofFirstDepositPost = indexOfLastDepositPost - postsPerPage;
  const indexofFirstTradesPage = indexOfLastTradesPage - postsPerPage;
  const indexofFirstWithdrawPost = indexOfLastWithdrawPost - postsPerPage;
  const currentWithdrawalPosts = withdrawalHistory.slice(
    indexofFirstWithdrawPost,
    indexOfLastWithdrawPost
  );
  const currentDepositsPosts = depositHistory.slice(
    indexofFirstDepositPost,
    indexOfLastDepositPost
  );
  const currentTradesPage = tradeHistory.slice(
    indexofFirstTradesPage,
    indexOfLastTradesPage
  );

  const handleClick = (link: string, id: object) => {
    dispatch(setNavLink(id));
    dispatch(setCurrentPage(link));
  };
  let hasDepositForUser = false;

  depositHistory.forEach((item) => {
    if (userInfo?.id === item.userId) {
      hasDepositForUser = true;
    }
  });
  console.log(withdrawalHistory);

  useEffect(() => {
    dispatch(getAllDeposits(userInfo?.id));
    dispatch(getAllWithdrawals(userInfo?.id));
  }, []);

  return (
    <div className={`${styles.manage_user_block}`}>
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
        <Box background={"#759c4930"} className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <BsClockHistory />
            <p>Deposits history</p>
          </div>

          <TableContainer gap={1} height={"17rem"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={12} color={"#fff"}>
                    Type
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Amount
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Date
                  </Th>
                  <Th fontSize={12} color={"#fff"} isNumeric>
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {depositHistory.length > 0 ? (
                  <>
                    {[...currentDepositsPosts]
                      .sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);

                        return dateB.getTime() - dateA.getTime();
                      })
                      .map((item, index) => {
                        const date = new Date(`${item.createdAt}`);

                        const options: any = {
                          // weekday: "long",
                          //   year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          //   second: "numeric",
                          //   timeZoneName: "short",
                        };

                        const formattedDate = `${date.toLocaleDateString(
                          "en-US",
                          options
                        )}`;
                        if (userInfo?.id === item.userId) {
                          return (
                            <Tr key={item.id}>
                              <Td fontSize={12} color={"#fff"}>
                                {item.asset}
                              </Td>
                              <Td fontSize={12} color={"#fff"}>
                                {item.amount}
                              </Td>
                              <Td fontSize={12} color={"#fff"}>
                                {formattedDate}
                              </Td>
                              <Td
                                fontSize={12}
                                color={"#fff"}
                                isNumeric
                                w={"8rem"}
                              >
                                {item.transactionState === "PENDING" ? (
                                  <Button
                                    colorScheme="messenger"
                                    size={"sm"}
                                    width={"100%"}
                                    fontSize={11}
                                  >
                                    PENDING
                                  </Button>
                                ) : item.transactionState === "VERIFIED" ? (
                                  <Button
                                    colorScheme="whatsapp"
                                    size={"sm"}
                                    width={"100%"}
                                    fontSize={11}
                                  >
                                    VERIFIED
                                  </Button>
                                ) : (
                                  <Button
                                    colorScheme="red"
                                    size={"sm"}
                                    width={"100%"}
                                    fontSize={11}
                                  >
                                    REJECTED
                                  </Button>
                                )}
                              </Td>
                            </Tr>
                          );
                        }
                      })}
                  </>
                ) : (
                  <Tr>
                    <Td></Td>
                    <Td fontSize={12}>No deposits from you</Td>
                    <Td></Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={12} color={"#fff"}>
                    Type
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Amount
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Date
                  </Th>
                  <Th fontSize={12} color={"#fff"} isNumeric>
                    Status
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          {depositHistory.length > 0 && (
            <Flex
              direction={"column"}
              gap={1}
              paddingInline={2}
              paddingBottom={2}
            >
              <Table>
                <TableCaption fontSize={12} color={"#fff"}>
                  {" "}
                  Showing {indexofFirstDepositPost + 1}{" "}
                  {currentDepositsPosts.length > 1 && (
                    <>
                      to {indexofFirstDepositPost + currentDepositsPosts.length}
                    </>
                  )}{" "}
                  of {depositHistory.length} entries{" "}
                </TableCaption>
              </Table>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={depositHistory.length}
                currentPage={currentDepositPostPage}
                setCurrentPage={setCurrentDepositPostPage}
              />
            </Flex>
          )}
        </Box>
      </section>
      <section className={`${styles.user_block}`}>
        <Box background={"#759c4930"} className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <BsClockHistory />
            <p>Withdrawal History</p>
          </div>

          <TableContainer gap={1} height={"17rem"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={12} color={"#fff"}>
                    Type
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Amount
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Date
                  </Th>
                  <Th fontSize={12} color={"#fff"} isNumeric>
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {withdrawalHistory.length > 0 ? (
                  <>
                    {[...currentWithdrawalPosts]
                      .sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);

                        return dateB.getTime() - dateA.getTime();
                      })
                      .map((item, index) => {
                        const date = new Date(`${item.createdAt}`);

                        const options: any = {
                          // weekday: "long",
                          //   year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          //   second: "numeric",
                          //   timeZoneName: "short",
                        };

                        const formattedDate = `${date.toLocaleDateString(
                          "en-US",
                          options
                        )}`;
                        if (userInfo?.id === item.userId) {
                          return (
                            <Tr key={item.id}>
                              <Td fontSize={12} color={"#fff"}>
                                {item.asset}
                              </Td>
                              <Td fontSize={12} color={"#fff"}>
                                {item.amount}
                              </Td>
                              <Td fontSize={12} color={"#fff"}>
                                {formattedDate}
                              </Td>
                              <Td
                                fontSize={12}
                                color={"#fff"}
                                isNumeric
                                w={"8rem"}
                              >
                                {item.transactionState === "PENDING" ? (
                                  <Button
                                    colorScheme="messenger"
                                    size={"sm"}
                                    width={"100%"}
                                    fontSize={11}
                                  >
                                    PENDING
                                  </Button>
                                ) : item.transactionState === "VERIFIED" ? (
                                  <Button
                                    colorScheme="whatsapp"
                                    size={"sm"}
                                    width={"100%"}
                                    fontSize={11}
                                  >
                                    VERIFIED
                                  </Button>
                                ) : (
                                  <Button
                                    colorScheme="red"
                                    size={"sm"}
                                    width={"100%"}
                                    fontSize={11}
                                  >
                                    REJECTED
                                  </Button>
                                )}
                              </Td>
                            </Tr>
                          );
                        }
                      })}
                  </>
                ) : (
                  <Tr>
                    <Td></Td>
                    <Td fontSize={12}>No withdrawals from you</Td>
                    <Td></Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={12} color={"#fff"}>
                    Type
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Amount
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Date
                  </Th>
                  <Th fontSize={12} color={"#fff"} isNumeric>
                    Status
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          {withdrawalHistory.length > 0 && (
            <Flex
              direction={"column"}
              gap={1}
              paddingInline={2}
              paddingBottom={3}
            >
              <Table>
                <TableCaption fontSize={12} color={"#fff"}>
                  {" "}
                  Showing {indexofFirstWithdrawPost + 1}{" "}
                  {currentWithdrawalPosts.length > 1 && (
                    <>
                      to{" "}
                      {indexofFirstWithdrawPost + currentWithdrawalPosts.length}
                    </>
                  )}{" "}
                  of {withdrawalHistory.length} entries{" "}
                </TableCaption>
              </Table>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={withdrawalHistory.length}
                currentPage={currentWithdrawPostPage}
                setCurrentPage={setCurrentWithdrawPostPage}
              />
            </Flex>
          )}
        </Box>
      </section>
      <section className={`${styles.user_block}`}>
        <Box background={"#759c4930"} className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <BsClockHistory />
            <p>Trades History</p>
          </div>

          <TableContainer gap={1} height={"15rem"}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={12} color={"#fff"}>
                    Pairs
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Amount
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Position
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {tradeHistory.length > 0 ? (
                  <>
                    {[...currentTradesPage].map((item, index) => {
                      return (
                        <Tr key={item.id}>
                          <Td fontSize={12} color={"#fff"}>
                            {item.pairs}
                          </Td>
                          <Td fontSize={12} color={"#fff"}>
                            {item.amount}
                          </Td>
                          <Td fontSize={12} color={"#fff"}>
                            {item.position}
                          </Td>
                        </Tr>
                      );
                    })}
                  </>
                ) : (
                  <Tr>
                    <Td></Td>
                    <Td fontSize={12}>No trades from you</Td>
                    <Td></Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={12} color={"#fff"}>
                    Pairs
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Amount
                  </Th>
                  <Th fontSize={12} color={"#fff"}>
                    Position
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          {tradeHistory.length > 0 && (
            <Flex
              direction={"column"}
              gap={1}
              paddingInline={2}
              paddingBottom={3}
            >
              <Table>
                <TableCaption fontSize={12} color={"#fff"}>
                  {" "}
                  Showing {indexofFirstTradesPage + 1}{" "}
                  {currentTradesPage.length > 1 && (
                    <>to {indexofFirstTradesPage + currentTradesPage.length}</>
                  )}{" "}
                  of {tradeHistory.length} entries{" "}
                </TableCaption>
              </Table>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={tradeHistory.length}
                currentPage={currentTradesPostPage}
                setCurrentPage={setCurrentTradesPostPage}
              />
            </Flex>
          )}
        </Box>
      </section>
    </div>
  );
};

export default TransactionLogs;
