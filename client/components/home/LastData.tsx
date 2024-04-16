import { Card, CardBody, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import Image from "next/image";
import { depositstats, paymentstats } from "@/data/maindata";

type Props = {};

const LastData = (props: Props) => {
	return (
		<Flex gap={6} direction={{ base: "column", lg: "row" }} w={"100%"}>
			<Card bg={"rgba(0, 0, 0, 0.3)"} p={4} color={"#fff"} w={"100%"}>
				<CardBody>
					<Flex direction={"column"} gap={8}>
						<Heading
							fontFamily={"inherit"}
							pointerEvents={"none"}
							fontWeight={400}
							fontSize={[20, 22, 24, 26, 28]}>
							LAST DEPOSITS
						</Heading>
						<Grid
							templateColumns={"1fr 1fr 1fr"}
							alignItems={"flex-start"}
							gap={4}>
							{depositstats.map((depositstat) => {
								return (
									<Fragment key={depositstat.id}>
										<Flex align={"center"} h={"100%"}>
											<Text fontSize={[12, 13, 14, 15, 16]}>
												{depositstat.name}
											</Text>
										</Flex>
										<Flex>
											<Image
												width={100}
												height={50}
												alt={""}
												src={depositstat.img}
											/>
										</Flex>
										<Flex align={"center"} h={"100%"}>
											<Text
												bgGradient="linear-gradient(41deg, rgba(129,255,253,1) 0%, rgba(205,255,148,1) 100%)"
												bgClip="text"
												fontSize={[12, 13, 14, 15, 16]}>
												{depositstat.price}
											</Text>
										</Flex>
									</Fragment>
								);
							})}
						</Grid>
					</Flex>
				</CardBody>
			</Card>
			<Card
				bg={"transparent"}
				bgGradient={
					" linear-gradient(41deg, rgba(158,209,99,0.1) 0%, rgba(64,239,235,0.2) 100%)"
				}
				p={4}
				color={"#fff"}
				w={"100%"}>
				<CardBody>
					<Flex direction={"column"} gap={8}>
						<Heading
							fontFamily={"inherit"}
							pointerEvents={"none"}
							fontWeight={500}
							fontSize={[20, 22, 24, 26, 28]}>
							LAST PAYMENTS
						</Heading>

						<Grid
							templateColumns={"1fr 1fr 1fr"}
							alignItems={"flex-start"}
							justifyContent={"center"}
							gap={4}>
							{paymentstats.map((paymentstat) => {
								return (
									<Fragment key={paymentstat.id}>
										<Flex align={"center"} h={"100%"}>
											<Text fontSize={[12, 13, 14, 15, 16]}>
												{paymentstat.name}
											</Text>
										</Flex>

										<Image
											width={100}
											height={100}
											alt={""}
											src={paymentstat.img}
										/>
										<Flex align={"center"} h={"100%"}>
											<Text
												bgGradient="linear-gradient(41deg, rgba(129,255,253,1) 0%, rgba(205,255,148,1) 100%)"
												bgClip="text"
												fontSize={[12, 13, 14, 15, 16]}>
												{paymentstat.price}
											</Text>
										</Flex>
									</Fragment>
								);
							})}
						</Grid>
					</Flex>
				</CardBody>
			</Card>
		</Flex>
	);
};

export default LastData;
