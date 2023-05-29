import React, { useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/pages/User.module.scss";
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
} from "@chakra-ui/react";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCodeSandboxSquare } from "react-icons/ai";
import { getAllKYCDocuments } from "@/redux-actions/AppSlice";
import { RootState } from "@/redux-store/store";
import PdfViewer from "./PdfViewer";

type Props = {};

const Kyc = (props: Props) => {
  const { posts, currentPostsPage, postsPerPage } = useSelector(
    (state: RootState) => state.mgmt
  );
  const { kycdocuments } = useSelector((state: RootState) => state.AppSlice);
  const dispatch = useDispatch();
  const indexOfLastPost = currentPostsPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);
  const paginate = (number: any) => {
    // setCurrentPage(number);
  };
  useEffect(() => {
    dispatch(getAllKYCDocuments());
  }, []);

  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <AiFillCodeSandboxSquare />
          <p>Kyc</p>
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
              <TableCaption>Showing 71 to 73 of 73 entries</TableCaption>
              <Thead>
                <Tr>
                  <Th fontSize={12} isNumeric>
                    S/N
                  </Th>

                  <Th fontSize={12}>Username</Th>
                  <Th fontSize={12}>Image1</Th>
                  <Th fontSize={12}>Image2</Th>
                  {/* <Th fontSize={12}>Status</Th> */}
                  <Th fontSize={12}>Time Created</Th>
                  {/* <Th fontSize={12}>Action</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {kycdocuments.length > 0 ? (
                  kycdocuments.map((kycdocument, index) => {
                    const date = new Date(`${kycdocument.createdAt}`);
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
                      <Tr key={kycdocument.id}>
                        <Td fontSize={11} isNumeric>
                          {index + 1}
                        </Td>
                        <Td fontSize={11}>
                          {`${kycdocument.firstname} ${kycdocument.lastname}`}
                        </Td>
                        <Td fontSize={11}>File Available</Td>
                        <Td fontSize={11}>File Available</Td>
                        {/* <Td fontSize={11}>
                          {" "}
                          {kycdocument.status === "PENDING" ? (
                            <Text
                              fontSize={14}
                              fontWeight={"bold"}
                              color="#3a7ae0">
                              PENDING
                            </Text>
                          ) : kycdocument.status === "NOT_VERIFIED" ? (
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
                        </Td> */}
                        <Td fontSize={11}>{formattedDate}</Td>
                        {/* <Td fontSize={11}>
                          <Flex direction={"column"} gap={1} align={"end"}>
                            <Select
                              cursor={"pointer"}
                              fontSize={11}
                              px={0}
                              size="sm">
                              <option>Set Pending</option>
                              <option>Set Verified</option>
                              <option>Set Not Verified</option>
                            </Select>
                            <Button
                              fontSize={11}
                              maxW={24}
                              colorScheme="whatsapp">
                              Update
                            </Button>
                          </Flex>
                        </Td> */}
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>-</Td>
                    <Td fontSize={12}>No Document uploaded yet</Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={12} isNumeric>
                    S/N
                  </Th>

                  <Th fontSize={12}>Username</Th>
                  <Th fontSize={12}>Image1</Th>
                  <Th fontSize={12}>Image2</Th>
                  {/* <Th fontSize={12}>Status</Th> */}
                  <Th fontSize={12}>Time Created</Th>
                  {/* <Th fontSize={12}>Action</Th> */}
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
          </Flex>
        </div>
      </div>
    </section>
  );
};

export default Kyc;
