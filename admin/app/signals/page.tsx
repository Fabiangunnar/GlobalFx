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
import {
  deleteTradeSignal,
  getAllSignals,
  getAllTradeSignals,
  TradingSignalDto,
} from "@/redux/features/AppSlice";
import { CreateSignalModal } from "@/components/ModalPage";
import { useDisclosure } from "@chakra-ui/react";
import { ModalOverlay } from "@chakra-ui/react";

type Props = {};

const Deposits = (props: Props) => {
  const { tradingSignal, signalState, errorMessage } = useAppSelector(
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
  const allSignals = [...tradingSignal].sort((a, b) => {
    const dateA = new Date(a.createdAt || "");
    const dateB = new Date(b.createdAt || "");

    return dateB.getTime() - dateA.getTime();
  });
  const currentPosts = allSignals.slice(indexofFirstPost, indexOfLastPost);
  const modal = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(10deg)"
    />
  );
  const [updateSignal, setUpdateSignal] = useState(false);
  const [tradeSignal, setTradeSignal] = useState({
    title: "",
    id: "",
    description: "",
    price: 0,
    percentage: 0,
  });

  useEffect(() => {
    dispatch(getAllTradeSignals());
  }, [dispatch]);

  return (
    <>
      <section className={`${styles.user_block}`}>
        {isLoading && <SpinnerPage />}

        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <RiLuggageDepositFill />
            <p>Signals</p>
          </div>
          <div>
            <Flex p={2} justify={"between"} align={"center"}>
              <div className="w-full flex ">
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    setUpdateSignal(false);
                    setTradeSignal({
                      title: "",
                      id: "",
                      description: "",
                      price: 0,
                      percentage: 0,
                    });
                    modal.onOpen();
                  }}
                >
                  Create Signal
                </Button>
              </div>
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
                    <Th fontSize={12}>Title</Th>
                    <Th fontSize={12}>Price</Th>
                    <Th fontSize={12}>Percentage</Th>
                    <Th fontSize={12}>Description</Th>
                    <Th fontSize={12}>Time Created</Th>
                    <Th fontSize={12}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tradingSignal.length > 0 ? (
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

                          <Td fontSize={11}>{signal.title}</Td>
                          <Td fontSize={11}>${signal.price}</Td>
                          <Td fontSize={11}>{signal.percentage}%</Td>
                          <Td fontSize={11}>{signal.description}</Td>

                          <Td fontSize={11}>{formattedDate}</Td>
                          <Td fontSize={11}>
                            <Flex gap={2} direction={"column"}>
                              <Button
                                colorScheme="blue"
                                size={"sm"}
                                onClick={() => {
                                  setTradeSignal({
                                    id: signal.id!,
                                    title: signal.title,
                                    description: signal.description,
                                    price: signal.price,
                                    percentage: signal.percentage,
                                  });
                                  setUpdateSignal(true);
                                  modal.onOpen();
                                }}
                              >
                                Update
                              </Button>
                              <Button
                                colorScheme="red"
                                size={"sm"}
                                onClick={() => {
                                  dispatch(deleteTradeSignal(signal.id!));
                                }}
                              >
                                Delete
                              </Button>
                            </Flex>
                          </Td>
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
                    <Th fontSize={11}>Title</Th>
                    <Th fontSize={11}>Price</Th>
                    <Th fontSize={11}>Percentage</Th>
                    <Th fontSize={11}>Description</Th>
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
                {indexofFirstPost + currentPosts.length} of{" "}
                {tradingSignal.length} entries{" "}
              </TableCaption>
            </Table>
            <Flex p={4}>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={tradingSignal.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Flex>
          </div>
        </div>
      </section>
      <CreateSignalModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        overlay={<OverlayOne />}
        tradeSignal={{
          id: tradeSignal.id,
          title: tradeSignal.title,
          description: tradeSignal.description,
          price: tradeSignal.price,
          percentage: tradeSignal.percentage,
        }}
        updateSignal={updateSignal}
      />
    </>
  );
};

export default Deposits;
