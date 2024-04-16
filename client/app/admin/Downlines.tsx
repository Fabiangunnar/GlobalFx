import React from "react";
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
import { CiLink } from "react-icons/ci";

type Props = {};

const Downlines = (props: Props) => {
	return (
		<section className={`${styles.user_block}`}>
			<div className={`${styles.management_block}`}>
				<div className={`${styles.management_head}`}>
					<CiLink />
					<p>Referrals</p>
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
									Name
								</Th>
								<Th fontSize={12} color={"#fff"} isNumeric>
									Date
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td fontSize={11}>25.4</Td>
								<Td fontSize={11}>inches</Td>
								<Td fontSize={11} isNumeric>
									millimetres (mm)
								</Td>
							</Tr>
						</Tbody>
						<Tfoot>
							<Tr>
								<Th fontSize={12} color={"#fff"}>
									S/N
								</Th>
								<Th fontSize={12} color={"#fff"}>
									Name
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

export default Downlines;
