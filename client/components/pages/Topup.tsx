import React from "react";
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
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import { AiOutlineToTop } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
type Props = {};

const Topup = (props: Props) => {
  return (
    <div className={`${styles.manage_user_block} ${styles.manage_user_grid}`}>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <AiOutlineToTop />
            <p>Topup Funds</p>
          </div>
          <Box p={2} background={"#759c4930"}>
            <form action="" className={`${styles.form}`}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Enter Trade Amount *</FormLabel>
                <NumberInput defaultValue={1000} min={200}>
                  <NumberInputField
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
                  className={`${styles.input}`}
                  fontSize={14}
                  icon={<MdArrowDropDown />}>
                  <option
                    style={{ background: "rgba(32, 80, 79, 1)" }}
                    value="option1">
                    Bitcoin
                  </option>
                  <option
                    style={{ background: "rgba(32, 80, 79, 1)" }}
                    value="option2">
                    USDT
                  </option>
                  <option
                    style={{ background: "rgba(32, 80, 79, 1)" }}
                    value="option3">
                    Ethereum
                  </option>
                </Select>
              </FormControl>

              <Box p={2} w="100%">
                <Text fontSize={12}>
                  You are provided with a very convenient method to Topup using
                  Bitcoin, Ethereum and USDT
                </Text>
              </Box>
            </form>
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
            <form action="" className={`${styles.form}`}>
              <Flex justify={"center"} w={"100%"}>
                <Text fontSize={12}>Ysfvw7dt6e7fefc763cge3cg98cy</Text>
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
                  background="#55b598">
                  Request Deposit
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>
    </div>
  );
};

export default Topup;
