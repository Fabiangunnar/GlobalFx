import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/User.module.scss";
import { AiOutlineBarChart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store/store";
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
import {
  getAllInvestments,
  resetUsersState,
  verifyInvestment,
} from "@/redux-actions/AppSlice";
import SpinnerPage from "./Spinner";

type Props = {};

const Investments = (props: Props) => {
  const { investmentHistory, usersState, errorMessage } = useSelector(
    (state: RootState) => state.AppSlice
  );
  const [postsPerPage, sePostsPerPage] = useState(8);
  const { toast } = createStandaloneToast();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("PENDING");
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentInvestmentHistory = investmentHistory.slice(
    indexofFirstPost,
    indexOfLastPost
  );
  const handleTransactionStateChange = (e: any) => {
    if (e.target.value === "") return;
    setStatus(e.target.value);
  };
  const makeTransactionStateChange = (id: any, transactionstatedata: any) => {
    dispatch(verifyInvestment([id, transactionstatedata]));
  };

  // verifyInvestment
  useEffect(() => {
    dispatch(getAllInvestments());
  }, []);
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
      setisLoading(false);
      dispatch(getAllInvestments());
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
      setisLoading(false);
    }

    if (usersState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetUsersState());
  }, [
    usersState.isSuccess,
    usersState.isError,
    usersState.isLoading,
    dispatch,
  ]);
  return (
    <section className={`${styles.user_block}`}>
      {isLoading && <SpinnerPage />}

      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <AiOutlineBarChart />
          <p>Investments</p>
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

                  <Th fontSize={12}>Name</Th>
                  <Th fontSize={12}>Amount</Th>
                  <Th fontSize={12}>Plan</Th>
                  <Th fontSize={12}>Status</Th>
                  <Th fontSize={12}>Time Created</Th>
                  <Th fontSize={11} isNumeric>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {investmentHistory.length > 0 ? (
                  [...currentInvestmentHistory].map((investment, index) => {
                    const date = new Date(`${investment.createdAt}`);
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
                      <Tr key={investment.id}>
                        <Td fontSize={11} isNumeric>
                          {index + 1}
                        </Td>
                        <Td fontSize={11}>
                          {`${investment.firstname} ${investment.lastname}`}
                        </Td>
                        <Td fontSize={11}>${investment.amount}</Td>
                        <Td fontSize={11}>{investment.plan}</Td>
                        <Td fontSize={11}>
                          {investment.status === "PENDING" ? (
                            <Text
                              fontSize={14}
                              fontWeight={"bold"}
                              color="#3a7ae0">
                              PENDING
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
                              placeholder={investment.status}
                              size="sm">
                              {investment.status !== "PENDING" && (
                                <option>PENDING</option>
                              )}
                              {investment.status !== "VERIFIED" && (
                                <option>VERIFIED</option>
                              )}
                            </Select>
                            <Button
                              fontSize={11}
                              maxW={24}
                              size={"sm"}
                              w="100%"
                              onClick={() =>
                                makeTransactionStateChange(investment.id, {
                                  status,
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
                    <Td fontSize={12} isNumeric>
                      -
                    </Td>
                    <Td fontSize={12}>No investments yet</Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={12}>S/N</Th>

                  <Th fontSize={12}>Name</Th>
                  <Th fontSize={12}>Amount</Th>
                  <Th fontSize={12}>Plan</Th>
                  <Th fontSize={12}>Status</Th>
                  <Th fontSize={12}>Time Created</Th>
                  <Th fontSize={11} isNumeric>
                    Action
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Table>
            <TableCaption>
              {" "}
              Showing {indexofFirstPost + 1} to{" "}
              {indexofFirstPost + currentInvestmentHistory.length} of{" "}
              {investmentHistory.length} entries{" "}
            </TableCaption>
          </Table>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={investmentHistory.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
        </div>
      </div>
    </section>
  );
};

export default Investments;
