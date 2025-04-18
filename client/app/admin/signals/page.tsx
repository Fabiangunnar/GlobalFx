"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/pages/User.module.scss";
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
  Text,
} from "@chakra-ui/react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";
import { GiTrade } from "react-icons/gi";
import { SiCoinmarketcap } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPurchaseSignals,
  makeTrade,
  resetWithdrawalState,
} from "@/redux/features/HomeAppSlice";
import { setNavLink, setCurrentPage } from "@/redux/features/NavSlice";
import { useAppSelector } from "@/redux/hooks";
import { PurchaseSignalModal } from "@/components/pages/Modal";
import { useDisclosure } from "@chakra-ui/react";
import { ModalOverlay } from "@chakra-ui/react";

type Props = {};

const Trade = (props: Props) => {
  const [formData, setFormData] = useState<any>({});
  const modal = useDisclosure();
  const dispatch = useDispatch();
  const { tradingSignal, getState } = useAppSelector(
    (state) => state.HomeAppSlice
  );

  useEffect(() => {
    dispatch(getAllPurchaseSignals());
  }, []);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(10deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const handleSubmit = (data: any) => {
    setFormData(data);
    modal.onOpen();
  };

  return (
    <>
      <main className={`${styles.manage_user_block}`}>
        <section className={`${styles.user_block}`}>
          <div className={`${styles.management_block}`}>
            <div className={`${styles.management_head}`}>
              <SiCoinmarketcap />
              <p>Trading Signals</p>
            </div>
            <Box p={2} background={"#759c4930"}>
              <Flex
                flexWrap="wrap"
                p={2}
                gap={4}
                justifyContent="space-between"
              >
                {tradingSignal.map((signal, index) => (
                  <Box
                    key={`signal-${index}`}
                    width={["100%", "100%", "48%", "48%", "31%", "23%"]}
                    p={4}
                    py={8}
                    borderRadius="md"
                    background={index % 2 === 0 ? "#55b59840" : "#759c4940"}
                    _hover={{
                      background: index % 2 === 0 ? "#55b59860" : "#759c4960",
                      cursor: "pointer",
                    }}
                    mb={4}
                  >
                    <Flex
                      direction="column"
                      alignItems="center"
                      justifyContent="space-between"
                      w="100%"
                      h="100%"
                    >
                      <Flex direction="column" alignItems="center" w="100%">
                        <Box
                          fontSize="3xl"
                          color={index % 2 === 0 ? "#64d2b1" : "#bdffeb"}
                          mb={2}
                        >
                          <SiCoinmarketcap />
                        </Box>
                        <Text fontWeight="bold" mb={2} textAlign="center">
                          {signal.title}
                        </Text>
                        <Text fontSize="sm" textAlign="center" mb={3}>
                          {signal.description}
                        </Text>
                      </Flex>
                      <Flex direction="column" alignItems="center" w="100%">
                        <Flex
                          width="100%"
                          justifyContent="space-between"
                          borderTop="1px solid rgba(255,255,255,0.1)"
                          borderBottom="1px solid rgba(255,255,255,0.1)"
                          py={2}
                          px={1}
                          mb={2}
                        >
                          <Box>
                            <Text fontSize="xs" color="gray.400">
                              PRICE
                            </Text>
                            <Text
                              fontWeight="bold"
                              fontSize="md"
                              color={index % 2 === 0 ? "#64d2b1" : "#bdffeb"}
                            >
                              ${signal.price}
                            </Text>
                          </Box>
                          <Box textAlign="right">
                            <Text fontSize="xs" color="gray.400">
                              SUCCESS RATE
                            </Text>
                            <Text
                              fontWeight="bold"
                              fontSize="md"
                              color={index % 2 === 0 ? "#64d2b1" : "#bdffeb"}
                            >
                              {signal.percentage}%
                            </Text>
                          </Box>
                        </Flex>
                        <Button
                          mt={4}
                          size="sm"
                          onClick={() => handleSubmit(signal)}
                          w="100%"
                          _hover={{
                            background: "#64d2b1",
                          }}
                          color={"#fff"}
                          background={index % 2 === 0 ? "#55b598" : "#759c49"}
                        >
                          Subscribe Now
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
              </Flex>
              {/* 
              <Text
                fontWeight="bold"
                mt={6}
                px={2}
                mb={4}
                fontSize="xl"
                color="#bdffeb"
              >
                Mining Hardware
              </Text>
              <Box
                p={4}
                borderRadius="md"
                background={"rgba(32, 80, 79, 0.6)"}
                border="1px solid rgba(117, 156, 73, 0.3)"
              >
                <Flex flexWrap="wrap" gap={4} justifyContent="space-between">
                  {miningHardware.map((hardware, index) => (
                    <Box
                      key={`hardware-${index}`}
                      width={["100%", "100%", "48%", "48%", "31%", "23%"]}
                      p={4}
                      py={8}
                      borderRadius="md"
                      background={
                        index % 2 === 0
                          ? "rgba(85, 181, 152, 0.3)"
                          : "rgba(117, 156, 73, 0.3)"
                      }
                      _hover={{
                        background:
                          index % 2 === 0
                            ? "rgba(85, 181, 152, 0.4)"
                            : "rgba(117, 156, 73, 0.4)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      mb={4}
                      transition="all 0.3s ease"
                    >
                      <Flex
                        direction="column"
                        alignItems="center"
                        justifyContent="space-between"
                        w="100%"
                        h="100%"
                      >
                        <Flex direction="column" alignItems="center" w="100%">
                          <Box
                            fontSize="3xl"
                            color={index % 2 === 0 ? "#64d2b1" : "#bdffeb"}
                            mb={2}
                          >
                            {hardware.icon}
                          </Box>
                          <Text fontWeight="bold" mb={2} textAlign="center">
                            {hardware.title}
                          </Text>
                          <Text fontSize="sm" textAlign="center" mb={3}>
                            {hardware.description}
                          </Text>
                        </Flex>
                        <Flex direction="column" alignItems="center" w="100%">
                          <Flex
                            width="100%"
                            justifyContent="space-between"
                            borderTop="1px solid rgba(255,255,255,0.15)"
                            borderBottom="1px solid rgba(255,255,255,0.15)"
                            py={3}
                            px={2}
                            mb={3}
                            background="rgba(0,0,0,0.2)"
                            borderRadius="sm"
                          >
                            <Box>
                              <Text fontSize="xs" color="gray.400">
                                PRICE
                              </Text>
                              <Text
                                fontWeight="bold"
                                fontSize="lg"
                                color={index % 2 === 0 ? "#64d2b1" : "#bdffeb"}
                              >
                                ${hardware.price.toLocaleString()}
                              </Text>
                            </Box>
                            <Box textAlign="right">
                              <Text fontSize="xs" color="gray.400">
                                HASH RATE
                              </Text>
                              <Text
                                fontWeight="bold"
                                fontSize="lg"
                                color={index % 2 === 0 ? "#64d2b1" : "#bdffeb"}
                              >
                                {hardware.percentage}%
                              </Text>
                            </Box>
                          </Flex>
                          <Button
                            mt={4}
                            size="md"
                            w="100%"
                            onClick={() => handleSubmit(hardware)}
                            _hover={{
                              background: "#64d2b1",
                              transform: "translateY(-1px)",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                            color={"#fff"}
                            background={index % 2 === 0 ? "#55b598" : "#759c49"}
                            fontWeight="bold"
                            transition="all 0.2s ease"
                          >
                            Subscribe Now
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Box> */}
            </Box>
          </div>
        </section>
      </main>
      <PurchaseSignalModal
        overlay={overlay}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        signal={formData}
      />
    </>
  );
};

export default Trade;
