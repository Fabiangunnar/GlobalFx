import SpinnerPage from "@/components/Spinner";
import { sendContactForm } from "@/lib/api";
import styles from "@/app/styles/pages/User.module.scss";

import {
  createStandaloneToast,
  FormControl,
  Textarea,
  Button,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoNotifications } from "react-icons/io5";

type Props = {};

const page = (props: Props) => {
  const [isLoad, setIsLoad] = useState(false);
  const [mailData, setMailData] = useState({
    message: "",
    addressto: "",
    subject: "",
  });
  const { toast } = createStandaloneToast();

  const handleSendNotifications = async (e: any) => {
    e.preventDefault();
    setIsLoad(true);
    await sendContactForm(mailData);
    setIsLoad(false);
    toast({
      title: "Success.",
      description: "Mail Sent Successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
    setMailData({
      message: "",
      addressto: "",
      subject: "",
    });
  };
  const handleInputChange = (e: any) => {
    setMailData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section id="notifications" className={`${styles.user_block}`}>
      {isLoad && <SpinnerPage />}
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <IoNotifications />
          <p>Notifications</p>
        </div>

        <Box p={2}>
          <form action="" onSubmit={handleSendNotifications}>
            <FormControl p={2}>
              <Text mb="8px" fontSize={11}>
                Address to:{" "}
              </Text>
              <Input
                type="email"
                fontSize={12}
                name="addressto"
                value={mailData.addressto}
                onChange={handleInputChange}
                placeholder="clients email address"
                required
              />
            </FormControl>
            <FormControl p={2}>
              <Text mb="8px" fontSize={11}>
                Subject:{" "}
              </Text>
              <Input
                type="text"
                fontSize={12}
                name="subject"
                value={mailData.subject}
                onChange={handleInputChange}
                placeholder="Email subject"
                required
              />
            </FormControl>
            <FormControl p={2}>
              <Text mb="8px" fontSize={11}>
                Message:{" "}
              </Text>
              <Textarea
                fontSize={12}
                value={mailData.message}
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
  );
};

export default page;
