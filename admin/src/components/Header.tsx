import React, { useEffect, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import styles from "@/styles/Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setOpenNav } from "@/redux-actions/navSlice";
import {
  Button,
  Flex,
  createStandaloneToast,
  useDisclosure,
} from "@chakra-ui/react";
import { RootState } from "@/redux-store/store";
import { getCode, resetCodeState } from "@/redux-actions/AppSlice";
import SpinnerPage from "./Page/Spinner";
import ModalPage from "./Page/ModalPage";
type Props = {};

const Header = (props: Props) => {
  const { getCodeState, withdrawalCode, errorMessage } = useSelector(
    (state: RootState) => state.AppSlice
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { toast } = createStandaloneToast();
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const [code, setCode] = useState();
  const handleOpenNav = () => {
    dispatch(setOpenNav());
  };

  const handleGetCode = () => {
    dispatch(getCode());
  };

  useEffect(() => {
    if (getCodeState.isSuccess) {
      setisLoading(false);
      onOpen();
    }
    if (getCodeState.isError) {
      toast({
        title: errorMessage?.statusCode,
        description: errorMessage?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
    }

    if (getCodeState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetCodeState());
  }, [
    getCodeState.isSuccess,
    getCodeState.isError,
    getCodeState.isLoading,
    dispatch,
  ]);
  return (
    <>
      {isLoading && <SpinnerPage />}
      <ModalPage isOpen={isOpen} onClose={onClose} />
      <div className={`${styles.top_nav}`}>
        <Flex w={"100%"} justify={"center"}>
          <Button color={"#000"} onClick={handleGetCode}>
            CODE
          </Button>
        </Flex>
        <span
          className={`${styles.menu_bar} ${styles.mobile}`}
          onClick={handleOpenNav}>
          <HiOutlineBars3BottomRight />
        </span>
      </div>
    </>
  );
};

export default Header;
