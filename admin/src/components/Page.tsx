import React from "react";
import { useSelector } from "react-redux";
import User from "./Page/User";
import Investments from "./Page/Investments";
import Deposits from "./Page/Deposits";
import Trades from "./Page/Trades";
import Withdrawals from "./Page/Withdrawals";
import Support from "./Page/Support";
import Kyc from "./Page/Kyc";
import Settings from "./Page/Settings";
import Logout from "./Page/Logout";
import ManageUser from "./Page/ManageUser";

type Props = {};

const Page = () => {
	const { currentPage } = useSelector((state: any) => state.nav);

	switch (currentPage) {
		case "user":
			return <User />;
		case "investments":
			return <Investments />;
		case "deposits":
			return <Deposits />;
		case "trades":
			return <Trades />;
		case "withdrawals":
			return <Withdrawals />;
		case "support":
			return <Support />;
		case "kyc":
			return <Kyc />;
		case "settings":
			return <Settings />;
		case "logout":
			return <Logout />;
		case "manage-user":
			return <ManageUser />;
	}
	return <div>ghfg</div>;
};

export default Page;
