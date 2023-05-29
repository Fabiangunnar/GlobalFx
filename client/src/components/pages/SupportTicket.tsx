import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/User.module.scss";
import { BiMoneyWithdraw } from "react-icons/bi";
import {
  Box,
  Button,
  Card,
  createStandaloneToast,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSendState,
  sendSupportTicket,
} from "@/redux-actions/HomeAppSlice";
import { RootState } from "@/redux-store/store";
import SpinnerPage from "../home/Spinner";

type Props = {};

const SupportTicket = (props: Props) => {
  const { toast } = createStandaloneToast();
  const [isLoad, setIsLoad] = React.useState(false);
  const [formData, setFormData] = useState<any>({
    subject: "",
    message: "",
  });
  const { sendState, errorMessage, userInfo } = useSelector(
    (state: RootState) => state.HomeAppSlice
  );
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(sendSupportTicket({ ...formData, userId: userInfo?.id }));
  };
  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    if (sendState.isSuccess) {
      toast({
        title: "Success.",
        description: "Support Ticket Sent.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
      });
      setIsLoad(false);
      setFormData({ subject: "", message: "" });
    }
    if (sendState.isError) {
      toast({
        title: errorMessage.statusCode,
        description: errorMessage.message,
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
  return (
    <div className={`${styles.manage_user_grid}`}>
      {isLoad && <SpinnerPage />}
      <section className={`${styles.user_block}`}>
        <div className={`${styles.management_block}`}>
          <div className={`${styles.management_head}`}>
            <p>Support Ticket</p>
          </div>

          <Box p={2} background={"#759c4930"}>
            <form action="" onSubmit={handleSubmit}>
              <FormControl p={2}>
                <FormLabel fontSize={11}>Subject</FormLabel>
                <Input
                  border={`1px solid #759c49`}
                  _focus={{
                    border: `1px solid #55b598`,
                    background: `#d0ff9c20`,
                  }}
                  type="text"
                  fontSize={12}
                  required
                  name="subject"
                  placeholder="What's the reason for your message "
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl p={2}>
                <Text mb="8px" fontSize={11}>
                  Message:{" "}
                </Text>
                <Textarea
                  border={`1px solid #759c49`}
                  _focus={{
                    border: `1px solid #55b598`,
                    background: `#d0ff9c20`,
                  }}
                  borderRadius={8}
                  fontSize={12}
                  value={formData.message}
                  required
                  name="message"
                  placeholder="Summarize's the message"
                  onChange={handleInputChange}
                  size="sm"
                />
              </FormControl>
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
                  Submit Ticket
                </Button>
              </FormControl>
            </form>
          </Box>
        </div>
      </section>
    </div>
  );
};

export default SupportTicket;
