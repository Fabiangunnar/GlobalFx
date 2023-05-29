import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/User.module.scss";
import { GiTrade } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store/store";
import { getAllTrades } from "@/redux-actions/AppSlice";
import {
  Box,
  Button,
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

type Props = {};

const Trades = (props: Props) => {
  const { trades } = useSelector((state: RootState) => state.AppSlice);
  const dispatch = useDispatch();

  const [postsPerPage, sePostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = trades.slice(indexofFirstPost, indexOfLastPost);

  useEffect(() => {
    dispatch(getAllTrades());
  }, [dispatch]);
  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <GiTrade />
          <p>Trades</p>
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
                  <Th fontSize={12}>S/N</Th>
                  <Th fontSize={12}>Username</Th>
                  <Th fontSize={12}>Pairs</Th>
                  <Th fontSize={12}>Amount</Th>
                  <Th fontSize={12} isNumeric>
                    Position
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {trades.length > 0 ? (
                  [...currentPosts].map((trade, index) => (
                    <Tr key={trade.id}>
                      <Td fontSize={11} isNumeric>
                        {index + 1}
                      </Td>
                      <Td fontSize={11}>{trade.username}</Td>
                      <Td fontSize={11}>{trade.pairs}</Td>
                      <Td fontSize={11}>${trade.amount}</Td>
                      <Td fontSize={11}>{trade.position}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td>-</Td>
                    <Td fontSize={12}>No Deposits here</Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={12}>S/N</Th>
                  <Th fontSize={12}>Username</Th>
                  <Th fontSize={12}>Pairs</Th>
                  <Th fontSize={12}>Amount</Th>
                  <Th fontSize={12} isNumeric>
                    Position
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Table>
            <TableCaption>
              {" "}
              Showing {indexofFirstPost + 1} to{" "}
              {indexofFirstPost + currentPosts.length} of {trades.length}{" "}
              entries{" "}
            </TableCaption>
          </Table>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={trades.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
        </div>
      </div>
    </section>
  );
};

export default Trades;
