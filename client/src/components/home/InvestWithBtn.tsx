import {resetCurrentPage, resetNav} from "@/redux-actions/homeNavSlice";
import {Button, Flex} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from "react";
import {useDispatch} from "react-redux";

type Props = {};

const InvestWithBtn = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Flex w="100%" justify={"center"}>
      <Button
        fontSize={[12, 14, 18, 20, 22]}
        p={[2, 4, 6, 8]}
        bg={"transparent"}
        textTransform={"uppercase"}
        fontWeight={400}
        letterSpacing={1}
        onClick={() => {
          const data = localStorage.getItem("user");
          if (data !== null) router.push("/admin");
          if (data === null) router.push("/admin/auth");
          dispatch(resetCurrentPage());
          dispatch(resetNav());
        }}
        bgGradient={"linear-gradient(90deg, #40efeb10, #9ed16310)"}
        _hover={{
          color: "#000",
          background: "linear-gradient(90deg, #4dfffc, #bfff76)",
        }}
        border={"2px solid rgba(99, 255, 251, 1)"}
        color={"#FFF"}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default InvestWithBtn;
