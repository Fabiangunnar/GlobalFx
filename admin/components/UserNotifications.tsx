import React, { useEffect, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
import { FormControl, Textarea, Button, Box, Text } from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendNotification } from "@/redux/features/AppSlice";
import { useParams } from "next/navigation";

type Props = {};

const UserNotifications = (props: Props) => {
  const params = useParams();
  const [notifFormData, setNotifFormData] = useState({
    message: "",
  });
  const { sendState, updateState } = useAppSelector((state) => state.AppSlice);
  const dispatch = useAppDispatch();
  const handleInputChange = (e: any) => {
    setNotifFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSendNotifications = (e: any) => {
    e.preventDefault();
    dispatch(
      sendNotification({
        message: notifFormData.message,
        userId: params.id,
      })
    );
  };
  useEffect(() => {
    if (sendState.isSuccess) {
      setNotifFormData({ message: "" });
    }
    if (updateState.isSuccess) {
      setNotifFormData({ message: "" });
    }
  }, [sendState.isSuccess, updateState.isSuccess]);
  return (
    <section id="notifications" className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <IoNotifications />
          <p>Notifications</p>
        </div>

        <Box p={2}>
          <form action="" onSubmit={handleSendNotifications}>
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
  );
};

export default UserNotifications;
