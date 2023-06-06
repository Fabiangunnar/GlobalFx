import React, {useEffect, useState} from "react";
import styles from "@/styles/pages/User.module.scss";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Select,
  createStandaloneToast,
} from "@chakra-ui/react";
import {BiMoneyWithdraw} from "react-icons/bi";
import {MdArrowDropDown} from "react-icons/md";
import {GiTrade} from "react-icons/gi";
import {SiCoinmarketcap} from "react-icons/si";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setNavLink} from "@/redux-actions/homeNavSlice";
import {RootState} from "@/redux-store/store";
import {makeTrade, resetWithdrawalState} from "@/redux-actions/HomeAppSlice";

type Props = {};

const Trade = (props: Props) => {
  const {userInfo, withdrawalState, errorMessage} = useSelector(
    (store: RootState) => store.HomeAppSlice
  );
  const [selectedAsset, setSelectedAsset] = useState("EUR/USD");
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const {toast} = createStandaloneToast();
  const [amount, setAmount] = useState(1000);
  const handleMakeTrade = (position: string) => {
    if (Number(userInfo?.totalBalance) < Number(amount)) {
      toast({
        title: "Insufficient Funds",
        description: "Make a deposit to your account",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      return;
    }

    dispatch(
      makeTrade({
        amount,
        position,
        pairs: selectedAsset,
        userId: userInfo?.id,
      })
    );
  };
  const handleClick = (link: string, id: object) => {
    dispatch(setNavLink(id));
    dispatch(setCurrentPage(link));
  };
  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };
  const handleAssetChange = (e: any) => {
    setSelectedAsset(e.target.value);
  };
  useEffect(() => {
    if (withdrawalState.isSuccess) {
      toast({
        title: "Success.",
        description: "Trade made successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      setisLoading(false);
      setAmount(1000);
      setSelectedAsset("EUR/USD");
    }
    if (withdrawalState.isError) {
      toast({
        title: errorMessage.statusCode,
        description: errorMessage.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        variant: "subtle",
        position: "top-right",
      });
      setisLoading(false);
    }
    if (withdrawalState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetWithdrawalState());
  }, [
    withdrawalState.isError,
    withdrawalState.isLoading,
    withdrawalState.isSuccess,
  ]);
  return (
    <div className={`${styles.manage_user_block} ${styles.manage_user_grid}`}>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <SiCoinmarketcap />
            <p>Market</p>
          </div>
          <Box background={"#759c4930"}>
            <Box h={"25rem"} w={"100%"}>
              <iframe
                style={{
                  height: "100%",
                  width: "100%",
                }}
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_348fb&symbol=COINBASE%3ABTCUSD&interval=1&hidelegend=1&symboledit=1&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=2&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=pfi-my.com&utm_medium=widget&utm_campaign=chart&utm_term=COINBASE%3ABTCUSD#%7B%22page-uri%22%3A%22pfi-my.com%2Fdashboard%2F%3Floggin_success%22%7D"
                frameBorder={4}
              ></iframe>
            </Box>
          </Box>
        </div>
      </section>

      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <GiTrade />
            <p>Place Trade</p>
          </div>
          <Box p={2} background={"#759c4930"}>
            <Box height={8} position={"relative"}>
              <Box
                position={"absolute"}
                top={0}
                left={0}
                width={"100%"}
                height={"100%"}
              >
                {isLoading && (
                  <Progress
                    size="xs"
                    height={8}
                    background={"#759c4950"}
                    isIndeterminate
                  />
                )}
              </Box>
            </Box>

            <form
              action=""
              onSubmit={(e) => e.preventDefault()}
              className={`${styles.form}`}
            >
              <FormControl p={2}>
                <FormLabel fontSize={11}>Enter Trade Amount *</FormLabel>
                <NumberInput value={amount} min={200}>
                  <NumberInputField
                    onChange={handleAmountChange}
                    fontSize={14}
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
                  className={`${styles.input}`}
                  fontSize={14}
                  onChange={handleAssetChange}
                  icon={<MdArrowDropDown />}
                >
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="BTC/USD"
                  >
                    BTC/USD
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="BTC/USDT"
                  >
                    BTC/USDT
                  </option>

                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="BTC/ADA"
                  >
                    BTC/ADA
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="BTC/ETH"
                  >
                    BTC/ETH
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="BTC/DOGE"
                  >
                    BTC/DOGE
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="BTC/XLM"
                  >
                    BTC/XLM
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="ETH/BTC"
                  >
                    ETH/BTC
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="ETH/BCH"
                  >
                    ETH/BCH
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="ETH/USDT"
                  >
                    ETH/USDT
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="ETH/LINK"
                  >
                    ETH/LINK
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="ETH/DOGE"
                  >
                    ETH/DOGE
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="USDT/BTC"
                  >
                    USDT/BTC
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="USDT/ETH"
                  >
                    USDT/ETH
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="USDT/DOGE"
                  >
                    USDT/DOGE
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="USDT/BCH"
                  >
                    USDT/BCH
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="USDT/LTC"
                  >
                    USDT/LTC
                  </option>
                </Select>
              </FormControl>

              <Flex gap={4} p={2} w="100%">
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  _hover={{
                    background: "#64d2b1",
                  }}
                  onClick={() => {
                    handleMakeTrade("SELL");
                  }}
                  color={"#fff"}
                  background="tomato"
                >
                  SELL
                </Button>
                <Button
                  fontSize={14}
                  type="submit"
                  w="100%"
                  _hover={{
                    background: "#64d2b1",
                  }}
                  color={"#fff"}
                  onClick={() => {
                    handleMakeTrade("BUY");
                  }}
                  colorScheme="whatsapp"
                >
                  BUY
                </Button>
              </Flex>
            </form>
          </Box>
        </div>
        <Flex gap={4} p={0} paddingBlock={6} w="100%">
          <Button
            onClick={() => handleClick("deposit-funds", {id: "YHB84Z"})}
            fontSize={14}
            type="submit"
            maxW={"20rem"}
            w="100%"
            _hover={{
              background: "#64d2b1",
            }}
            color={"#fff"}
            background="#55b598"
          >
            Deposits
          </Button>
          <Button
            onClick={() => handleClick("withdrawals", {id: "RST48H"})}
            fontSize={14}
            type="submit"
            maxW={"20rem"}
            w="100%"
            _hover={{
              background: "#64d2b1",
            }}
            color={"#fff"}
            background="#759c49"
          >
            Withdrawals
          </Button>
        </Flex>
      </section>
    </div>
  );
};

export default Trade;
