import React, {useEffect, useState} from "react";
import Image from "next/image";
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
import {AiOutlineToTop} from "react-icons/ai";
import {FiCopy} from "react-icons/fi";
import {RootState} from "@/redux-store/store";
import {useDispatch, useSelector} from "react-redux";
import {
  getAdminAccounts,
  makeDeposit,
  resetSendState,
} from "@/redux-actions/HomeAppSlice";
import SpinnerPage from "../home/Spinner";
import QRCode from "qrcode.react";
type Props = {};

const DepositFunds = (props: Props) => {
  const {userInfo, adminAccounts, getState, sendState, errorMessage} =
    useSelector((store: RootState) => store.HomeAppSlice);
  const {toast} = createStandaloneToast();
  const [isLoad, setIsLoad] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [amount, setAmount] = useState(1000);
  const dispatch = useDispatch();
  const handleInputChange = (e: any) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    if (sendState.isSuccess) {
      toast({
        title: "Success.",
        description: "Deposit made Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      setIsLoad(false);
      setAmount(1000);
    }
    if (sendState.isError) {
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
    if (sendState.isLoading) {
      setIsLoad(true);
    }

    dispatch(resetSendState());
  }, [sendState.isError, sendState.isLoading, sendState.isSuccess]);
  const handleSubmit = async () => {
    await dispatch(
      makeDeposit({
        asset: selectedAsset,
        amount: amount,
        userId: userInfo?.id,
        to:
          selectedAsset === "BTC"
            ? adminAccounts[0].btc
            : selectedAsset === "USDT"
            ? adminAccounts[0].usdt
            : adminAccounts[0].eth,
      })
    );
    // setAmount(0);/
  };

  const handleAssetChange = (e: any) => {
    setSelectedAsset(e.target.value);
  };
  return (
    <div className={`${styles.manage_user_block} ${styles.manage_user_grid}`}>
      {isLoad && <SpinnerPage />}

      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <AiOutlineToTop />
            <p>Deposit Funds</p>
          </div>
          <Box p={2} background={"#759c4930"}>
            {/* <form action="" className={`${styles.form}`}> */}
            <FormControl p={2}>
              <FormLabel fontSize={11}>Enter Trade Amount *</FormLabel>
              <NumberInput value={amount} defaultValue={1000} min={200}>
                <NumberInputField
                  onChange={handleInputChange}
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
              <FormLabel fontSize={11}>Select Asset *</FormLabel>
              <Select
                onChange={handleAssetChange}
                className={`${styles.input}`}
                fontSize={14}
                icon={<MdArrowDropDown />}
              >
                <option style={{background: "rgba(32, 80, 79, 1)"}}>BTC</option>
                <option style={{background: "rgba(32, 80, 79, 1)"}}>
                  USDT
                </option>
                <option style={{background: "rgba(32, 80, 79, 1)"}}>ETH</option>
              </Select>
            </FormControl>

            <Box p={2} w="100%">
              <Text fontSize={12}>
                You are provided with a very convenient method of depositing
                using Bitcoin, Ethereum and USDT
              </Text>
            </Box>
            {/* </form> */}
          </Box>
        </div>
      </section>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <FiCopy />
            <p>Copy Wallet Address</p>
          </div>
          <Box p={2} background={"#759c4930"}>
            <div className={`${styles.form}`}>
              <Flex
                justify={"center"}
                w={"100%"}
                direction="column"
                align={"center"}
                gap={5}
              >
                {adminAccounts.map((account, index) => (
                  <Box key={index} p={4}>
                    {selectedAsset === "BTC" ? (
                      <QRCode
                        value={account.btc}
                        size={240}
                        fgColor="#000000"
                        bgColor="transparent"
                      />
                    ) : selectedAsset === "USDT" ? (
                      <QRCode
                        value={account.usdt}
                        size={240}
                        fgColor="#000000"
                        bgColor="transparent"
                      />
                    ) : (
                      <QRCode
                        value={account.eth}
                        size={300}
                        fgColor="#000000"
                        bgColor="transparent"
                      />
                    )}
                  </Box>
                ))}
                {adminAccounts.map((account, index) => (
                  <Box key={index}>
                    {selectedAsset === "BTC" ? (
                      <Text fontSize={12}> {account.btc}</Text>
                    ) : selectedAsset === "USDT" ? (
                      <Text fontSize={12}>{account.usdt}</Text>
                    ) : (
                      <Text fontSize={12}>{account.eth}</Text>
                    )}
                  </Box>
                ))}
              </Flex>
              <FormControl p={2}>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  onClick={handleSubmit}
                  _hover={{
                    background: "#64d2b1",
                  }}
                  color={"#fff"}
                  background="#55b598"
                >
                  Request Deposit
                </Button>
              </FormControl>
            </div>
          </Box>
        </div>
      </section>
    </div>
  );
};

export default DepositFunds;
