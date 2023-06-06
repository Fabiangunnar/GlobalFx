import React, {useEffect, useState} from "react";
import styles from "@/styles/pages/User.module.scss";
import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Flex,
  createStandaloneToast,
} from "@chakra-ui/react";
import {MdArrowDropDown} from "react-icons/md";
import {AiOutlineSelect, AiOutlineToTop} from "react-icons/ai";
import {TbListDetails} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux-store/store";
import {
  getUser,
  makeInvestment,
  reset,
  resetWithdrawalState,
} from "@/redux-actions/HomeAppSlice";
import SpinnerPage from "../home/Spinner";
type Props = {};

const NewInvestments = (props: Props) => {
  const {userInfo, withdrawalState, errorMessage} = useSelector(
    (store: RootState) => store.HomeAppSlice
  );
  const [selectedPlan, setSelectedPlan] = useState("BASIC");
  const [isLoad, setIsLoad] = React.useState(false);
  const [amount, setAmount] = useState(1000);
  const dispatch = useDispatch();
  const {toast} = createStandaloneToast();
  const handlePlanChange = (e: any) => setSelectedPlan(e.target.value);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (Number(userInfo?.totalBalance) < Number(amount)) {
      toast({
        title: "Insufficient Funds",
        description: "Make a deposit to continue your investment",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      return;
    }
    dispatch(
      makeInvestment({
        userId: userInfo?.id,
        amount,
        plan: selectedPlan,
      })
    );
  };
  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    if (withdrawalState.isSuccess) {
      toast({
        title: "Success.",
        description: "Investment made successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      setIsLoad(false);
      dispatch(getUser(userInfo?.id));
    }
    if (withdrawalState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
      setIsLoad(false);
    }
    if (withdrawalState.isLoading) {
      setIsLoad(true);
    }

    dispatch(resetWithdrawalState());
  }, [
    withdrawalState.isError,
    withdrawalState.isLoading,
    withdrawalState.isSuccess,
  ]);
  useEffect(() => {
    dispatch(getUser(userInfo?.id));
    dispatch(reset());
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.manage_user_block} ${styles.manage_user_grid}`}
    >
      {isLoad && <SpinnerPage />}

      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <AiOutlineSelect />
            <p>Select Plan</p>
          </div>
          <Box p={2} background={"#759c4930"}>
            <div className={`${styles.form}`}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Enter Amount *</FormLabel>
                <NumberInput defaultValue={amount} min={100}>
                  <NumberInputField
                    onChange={handleAmountChange}
                    fontSize={16}
                    className={`${styles.input}`}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper color={"#fff"} />
                    <NumberDecrementStepper color={"#fff"} />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Select Plan *</FormLabel>
                <Select
                  className={`${styles.input}`}
                  fontSize={14}
                  onClick={handlePlanChange}
                  icon={<MdArrowDropDown />}
                >
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="BASIC"
                  >
                    Basic Plan
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="STANDARD"
                  >
                    Standard Plan
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="LUXURY"
                  >
                    Luxury Plan
                  </option>
                </Select>
              </FormControl>

              <Box p={2} w="100%">
                <Text fontSize={14}>
                  Current Balance: ${userInfo?.totalBalance}
                </Text>
              </Box>
              <Box p={2} w="100%">
                <Text fontSize={12}>
                  In GLOBAL TYCOON FX - Your Trusted Crypto Investment Broker,
                  You will receive profits everyday including weekends.
                </Text>
              </Box>
            </div>
          </Box>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <TbListDetails />
            <p>Plan Details</p>
          </div>
          <Box p={2} background={"#759c4930"}>
            <div className={`${styles.form}`}>
              <Flex
                justify={"center"}
                w={"50%"}
                p={4}
                paddingInline={6}
                gap={2}
                direction={"column"}
              >
                {selectedPlan === "BASIC" ? (
                  <>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Duration:</Text>{" "}
                      <Text fontSize={14} fontWeight={600}>
                        7 Days
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Profit:</Text>
                      <Text fontSize={14} fontWeight={600}>
                        450%
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Min:</Text>
                      <Text fontSize={14} fontWeight={600}>
                        $500
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Max:</Text>
                      <Text fontSize={14} fontWeight={600}>
                        $4500
                      </Text>
                    </Flex>
                  </>
                ) : selectedPlan === "STANDARD" ? (
                  <>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Duration:</Text>{" "}
                      <Text fontSize={14} fontWeight={600}>
                        7 Days
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Profit:</Text>
                      <Text fontSize={14} fontWeight={600}>
                        450%
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Min:</Text>
                      <Text fontSize={14} fontWeight={600}>
                        $5000
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Max:</Text>
                      <Text fontSize={14} fontWeight={600}>
                        $14000
                      </Text>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Duration :</Text>{" "}
                      <Text fontSize={14} fontWeight={600}>
                        7 Days
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Profit :</Text>
                      <Text fontSize={14} fontWeight={600}>
                        450%
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Min :</Text>
                      <Text fontSize={14} fontWeight={600}>
                        $15000
                      </Text>
                    </Flex>
                    <Flex
                      justify={"flex-start"}
                      gap={2}
                      w={"100%"}
                      align={"center"}
                    >
                      <Text fontSize={18}>Max :</Text>
                      <Text fontSize={14} fontWeight={600}>
                        $60000
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>
              <FormControl p={2}>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  _hover={{
                    background: "#64d2b1",
                  }}
                  color={"#fff"}
                  background="#55b598"
                >
                  Start Investment
                </Button>
              </FormControl>
            </div>
          </Box>
        </div>
      </section>
    </form>
  );
};

export default NewInvestments;
