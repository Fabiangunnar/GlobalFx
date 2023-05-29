import React, { useEffect } from "react";
import styles from "@/styles/pages/User.module.scss";
import {
  Box,
  Button,
  Flex,
  Input,
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
} from "@chakra-ui/react";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { TfiTicket } from "react-icons/tfi";
import {
  UserTypes,
  getAllSupportTickets,
  setUserManageData,
} from "@/redux-actions/AppSlice";
import { RootState } from "@/redux-store/store";
import { setCurrentPage } from "@/redux-actions/navSlice";
import { useRouter } from "next/router";
type Props = {};

const Support = (props: Props) => {
  const { posts, currentPostsPage, postsPerPage } = useSelector(
    (state: any) => state.mgmt
  );
  const { supportTicketData, users } = useSelector(
    (state: RootState) => state.AppSlice
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const indexOfLastPost = currentPostsPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost);
  const paginate = (number: any) => {
    // setCurrentPage(number);
  };
  const handleUserData = (manageUser: string, user: UserTypes) => {
    dispatch(setCurrentPage(manageUser));
    dispatch(setUserManageData(user));
  };
  useEffect(() => {
    dispatch(getAllSupportTickets());
    //
  }, [dispatch]);
  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <TfiTicket />
          <p>Support</p>
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
                  <Th fontSize={12}>Ref ID</Th>
                  <Th fontSize={12}>Username</Th>
                  <Th fontSize={12}>Subject</Th>
                  <Th fontSize={12}>Message</Th>
                  <Th fontSize={12}>Time Created</Th>
                  <Th fontSize={12} isNumeric>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {supportTicketData.length > 0 ? (
                  [...supportTicketData]
                    .sort((a, b) => {
                      const dateA = new Date(a.createdAt);
                      const dateB = new Date(b.createdAt);

                      return dateB.getTime() - dateA.getTime();
                    })
                    .map((ticket, index) => {
                      const date = new Date(`${ticket.createdAt}`);

                      const options: any = {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        timeZoneName: "short",
                      };

                      const formattedDate = `${date.toLocaleDateString(
                        "en-US",
                        options
                      )}`;
                      return (
                        <Tr key={ticket.id}>
                          <Td fontSize={11} isNumeric>
                            {index + 1}
                          </Td>
                          <Td fontSize={11}>inches</Td>

                          <Td fontSize={11}>
                            {users.map((user) => {
                              if (user.id === ticket.userId) {
                                return (
                                  <>{`${user.firstname} ${user.lastname}`}</>
                                );
                              }
                            })}
                          </Td>
                          <Td fontSize={11}>{ticket.subject}</Td>
                          <Td fontSize={11}>{ticket.message}</Td>
                          <Td fontSize={11}>{formattedDate}</Td>
                          <Td fontSize={11} isNumeric>
                            <Flex align="end">
                              {users.map((user) => {
                                if (user.id === ticket.userId) {
                                  return (
                                    <Button
                                      fontSize={11}
                                      onClick={() => {
                                        handleUserData("manage-user", user);
                                        router.push("#notifications");
                                      }}
                                      colorScheme="messenger">
                                      Send Notification
                                    </Button>
                                  );
                                }
                              })}
                            </Flex>
                          </Td>
                        </Tr>
                      );
                    })
                ) : (
                  <Tr>
                    <Td>-</Td>
                    <Td fontSize={12}>No Support Ticket</Td>
                  </Tr>
                )}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize={11} isNumeric>
                    S/N
                  </Th>
                  <Th fontSize={12}>Ref ID</Th>
                  <Th fontSize={12}>Username</Th>
                  <Th fontSize={12}>Subject</Th>
                  <Th fontSize={12}>Message</Th>
                  <Th fontSize={12}>Time Created</Th>
                  <Th fontSize={12} isNumeric>
                    Action
                  </Th>
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

export default Support;
