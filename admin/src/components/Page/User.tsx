import React, {Fragment, useEffect, useState} from "react";
import styles from "@/styles/pages/User.module.scss";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Spacer,
  Select,
  Input,
  Grid,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import {useSelector, useDispatch} from "react-redux";
import {HiUsers} from "react-icons/hi2";
import Pagination from "../Pagination";
import {setCurrentPage} from "@/redux-actions/navSlice";
import {
  DepositsType,
  UserTypes,
  WithdrawalType,
  deleteUser,
  getAllDeposits,
  getAllUsers,
  removeUser,
  setUserManageData,
} from "@/redux-actions/AppSlice";
import {DeleteUserModal} from "./ModalPage";
type Props = {};

const User = () => {
  const {users, withdrawals, deposits} = useSelector(
    (state: any) => state.AppSlice
  );
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postsPerPage, sePostsPerPage] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const indexOfLastPost = currentPostPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexofFirstPost, indexOfLastPost);
  const handlePostsPerPage = (page: number) => {};
  const {isOpen, onOpen, onClose} = useDisclosure();

  const paginate = (number: any) => {
    // setCurrentPage(number);
  };

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllDeposits());
  }, [dispatch]);

  const handleUserManageData = (manageUser: string, user: UserTypes) => {
    dispatch(setCurrentPage(manageUser));
    dispatch(setUserManageData(user));
  };
  const sumOfTotalDeposit = deposits.reduce(
    (total: any, deposit: DepositsType) => total + (deposit?.amount || 0),
    0
  );
  const sumOfTotalWithdrawals = withdrawals.reduce(
    (total: any, withdrawal: WithdrawalType) =>
      total + (withdrawal.amount || 0),
    0
  );
  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.balance_block}`}>
        <div className={`${styles.balance_box}`}>
          <h3>Total Deposits</h3>
          <span>${sumOfTotalDeposit}</span>
        </div>
        <div className={`${styles.balance_box}`}>
          <h3>Total Withdrawals</h3>

          <span>${sumOfTotalWithdrawals}</span>
        </div>
      </div>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <HiUsers />
          <p>User Management</p>
        </div>
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
                <Th fontSize={14}>S/N</Th>
                <Th fontSize={14}>Name</Th>

                <Th fontSize={14} isNumeric>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users && users?.length > 0 ? (
                [...currentPosts]
                  .sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);

                    return dateB.getTime() - dateA.getTime();
                  })
                  .map((user: UserTypes, index) => (
                    <Tr key={user.id}>
                      <Td fontSize={12}>{index + 1}</Td>
                      <Td fontSize={12}>
                        {`${user.firstname} ${user.lastname}`}
                      </Td>

                      <Td fontSize={12} isNumeric>
                        <Flex direction={"column"} gap={3} align={"end"}>
                          <Button
                            fontSize={12}
                            maxW={16}
                            size={"sm"}
                            colorScheme="messenger"
                            onClick={() =>
                              handleUserManageData("manage-user", user)
                            }
                          >
                            Manage
                          </Button>
                          <Button
                            onClick={() => {
                              onOpen();
                              setDeleteId(user.id);
                            }}
                            fontSize={12}
                            size={"sm"}
                            maxW={16}
                            colorScheme="red"
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))
              ) : (
                <Tr>
                  <Td>-</Td>
                  <Td fontSize={12}>No One has Signed up yet</Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        <Table>
          <TableCaption>
            {" "}
            Showing {indexofFirstPost + 1} to{" "}
            {indexofFirstPost + currentPosts.length} of {users.length} entries{" "}
          </TableCaption>
        </Table>
        <Flex p={4}>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={users.length}
            paginate={paginate}
            currentPage={currentPostPage}
            setCurrentPage={setCurrentPostPage}
          />
        </Flex>
      </div>
      <DeleteUserModal userId={deleteId} isOpen={isOpen} onClose={onClose} />
    </section>
  );
};

export default User;
