"use client";
import React, { Fragment, useEffect, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
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
import { RiLuggageDepositFill } from "react-icons/ri";
import SpinnerPage from "@/components/Spinner";
import Pagination from "@/components/Pagination";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getAllSignals } from "@/redux/features/AppSlice";

type Props = {};

const Deposits = (props: Props) => {
  const { signals, signalState, errorMessage } = useAppSelector(
    (state) => state.AppSlice
  );

  const dispatch = useAppDispatch();
  const { toast } = createStandaloneToast();
  const [isLoading, setisLoading] = useState(false);
  const [transactionState, setTransactionState] = useState("PENDING");
  const [postsPerPage, sePostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const allSignals = [...signals].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });
  const currentPosts = allSignals.slice(indexofFirstPost, indexOfLastPost);

  useEffect(() => {
    dispatch(getAllSignals());
  }, [dispatch]);

  return (
    <section className={`${styles.user_block}`}>
      {isLoading && <SpinnerPage />}

      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <RiLuggageDepositFill />
          <p>Signals</p>
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
                  <Th fontSize={12}>Name</Th>
                  <Th fontSize={12}>Amount</Th>
                  <Th fontSize={12}>Percentage</Th>
                  <Th fontSize={12}>Description</Th>
                  <Th fontSize={12}>Time Created</Th>
                </Tr>
              </Thead>
              <Tbody>
                {signals.length > 0 ? (
                  [...currentPosts].map((signal, index) => {
                    const date = new Date(`${signal.createdAt}`);
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
                      <Tr key={signal.id}>
                        <Td fontSize={11} isNumeric>
                          {index + 1}
                        </Td>
                        <Td fontSize={11}>
                          {`${signal.user.firstname} ${signal.user.lastname}`}
                        </Td>
                        <Td fontSize={11}>{signal.name}</Td>
                        <Td fontSize={11}>${signal.amount}</Td>
                        <Td fontSize={11}>{signal.percentage}%</Td>
                        <Td fontSize={11}>{signal.description}</Td>

                        <Td fontSize={11}>{formattedDate}</Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>-</Td>
                    <Td fontSize={12}>No Signals here</Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={11} isNumeric>
                    S/N
                  </Th>
                  <Th fontSize={11}>Username</Th>
                  <Th fontSize={11}>Name</Th>
                  <Th fontSize={11}>Amount</Th>
                  <Th fontSize={11}>Percentage</Th>
                  <Th fontSize={11}>Description</Th>
                  <Th fontSize={11}>Time Created</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Table>
            <TableCaption>
              {" "}
              Showing {indexofFirstPost + 1} to{" "}
              {indexofFirstPost + currentPosts.length} of {signals.length}{" "}
              entries{" "}
            </TableCaption>
          </Table>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={signals.length}
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
