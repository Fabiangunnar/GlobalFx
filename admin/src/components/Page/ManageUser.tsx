import React, {useEffect, useRef, useState} from "react";
import styles from "@/styles/pages/User.module.scss";
import {AiTwotoneEdit} from "react-icons/ai";
import {HiUser} from "react-icons/hi2";
import {MdAccountBalance, MdArrowDropDown} from "react-icons/md";
import {RiLuggageDepositFill, RiProfileLine} from "react-icons/ri";
import {IoNotifications} from "react-icons/io5";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  TableContainer,
  TableCaption,
  Table,
  Tbody,
  Td,
  Tr,
  Th,
  Thead,
  Tfoot,
  Flex,
  Stack,
  WrapItem,
  Avatar,
  Spacer,
  Divider,
  CardBody,
  Card,
  createStandaloneToast,
  Select,
} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux-store/store";
import {
  changeState,
  getAllDeposits,
  getAllUsers,
  getMyUserDeposits,
  getUser,
  reset,
  resetSendState,
  resetUpdateDepositState,
  resetUpdateState,
  resetUsersState,
  sendNotification,
  sendTransactionState,
  setUserBalanceData,
  updateDeposit,
  updateUser,
  userDeposit,
} from "@/redux-actions/AppSlice";
import SpinnerPage from "./Spinner";
import Pagination from "../Pagination";

type Props = {};

const ManageUser = (props: Props) => {
  const {
    userManageData,
    manageUserDeposits,
    updateDepositState,
    sendState,
    usersState,
    errorMessage,
    updateState,
  } = useSelector((state: RootState) => state.AppSlice);
  const stateBoxRef: any = useRef();
  const [accountBox, setAccountBox] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
  });
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [balanceFormData, setBalanceFormData] = useState({
    totalBalance: 0,
    totalProfit: 0,
  });

  const [depositFormData, setDepositFormData] = useState({
    amount: 0,
  });
  const [postsPerPage, sePostsPerPage] = useState(4);

  const [transactionState, setTransactionState] = useState("PENDING");

  const [notifFormData, setNotifFormData] = useState({
    message: "",
  });
  const {toast} = createStandaloneToast();
  const dispatch = useDispatch();
  const date = new Date(`${userManageData.createdAt}`);
  const date2 = new Date(`${userManageData.lastLogin}`);
  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const sumofDeposits = manageUserDeposits.reduce((accumulator, obj) => {
    return accumulator + obj.amount;
  }, 0);
  const formattedDate = `${date.toLocaleDateString("en-US", options)}`;
  const formattedDate2 = `${date2.toLocaleDateString("en-US", options)}`;
  const handleChangeAccountState = () => {
    setAccountBox((prev) => !prev);
  };
  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({...prev, [e.target.name]: e.target.value}));
    setNotifFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setBalanceFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setDepositFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleTransactionStateChange = (e: any) => {
    if (e.target.value === "") return;
    setTransactionState(e.target.value);
  };
  const handleSendNotifications = (e: any) => {
    e.preventDefault();
    dispatch(
      sendNotification({
        message: notifFormData.message,
        userId: userManageData.id,
      })
    );
  };
  const handleClickOutside = (event: any) => {
    if (stateBoxRef.current && !stateBoxRef.current.contains(event.target)) {
      setAccountBox(false);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentDeposits = manageUserDeposits.slice(
    indexofFirstPost,
    indexOfLastPost
  );
  const makeTransactionStateChange = (id: any, transactionstatedata: any) => {
    dispatch(sendTransactionState([id, transactionstatedata]));
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
      setisLoading2(false);
      dispatch(getUser(userManageData?.id));
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
      setisLoading2(false);
    }

    if (usersState.isLoading) {
      setisLoading2(true);
    }

    dispatch(resetUsersState());
  }, [
    usersState.isSuccess,
    usersState.isError,
    usersState.isLoading,
    dispatch,
  ]);
  const [btcEq, setBtcEq] = useState(0);
  useEffect(() => {
    convertDollarToBTC(Number(userManageData?.totalBalance));

    dispatch(getMyUserDeposits(userManageData?.id));
  }, []);
  useEffect(() => {
    if (updateState.isSuccess) {
      toast({
        title: "Success",
        description: "Updated Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      const x = async () => {
        dispatch(getMyUserDeposits(userManageData?.id));
        dispatch(getUser(userManageData?.id));
        setisLoading(false);
        setNotifFormData({message: ""});
      };
      x();
      setBalanceFormData({totalBalance: 0, totalProfit: 0});
    }
    if (updateState.isError) {
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
    if (updateState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetUpdateState());
  }, [updateState.isSuccess, updateState.isError, updateState.isLoading]);
  useEffect(() => {
    if (sendState.isSuccess) {
      toast({
        title: "Success",
        description: "Sent Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(getUser(userManageData?.id));
      dispatch(getMyUserDeposits(userManageData?.id));
      setisLoading(false);
      setNotifFormData({message: ""});
    }
    if (sendState.isError) {
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
    if (sendState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetSendState());
  }, [sendState.isSuccess, sendState.isError, sendState.isLoading, dispatch]);
  useEffect(() => {
    if (updateDepositState.isSuccess) {
      toast({
        title: "Success",
        description: "Sent Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(getMyUserDeposits(userManageData?.id));
      dispatch(getUser(userManageData?.id));
      setisLoading(false);
    }
    if (updateDepositState.isError) {
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
    if (updateDepositState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetUpdateDepositState());
  }, [
    updateDepositState.isSuccess,
    updateDepositState.isError,
    updateDepositState.isLoading,
    dispatch,
  ]);

  async function convertDollarToBTC(amountInUSD: number) {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
      );
      const data = await response.json();
      const exchangeRate = data.bpi.USD.rate_float;
      const btcValue = amountInUSD / exchangeRate;
      setBtcEq(btcValue);
      return btcValue;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return null;
    }
  }

  const handleUpdateBalance = async (e: any) => {
    e.preventDefault();
    await dispatch(updateUser([userManageData.id, balanceFormData]));
  };
  const handleDeposit = (e: any) => {
    e.preventDefault();
    dispatch(userDeposit({userId: userManageData.id, ...depositFormData}));
  };

  return (
    <div className={`${styles.manage_user_block}`}>
      {isLoading && <SpinnerPage />}
      {isLoading2 && <SpinnerPage />}
      <section className={`${styles.manage_user_head}`}>
        <h1>Manage User</h1>
        <small>Dashboard</small>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <HiUser />
            <p>
              {`${userManageData.firstname} ${userManageData.lastname}`}'s
              Information
            </p>
          </div>
          <Flex p={4} gap={8} justify={"between"} align={"center"}>
            <WrapItem>
              <Avatar
                // onClick={() => {
                //   setOverlay(<OverlayOne />);
                //   modal1.onOpen();
                // }}
                cursor={"pointer"}
                size="2xl"
                name="Kola Tioluwani"
                src={
                  userManageData?.picture
                    ? `${userManageData.picture}`
                    : "/images.png"
                }
              />
            </WrapItem>

            <Stack spacing={3} w={"100%"}>
              <Text fontSize="sm">
                Available Balance: ${userManageData.totalBalance}
              </Text>
              <Text fontSize="sm">Total Deposit: ${sumofDeposits} </Text>
              <Text fontSize="sm">
                Total Profit: ${userManageData.totalProfit}{" "}
              </Text>
              <Text fontSize="sm">
                Total Withdrawal: ${userManageData.totalWithdrawal}
              </Text>
              <Text fontSize="sm">Total Investment: {btcEq} BTC</Text>
              {/* <Button
                fontSize={14}
                type="submit"
                w="100%"
                colorScheme="messenger">
                Login Account
              </Button> */}
            </Stack>
          </Flex>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <MdAccountBalance />
            <p>
              Update {`${userManageData.firstname} ${userManageData.lastname}`}
              's Balance
            </p>
          </div>
          <Box p={2}>
            <form action="" onSubmit={handleUpdateBalance}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Total Balance</FormLabel>
                <Input
                  type="text"
                  fontSize={12}
                  name="totalBalance"
                  value={balanceFormData.totalBalance}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Total Profit</FormLabel>
                <Input
                  type="text"
                  fontSize={12}
                  name="totalProfit"
                  value={balanceFormData.totalProfit}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl p={2}>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  colorScheme="messenger"
                >
                  Update
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <MdAccountBalance />
            <p>
              Create Deposit for{" "}
              {`${userManageData.firstname} ${userManageData.lastname}`}
            </p>
          </div>
          <Box p={2}>
            <form action="" onSubmit={handleDeposit}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Amount</FormLabel>
                <Input
                  type="number"
                  fontSize={12}
                  required
                  name="amount"
                  value={depositFormData.amount}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl p={2}>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  colorScheme="messenger"
                >
                  Create
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <RiProfileLine />
            <p>
              {" "}
              {`${userManageData.firstname} ${userManageData.lastname}`}'s
              Profile
            </p>
          </div>
          <Flex p={4} gap={1} direction={"column"}>
            <Box>
              <Text fontSize="sm">Name:</Text>
              <Text fontSize={12}>
                {" "}
                {`${userManageData.firstname} ${userManageData.lastname}`}
              </Text>
            </Box>
            <Divider />
            <Box>
              <Text fontSize="sm">Email:</Text>
              <Text fontSize={12}>{userManageData.email}</Text>
            </Box>
            <Divider colorScheme={"red"} variant={"solid"} />
            <Box>
              <Text fontSize="sm">Registered on:</Text>
              <Text fontSize={12}>{formattedDate}</Text>
            </Box>
            <Divider />
            <Box>
              <Text fontSize="sm">Referral link:</Text>
              {/* <Text fontSize={12}>been</Text> */}
              <Button size={"sm"} fontSize={11} colorScheme="messenger">
                VIEW REFERRALS
              </Button>
            </Box>
            <Divider colorScheme={"red"} variant={"solid"} />
            <Box ref={stateBoxRef}>
              <Text fontSize="sm">Account State:</Text>
              {userManageData.accountState === "PENDING" ? (
                <Card>
                  <CardBody>
                    <Button
                      fontSize={12}
                      colorScheme="red"
                      onClick={handleChangeAccountState}
                    >
                      NOT VERIFIED
                    </Button>
                    {accountBox && (
                      <Card
                        position={"absolute"}
                        top={0}
                        left={"10rem"}
                        zIndex={4}
                        border={"1px solid #eaeaea"}
                        marginTop={2}
                      >
                        <CardBody>
                          <Text fontSize={12} marginBottom={1}>
                            Set State To:
                          </Text>
                          <Button
                            fontSize={12}
                            colorScheme="whatsapp"
                            onClick={() =>
                              dispatch(
                                changeState([
                                  userManageData.id,
                                  {accountState: "VERIFIED"},
                                ])
                              )
                            }
                          >
                            VERIFIED
                          </Button>
                        </CardBody>
                      </Card>
                    )}
                  </CardBody>
                </Card>
              ) : userManageData.accountState === "BLOCKED" ? (
                <Card>
                  <CardBody>
                    <Button
                      fontSize={12}
                      colorScheme="red"
                      onClick={handleChangeAccountState}
                    >
                      BLOCKED
                    </Button>
                    {accountBox && (
                      <Card
                        position={"absolute"}
                        top={0}
                        left={"10rem"}
                        border={"1px solid #eaeaea"}
                        zIndex={4}
                        marginTop={2}
                      >
                        <CardBody>
                          <Text fontSize={12} marginBottom={1}>
                            Set State To:
                          </Text>
                          <Button
                            fontSize={12}
                            colorScheme="whatsapp"
                            onClick={() =>
                              dispatch(
                                changeState([
                                  userManageData.id,
                                  {accountState: "VERIFIED"},
                                ])
                              )
                            }
                          >
                            VERIFIED
                          </Button>
                        </CardBody>
                      </Card>
                    )}
                  </CardBody>
                </Card>
              ) : (
                <Card>
                  <CardBody>
                    <Button
                      fontSize={12}
                      colorScheme="whatsapp"
                      onClick={handleChangeAccountState}
                    >
                      VERIFIED
                    </Button>
                    {accountBox && (
                      <Card
                        position={"absolute"}
                        top={0}
                        left={"10rem"}
                        border={"1px solid #eaeaea"}
                        zIndex={4}
                        marginTop={2}
                      >
                        <CardBody>
                          <Text fontSize={12} marginBottom={1}>
                            Set State To:
                          </Text>
                          <Button
                            fontSize={12}
                            colorScheme="red"
                            onClick={() =>
                              dispatch(
                                changeState([
                                  userManageData.id,
                                  {accountState: "BLOCKED"},
                                ])
                              )
                            }
                          >
                            BLOCKED
                          </Button>
                        </CardBody>
                      </Card>
                    )}
                  </CardBody>
                </Card>
              )}
            </Box>
            <Divider colorScheme={"red"} variant={"solid"} />
            <Box>
              <Text fontSize="sm">Last Login Information:</Text>
              <Text fontSize={12}>{formattedDate2}</Text>
            </Box>
            <Divider colorScheme={"red"} variant={"solid"} />
          </Flex>
        </div>
      </section>

      <section id="notifications" className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <IoNotifications />
            <p>Notifications</p>
          </div>

          <Box p={2}>
            <form action="" onClick={handleSendNotifications}>
              <FormControl p={2}>
                <Text mb="8px" fontSize={11}>
                  Message:{" "}
                </Text>
                <Textarea
                  fontSize={12}
                  value={notifFormData.message}
                  required
                  name="message"
                  placeholder="What's the message"
                  onChange={handleInputChange}
                  size="sm"
                />
              </FormControl>
              <FormControl p={2}>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  colorScheme="messenger"
                >
                  Send
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <RiLuggageDepositFill />
            <p>Deposits</p>
          </div>
          <TableContainer gap={1}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {/* <Th fontSize={11}>S/N</Th> */}
                  <Th fontSize={11}>Amount</Th>
                  <Th fontSize={11}>Amt change</Th>
                  <Th fontSize={11}>Method</Th>
                  <Th fontSize={11}>Wallet</Th>
                  <Th fontSize={11}>Status</Th>
                  <Th fontSize={11}>Time</Th>

                  <Th fontSize={11} isNumeric>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {[...currentDeposits].map((manageUserDeposit: any, index) => {
                  const date = new Date(`${manageUserDeposit.createdAt}`);
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
                    <Tr key={manageUserDeposit.id}>
                      {/* <Td fontSize={11}>{index + 1}</Td> */}
                      <Td fontSize={11}>${manageUserDeposit.amount}</Td>
                      <Td fontSize={11}>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(
                              updateDeposit([manageUserDeposit.id, formData])
                            );
                          }}
                        >
                          <Flex
                            direction={"column"}
                            gap={1}
                            justify={"center"}
                            align={"center"}
                            maxW={20}
                            minW={"6rem"}
                          >
                            <Input
                              type="number"
                              fontSize={12}
                              maxW={16}
                              required
                              size={"sm"}
                              name="amount"
                              defaultValue={manageUserDeposit.amount}
                              //   value={manageUserDeposit.amount}
                              onChange={handleInputChange}
                            />
                            <Button
                              fontSize={11}
                              w="100%"
                              size={"sm"}
                              maxW={16}
                              type="submit"
                              // onClick={() =>
                              //   makeTransactionStateChange(manageUserDeposit.id, {
                              //     transactionState,
                              //   })
                              // }
                              colorScheme="whatsapp"
                            >
                              Update
                            </Button>
                          </Flex>
                        </form>
                      </Td>
                      <Td fontSize={11}>{manageUserDeposit.asset}</Td>
                      <Td fontSize={11}>{manageUserDeposit.to}</Td>
                      <Td fontSize={11}>
                        {manageUserDeposit.transactionState === "PENDING" ? (
                          <Text
                            fontSize={14}
                            fontWeight={"bold"}
                            color="#3a7ae0"
                          >
                            PENDING
                          </Text>
                        ) : manageUserDeposit.transactionState ===
                          "NOT_VERIFIED" ? (
                          <Text
                            size={"sm"}
                            fontSize={14}
                            fontWeight={"bold"}
                            color="red"
                          >
                            REJECTED
                          </Text>
                        ) : (
                          <Text
                            size={"sm"}
                            fontSize={14}
                            fontWeight={"bold"}
                            color="#248724"
                          >
                            VERIFIED
                          </Text>
                        )}
                      </Td>
                      <Td fontSize={11}>{formattedDate}</Td>
                      <Td fontSize={11}>
                        {" "}
                        <Flex
                          direction={"column"}
                          gap={1}
                          align={"center"}
                          minW={"6rem"}
                        >
                          <Select
                            cursor={"pointer"}
                            fontSize={11}
                            onClick={handleTransactionStateChange}
                            px={0}
                            placeholder={
                              manageUserDeposit.transactionState ===
                              "NOT_VERIFIED"
                                ? "REJECTED"
                                : manageUserDeposit.transactionState
                            }
                            size="sm"
                          >
                            {manageUserDeposit.transactionState !==
                              "PENDING" && <option>PENDING</option>}
                            {manageUserDeposit.transactionState !==
                              "VERIFIED" && <option>VERIFIED</option>}
                            {manageUserDeposit.transactionState !==
                              "NOT_VERIFIED" && (
                              <option value={"NOT_VERIFIED"}>REJECTED</option>
                            )}
                          </Select>
                          <Button
                            fontSize={11}
                            maxW={24}
                            size={"sm"}
                            w="100%"
                            onClick={() =>
                              makeTransactionStateChange(manageUserDeposit.id, {
                                transactionState,
                              })
                            }
                            colorScheme="whatsapp"
                          >
                            Update
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  {/* <Th fontSize={11} isNumeric>
                    S/N
                  </Th> */}
                  <Th fontSize={11} isNumeric>
                    Amount
                  </Th>
                  <Th fontSize={11}>Amt change</Th>

                  <Th fontSize={11}>Method</Th>

                  <Th fontSize={11}>Wallet</Th>
                  <Th fontSize={11}>Status</Th>

                  <Th fontSize={11}>Created</Th>
                  <Th fontSize={11}>Action</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Table>
            <TableCaption>
              {" "}
              Showing {indexofFirstPost + 1} to{" "}
              {indexofFirstPost + currentDeposits.length} of{" "}
              {manageUserDeposits.length} entries{" "}
            </TableCaption>
          </Table>
          <Flex p={4}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={manageUserDeposits.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
        </div>
      </section>
    </div>
  );
};

export default ManageUser;
