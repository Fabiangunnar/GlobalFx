import React from "react";
import {Box, Card, CardBody, Grid, Heading, Text} from "@chakra-ui/react";
import {AiOutlineLineChart, AiTwotoneTrophy} from "react-icons/ai";
import {IoFlash} from "react-icons/io5";
import {SiSpreadshirt} from "react-icons/si";
type Props = {};

const CryTypo = (props: Props) => {
  return (
    <Box w={"100%"} display={"flex"} flexDir={"column"} gap={4}>
      <Heading
        fontWeight={"ínherit"}
        // color={"rgb(105, 226, 176)"}
        fontSize={[28, 30, 34, 38, 42]}
        color={"gray.200"}
      >
        PUTTING OUR CLIENTS FIRST FOR OVER A DECADE.
      </Heading>
      <Grid
        p={"1rem 0"}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr",
          lg: "1fr 1fr 1fr 1fr",
        }}
        gap={4}
      >
        <Card
          border={"1px solid rgba(99, 255, 251, 0.4)"}
          bg={"rgba(0, 0, 0, 0.8)"}
          color={"grey.200"}
          backdropFilter={"blur(8px)"}
        >
          <CardBody display={"flex"} flexDir={"column"} gap={2}>
            <Box fontSize={[40, 42, 44, 46, 48]}>
              <AiTwotoneTrophy />{" "}
            </Box>
            <Text
              fontSize={[14, 16, 18, 20, 22]}
              color={"rgb(105, 226, 176)"}
              fontWeight={600}
              letterSpacing={1}
            >
              WINNING TRADING STRATEGY
            </Text>
            <Text fontSize={[12, 14, 15, 16, 18]} color={"gray.300"}>
              Trading strategies that really work – now they are yours.
            </Text>
          </CardBody>
        </Card>
        <Card
          border={"1px solid rgba(99, 255, 251, 0.4)"}
          // bg={"linear-gradient(90deg, #40efeb10, #9ed16310)"}
          bg={"rgba(0, 0, 0, 0.8)"}
          color={"grey.200"}
          backdropFilter={"blur(8px)"}
        >
          <CardBody display={"flex"} flexDir={"column"} gap={2}>
            <Box fontSize={[40, 42, 44, 46, 48]}>
              <AiOutlineLineChart />{" "}
            </Box>
            <Text
              fontSize={[14, 16, 18, 20, 22]}
              color={"rgb(105, 226, 176)"}
              fontWeight={600}
              letterSpacing={1}
            >
              HIGH LEVERAGE
            </Text>
            <Text fontSize={[12, 14, 15, 16, 18]} color={"gray.300"}>
              Chance to magnify your investment and really win big
            </Text>
          </CardBody>
        </Card>
        <Card
          border={"1px solid rgba(99, 255, 251, 0.4)"}
          // bg={"linear-gradient(90deg, #40efeb10, #9ed16310)"}
          bg={"rgba(0, 0, 0, 0.8)"}
          color={"grey.200"}
          backdropFilter={"blur(8px)"}
        >
          <CardBody display={"flex"} flexDir={"column"} gap={2}>
            <Box fontSize={[40, 42, 44, 46, 48]}>
              <IoFlash />{" "}
            </Box>
            <Text
              fontSize={[14, 16, 18, 20, 22]}
              color={"rgb(105, 226, 176)"}
              fontWeight={600}
              letterSpacing={1}
            >
              FAST EXECUTION
            </Text>
            <Text fontSize={[12, 14, 15, 16, 18]} color={"gray.300"}>
              Super-fast trading so you never suffer slippage.
            </Text>
          </CardBody>
        </Card>
        <Card
          border={"1px solid rgba(99, 255, 251, 0.4)"}
          // bg={"linear-gradient(90deg, #40efeb10, #9ed16310)"}
          bg={"rgba(0, 0, 0, 0.8)"}
          color={"grey.200"}
          backdropFilter={"blur(8px)"}
        >
          <CardBody display={"flex"} flexDir={"column"} gap={2}>
            <Box fontSize={[40, 42, 44, 46, 48]}>
              <SiSpreadshirt />{" "}
            </Box>
            <Text
              fontSize={[14, 16, 18, 20, 22]}
              color={"rgb(105, 226, 176)"}
              fontWeight={600}
              letterSpacing={1}
            >
              LOW SPREADS
            </Text>
            <Text fontSize={[12, 14, 15, 16, 18]} color={"gray.300"}>
              Trading strategies that really work – now they are yours.{" "}
            </Text>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};

export default CryTypo;
