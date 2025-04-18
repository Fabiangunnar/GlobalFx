import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Box,
  Heading,
  useClipboard,
  Flex,
  createStandaloneToast,
  Progress,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { BiInfoCircle } from "react-icons/bi";

import SpinnerPage from "./Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetDeleteState,
  deleteUser,
  removeUser,
  TradingSignalDto,
  createTradeSignal,
  updateTradeSignal,
  getAllTradeSignals,
} from "@/redux/features/AppSlice";
type Props = {};

const ModalPage = ({ isOpen, onClose }: any) => {
  const { withdrawalCode } = useAppSelector((state) => state.AppSlice);
  const { hasCopied, onCopy } = useClipboard(withdrawalCode);
  const [buttonText, setButtonText] = useState("Copy to Clipboard");

  const handleCopy = () => {
    onCopy();
    setButtonText("Copied!");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setButtonText("Copy to Clipboard");
        }}
      >
        <ModalOverlay />
        <ModalContent
          w={{
            base: "80vw",
            md: "30rem",
          }}
        >
          <ModalHeader>Withdrawal Code</ModalHeader>
          <ModalCloseButton color={"#fff"} fontSize={20} />
          <ModalBody>
            <Flex
              p={4}
              align={"center"}
              fontSize={18}
              color={"red"}
              gap={4}
              fontWeight={600}
            >
              <BiInfoCircle />
              <Text colorScheme="info">code lasts for 3 hours</Text>
            </Flex>
            <Box p={4}>
              <Text fontSize={16} fontWeight={600}>
                {withdrawalCode}
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Flex justify={"center"} w={"100%"}>
              <Button
                onClick={handleCopy}
                colorScheme="blue"
                isLoading={hasCopied}
                fontSize={16}
                loadingText="Copying..."
                disabled={hasCopied}
              >
                {buttonText}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPage;
export const DeleteUserModal = ({ isOpen, onClose, userId }: any) => {
  const { deleteState, errorMessage } = useAppSelector(
    (state) => state.AppSlice
  );
  const [isLoading, setisLoading] = useState(false);
  const { toast } = createStandaloneToast();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (deleteState.isSuccess) {
      toast({
        title: "Success",
        description: "Delete Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setisLoading(false);
      onClose();
    }
    if (deleteState.isError) {
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
    if (deleteState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetDeleteState());
  }, [
    deleteState.isSuccess,
    deleteState.isError,
    deleteState.isLoading,
    dispatch,
  ]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w={{
            base: "80vw",
            md: "30rem",
          }}
        >
          <ModalHeader>DELETE USER!!</ModalHeader>
          <ModalCloseButton color={"#fff"} fontSize={20} />
          {isLoading && <Progress size="xs" height={8} isIndeterminate />}
          <ModalBody>
            <Box p={4}>
              <Text fontSize={16} fontWeight={600}>
                DO YOU REALLY WANT TO DELETE THIS USER? <br /> IT CANNOT BE
                UNDONE
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Flex justify={"center"} w={"100%"}>
              <Button
                onClick={async () => {
                  await dispatch(deleteUser(userId));
                  dispatch(removeUser(userId));
                }}
                colorScheme="red"
              >
                DELETE
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const CreateSignalModal = ({
  isOpen,
  onClose,
  overlay,
  tradeSignal,
  updateSignal,
}: {
  isOpen: boolean;
  onClose: () => void;
  overlay: any;
  tradeSignal: TradingSignalDto;
  updateSignal: boolean;
}) => {
  const { sendState, errorMessage } = useAppSelector((state) => state.AppSlice);
  const [isLoading, setisLoading] = useState(false);
  const { toast } = createStandaloneToast();
  const [tradeSignalData, setTradeSignalData] = useState({
    title: tradeSignal.title ?? "",
    description: tradeSignal.description ?? "",
    price: tradeSignal.price ?? "",
    percentage: tradeSignal.percentage ?? "",
  });
  useEffect(() => {
    setTradeSignalData({
      title: tradeSignal.title ?? "",
      description: tradeSignal.description ?? "",
      price: tradeSignal.price ?? "",
      percentage: tradeSignal.percentage ?? "",
    });
  }, [tradeSignal]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (sendState.isSuccess) {
      toast({
        title: "Success",
        description: "Delete Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(getAllTradeSignals());
      setisLoading(false);
      onClose();
    }
    if (sendState.isError) {
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
    if (sendState.isLoading) {
      setisLoading(true);
    }

    dispatch(resetDeleteState());
  }, [sendState.isSuccess, sendState.isError, sendState.isLoading, dispatch]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {overlay}{" "}
        <ModalContent
          w={{
            base: "80vw",
            md: "30rem",
          }}
        >
          <ModalHeader>
            {updateSignal ? "UPDATE SIGNAL" : "CREATE SIGNAL"}
          </ModalHeader>
          <ModalCloseButton color={"#fff"} fontSize={20} />
          {isLoading && <Progress size="xs" height={8} isIndeterminate />}
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={tradeSignalData.title}
                onChange={(e: any) =>
                  setTradeSignalData({
                    ...tradeSignalData,
                    title: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={tradeSignalData.description}
                onChange={(e: any) =>
                  setTradeSignalData({
                    ...tradeSignalData,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={tradeSignalData.price}
                onChange={(e: any) =>
                  setTradeSignalData({
                    ...tradeSignalData,
                    price: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Percentage</FormLabel>
              <Input
                type="number"
                value={tradeSignalData.percentage}
                onChange={(e: any) =>
                  setTradeSignalData({
                    ...tradeSignalData,
                    percentage: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Flex justify={"center"} w={"100%"}>
              <Button
                onClick={async () => {
                  if (updateSignal) {
                    await dispatch(
                      updateTradeSignal({
                        id: tradeSignal.id,
                        signalData: tradeSignalData,
                      })
                    );
                  } else {
                    await dispatch(createTradeSignal(tradeSignalData));
                  }
                }}
                colorScheme={updateSignal ? "blue" : "red"}
              >
                {updateSignal ? "UPDATE" : "CREATE"}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
