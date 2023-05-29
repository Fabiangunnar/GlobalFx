import React, { useEffect } from "react";
import styles from "@/styles/pages/User.module.scss";
import {
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  TableContainer,
  Table,
  TableCaption,
} from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store/store";
import { getAllNotifications } from "@/redux-actions/HomeAppSlice";
type Props = {};

const Notifications = (props: Props) => {
  const { notifications, userInfo } = useSelector(
    (state: RootState) => state.HomeAppSlice
  );
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllNotifications(userInfo?.id));
  //   //
  // }, [dispatch]);
  let hasNotificationsForUser = false;

  notifications.forEach((item) => {
    if (userInfo?.id === item.userId) {
      hasNotificationsForUser = true;
    }
  });

  return (
    <section className={`${styles.user_block}`}>
      <div className={`${styles.management_block}`}>
        <div className={`${styles.management_head}`}>
          <IoNotifications />
          <p>Notifications</p>
        </div>

        <TableContainer gap={1} background={"#759c4930"}>
          <Table variant="simple">
            <TableCaption color={"#fff"} fontSize={10}>
              Showing 71 to 73 of 73 entries
            </TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={12} color={"#fff"}>
                  S/N
                </Th>
                <Th fontSize={12} color={"#fff"}>
                  Message
                </Th>
                <Th fontSize={12} color={"#fff"} isNumeric>
                  Date
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {notifications.length > 0 ? (
                notifications.map((item, index) => {
                  if (userInfo?.id === item.userId) {
                    return (
                      <Tr key={item.id}>
                        <Td fontSize={12} color={"#fff"}>
                          {index}
                        </Td>
                        <Td fontSize={12} color={"#fff"}>
                          {item.message}
                        </Td>
                        <Td fontSize={12} color={"#fff"} isNumeric>
                          {item.createdAt}
                        </Td>
                      </Tr>
                    );
                  } else {
                    return false;
                  }
                })
              ) : (
                <Tr>
                  <Td></Td>
                  <Td>No messages for you</Td>
                  <Td></Td>
                </Tr>
						  ) } */}
              {hasNotificationsForUser ? (
                <>
                  {[...notifications]
                    .sort((a, b) => {
                      const dateA = new Date(a.createdAt);
                      const dateB = new Date(b.createdAt);

                      return dateB.getTime() - dateA.getTime();
                    })
                    .map((item, index) => {
                      const date = new Date(`${item.createdAt}`);

                      const options: any = {
                        weekday: "long",
                        //   year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        //   second: "numeric",
                        //   timeZoneName: "short",
                      };

                      const formattedDate = `${date.toLocaleDateString(
                        "en-US",
                        options
                      )}`;
                      if (userInfo?.id === item.userId) {
                        return (
                          <Tr key={item.id}>
                            <Td fontSize={12} color={"#fff"}>
                              {index + 1}
                            </Td>
                            <Td fontSize={12} color={"#fff"}>
                              {item.message}
                            </Td>
                            <Td fontSize={12} color={"#fff"} isNumeric>
                              {formattedDate}
                            </Td>
                          </Tr>
                        );
                      }
                    })}
                </>
              ) : (
                <Tr>
                  <Td></Td>
                  <Td fontSize={12}>No messages for you</Td>
                  <Td></Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th fontSize={12} color={"#fff"}>
                  S/N
                </Th>
                <Th fontSize={12} color={"#fff"}>
                  Message
                </Th>
                <Th fontSize={12} color={"#fff"} isNumeric>
                  Date
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default Notifications;
