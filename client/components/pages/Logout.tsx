import React from "react";
import styles from "@/styles/pages/Logout.module.scss";
import { Button, Flex } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { setCurrentPage, resetNav, closeNav } from "@/redux/features/NavSlice";
import { useAppDispatch } from "@/redux/hooks";

type Props = {};

const Logout = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleChangeNav = (link: string) => {
    dispatch(setCurrentPage(link));
    dispatch(resetNav());
    dispatch(closeNav());
  };
  const handleLogout = () => {
    router.push("/auth");
  };
  return (
    <section className={`${styles.logout}`}>
      <div className={`${styles.logout_card}`}>
        <h2 className={`${styles.l}`}>Confirm Logout?</h2>
        <div className={`${styles.line_through}`} />
        <Flex gap={16} justify={"space"}>
          <Button colorScheme="red" onClick={() => handleChangeNav("user")}>
            No
          </Button>
          <Button colorScheme="messenger" onClick={handleLogout}>
            Yes
          </Button>
        </Flex>
      </div>
    </section>
  );
};

export default Logout;
