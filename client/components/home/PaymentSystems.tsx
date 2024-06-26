import React from "react";
import pagestyles from "@/app/styles/home/Main.module.scss";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { resetCurrentPage, resetNav } from "@/redux/features/NavSlice";
import { useAppDispatch } from "@/redux/hooks";
import { appname } from "@/data/maindata";

type Props = {};

const PaymentSystems = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={` ${pagestyles.about2_top_head} ${pagestyles.bottom_block} ${pagestyles.top_head}`}
      >
        <Flex
          w={"100%"}
          direction={{ base: "column", lg: "row-reverse" }}
          gap={16}
        >
          <Flex
            w={"100%"}
            direction={"column"}
            gap={8}
            textAlign={"center"}
            paddingTop={6}
          >
            <Flex direction={"column"} gap={4}>
              <Heading
                className={` ${pagestyles.payment_top}`}
                fontFamily={"inherit"}
                fontWeight={400}
                fontSize={[22, 24, 26, 28, 30]}
              >
                PAYMENT SYSTEMS
              </Heading>
              <Text
                color={"gray.400"}
                fontWeight={100}
                fontSize={[12, 14, 16, 18, 20]}
              >
                {appname} supports a big number of payment systems
              </Text>
            </Flex>
            <Text fontSize={[12, 13, 14, 15, 16]}>
              Our company does not charge a fee to open an account. Only a
              commission fee to your account manager must be paid when you
              receive your profits not before withdrawing
            </Text>
            <Button
              fontSize={[14, 16, 18, 20, 22]}
              p={[2, 4, 6, 8]}
              bg={"transparent"}
              bgGradient={"linear-gradient(90deg, #40efeb10, #9ed16310)"}
              _hover={{
                color: "#000",
                background: "linear-gradient(90deg, #4dfffc, #bfff76)",
              }}
              border={"2px solid rgba(99, 255, 251, 1)"}
              color={"#FFF"}
              onClick={() => {
                const data = localStorage.getItem("user");
                if (data !== null) router.push("/admin");
                if (data === null) router.push("/admin/auth");
                dispatch(resetCurrentPage());
                dispatch(resetNav());
              }}
            >
              INVEST
            </Button>
          </Flex>
          <Flex className={` ${pagestyles.image_box} `} w={"100%"}>
            <Image width={500} height={500} src={"/payment.png"} alt="" />
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default PaymentSystems;
