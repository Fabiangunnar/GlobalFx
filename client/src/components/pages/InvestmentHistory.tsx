import React, { useState } from "react";
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
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import { RootState } from "@/redux-store/store";
import { useSelector } from "react-redux";
import { BsClockHistory } from "react-icons/bs";
import Pagination from "./Pagination";
type Props = {};

const InvestmentHistory = (props: Props) => {
  const { investmentHistory } = useSelector(
    (store: RootState) => store.HomeAppSlice
  );

  const [currentInvestmentPage, setCurrentInvestmentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const indexOfLastInvestment = currentInvestmentPage * postsPerPage;
  const indexofFirstInvestment = indexOfLastInvestment - postsPerPage;
  const currentInvestmentHistory = investmentHistory.slice(
    indexofFirstInvestment,
    indexOfLastInvestment
  );
  return (
    <section className={`${styles.user_block}`}>
      <Box className={`${styles.management_block}`} background={"#759c4930"}>
        <div className={`${styles.management_head}`}>
          <BsClockHistory />
          <p>Investment History</p>
        </div>

        <TableContainer gap={1}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize={12} color={"#fff"}>
                  ID
                </Th>
                <Th fontSize={12} color={"#fff"}>
                  Amount
                </Th>
                <Th fontSize={12} color={"#fff"}>
                  Plan
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
              {investmentHistory.length > 0 ? (
                <>
                  {[...currentInvestmentHistory]
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

                      return (
                        <Tr key={item.id}>
                          <Td fontSize={12} color={"#fff"}>
                            {index + 1}
                          </Td>
                          <Td fontSize={12} color={"#fff"}>
                            ${item.amount}
                          </Td>
                          <Td fontSize={12} color={"#fff"}>
                            {item.plan}
                          </Td>
                          <Td fontSize={12} color={"#fff"}>
                            {formattedDate}
                          </Td>
                          <Td fontSize={12} isNumeric color={"#fff"} w={"8rem"}>
                            {item.status === "PENDING" ? (
                              <Button
                                colorScheme="messenger"
                                size={"sm"}
                                width={"100%"}
                                fontSize={11}>
                                PENDING
                              </Button>
                            ) : item.status === "VERIFIED" ? (
                              <Button
                                colorScheme="whatsapp"
                                size={"sm"}
                                width={"100%"}
                                fontSize={11}>
                                VERIFIED
                              </Button>
                            ) : (
                              <Button
                                colorScheme="red"
                                size={"sm"}
                                width={"100%"}
                                fontSize={11}>
                                REJECTED
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      );
                    })}
                </>
              ) : (
                <Tr>
                  <Td fontSize={11}></Td>
                  <Td fontSize={11}>Nothing to see here, Make an Investment</Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th fontSize={12} color={"#fff"}>
                  ID
                </Th>
                <Th fontSize={12} color={"#fff"}>
                  Amount
                </Th>
                <Th fontSize={12} color={"#fff"}>
                  Plan
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
        {investmentHistory.length > 0 && (
          <Flex
            direction={"column"}
            gap={1}
            paddingInline={2}
            paddingBottom={2}>
            <Table>
              <TableCaption fontSize={12} color={"#fff"}>
                {" "}
                Showing {indexofFirstInvestment + 1}{" "}
                {currentInvestmentHistory.length > 1 && (
                  <>
                    to{" "}
                    {indexofFirstInvestment + currentInvestmentHistory.length}
                  </>
                )}{" "}
                of {investmentHistory.length} entries{" "}
              </TableCaption>
            </Table>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={investmentHistory.length}
              currentPage={currentInvestmentPage}
              setCurrentPage={setCurrentInvestmentPage}
            />
          </Flex>
        )}
      </Box>
    </section>
  );
};

export default InvestmentHistory;
