import React from "react";
import {getIconComponent, pmfstats_one, pmfstats_two} from "@/data/maindata";
import pagestyles from "@/styles/home/Main.module.scss";
import {Flex, Grid, Heading, Text} from "@chakra-ui/react";

type Props = {};

const IconBoxes = ({boxOne = false, boxTwo = false}) => {
  return (
    <>
      <Flex
        className={` ${pagestyles.image_box} `}
        w={"100%"}
        direction={"column"}
        gap={4}>
        {boxOne && (
          <Grid
            w={"100%"}
            gap={3}
            p={2}
            gridTemplateColumns={{
              base: "1fr 1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}>
            {pmfstats_one.map((item, index) => {
              const icon = getIconComponent(item?.icon);

              return (
                <Flex
                  key={index}
                  direction={"column"}
                  textAlign={"center"}
                  justify={"column"}
                  gap={2}
                  align={"center"}>
                  <Flex
                    fontSize={[50, 54, 58, 62, 66]}
                    justify={"column"}
                    align={"center"}>
                    <svg style={{position: "absolute"}} width="20" height="20">
                      <defs>
                        <linearGradient
                          id="blue-gradient"
                          x1="100%"
                          y1="100%"
                          x2="0%"
                          y2="0%">
                          <stop offset="5%" stopColor="#40efeb" />
                          <stop stopColor=" #9ed163" offset="100%" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {icon}
                  </Flex>
                  <Heading
                    fontWeight={500}
                    bgGradient="linear-gradient(90deg, #40efeb, #9ed163)"
                    bgClip="text"
                    fontSize={[18, 20, 22, 24, 26]}>
                    {item.head}
                  </Heading>
                  <Text fontSize={[11, 12, 13, 14, 15]}>{item.desc}</Text>
                </Flex>
              );
            })}
          </Grid>
        )}
        {boxTwo && (
          <Grid
            gap={3}
            p={2}
            gridTemplateColumns={{
              base: "1fr 1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}>
            {pmfstats_two.map((item) => {
              const icon = getIconComponent(item?.icon);

              return (
                <Grid
                  gridTemplateRows={"0.8fr 0.4fr"}
                  textAlign={"center"}
                  px={2}
                  key={item.id}
                  gap={4}
                  cursor={"pointer"}
                  placeItems={"space-between"}>
                  <Flex
                    p={4}
                    borderRadius={"1rem"}
                    border={"2px solid rgba(99, 255, 251, 1)"}
                    bgGradient={"linear-gradient(90deg, #40efeb10, #9ed16310)"}
                    fontSize={[50, 54, 58, 62, 66]}
                    justify={"center"}
                    h={{sm: "6rem", md: "8rem"}}
                    _hover={{
                      background:
                        "linear-gradient(90deg, #40efeb20, #9ed16320)",
                    }}
                    align={"center"}>
                    <svg style={{position: "absolute"}} width="20" height="20">
                      <defs>
                        <linearGradient
                          id="blue-gradient"
                          x1="100%"
                          y1="100%"
                          x2="0%"
                          y2="0%">
                          <stop offset="5%" stopColor="#40efeb" />
                          <stop stopColor=" #9ed163" offset="100%" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {icon}
                  </Flex>

                  <Text color={"gray.400"} fontSize={[10, 10, 11, 11, 12]}>
                    {item.desc}
                  </Text>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Flex>
    </>
  );
};

export default IconBoxes;
