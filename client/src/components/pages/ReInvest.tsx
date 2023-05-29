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
import {MdArrowDropDown} from "react-icons/md";
import {AiOutlineSelect, AiOutlineToTop} from "react-icons/ai";
import {TbListDetails} from "react-icons/tb";
type Props = {};

const ReInvest = (props: Props) => {
  return (
    <div className={`${styles.manage_user_block} ${styles.manage_user_grid}`}>
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <AiOutlineSelect />
            <p>Select Plan</p>
          </div>
          <Box p={2} background={"#759c4930"}>
            <form action="" className={`${styles.form}`}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Enter Amount *</FormLabel>
                <NumberInput defaultValue={1000} min={100}>
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
                <FormLabel fontSize={11}>Select Plan *</FormLabel>
                <Select
                  className={`${styles.input}`}
                  fontSize={14}
                  icon={<MdArrowDropDown />}
                >
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="option1"
                  >
                    Basic Plan
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="option2"
                  >
                    Standard Plan
                  </option>
                  <option
                    style={{background: "rgba(32, 80, 79, 1)"}}
                    value="option3"
                  >
                    Luxury Plan
                  </option>
                </Select>
              </FormControl>

              <Box p={2} w="100%">
                <Text fontSize={14}>Current Balance: $0</Text>
              </Box>
              <Box p={2} w="100%">
                <Text fontSize={12}>
                  In GLOBAL TYCOON FX - Your Trusted Crypto Investment Broker,
                  You will receive profits everyday including weekends.
                </Text>
              </Box>
            </form>
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
                  background="#55b598"
                >
                  Start Investment
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>
    </div>
  );
};

export default ReInvest;
