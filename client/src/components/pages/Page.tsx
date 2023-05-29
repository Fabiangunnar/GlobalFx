import React from "react";
import { useSelector } from "react-redux";
import KYC from "./Kyc";
import SupportTicket from "./SupportTicket";
import Notifications from "./Notifications";
import Downlines from "./Downlines";
import WithdrawFunds from "./WithdrawFunds";
import Trade from "./Trade";
import Topup from "./Topup";
import DepositFunds from "./DepositFunds";
import TransactionLogs from "./TransactionLogs";
import NewInvestments from "./NewInvestments";
import InvestmentHistory from "./InvestmentHistory";
import ReInvest from "./ReInvest";
import Dashboard from "./Dashboard";
import ProfilePage from "./ProfilePage";

type Props = {};

const Page = () => {
	const { currentPage } = useSelector((state: any) => state.nav);

	switch (currentPage) {
		case "dashboard":
			return <Dashboard />;
		case "deposit-funds":
			return <DepositFunds />;
		case "topup":
			return <Topup />;
		case "trade":
			return <Trade />;
		case "withdrawals":
			return <WithdrawFunds />;
		case "transaction-log":
			return <TransactionLogs />;
		case "new-investments":
			return <NewInvestments />;
		case "reinvest":
			return <ReInvest />;
		case "investment-history":
			return <InvestmentHistory />;
		case "notifications":
			return <Notifications />;
		case "support":
			return <SupportTicket />;
		case "downlines":
			return <Downlines />;
		case "kyc":
			return <KYC />;
		case "profile":
			return <ProfilePage />;
	}
	return <div>Error</div>;
};

export default Page;
