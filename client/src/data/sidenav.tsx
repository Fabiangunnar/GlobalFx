import { HiHome, HiUsers } from "react-icons/hi2";
import {
  AiOutlineBarChart,
  AiOutlineLogout,
  AiFillCodeSandboxSquare,
  AiOutlineToTop,
  AiOutlineStock,
} from "react-icons/ai";
import {
  RiDashboardFill,
  RiFundsFill,
  RiLuggageDepositFill,
} from "react-icons/ri";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GiTrade } from "react-icons/gi";
import { BiMoneyWithdraw, BiTransfer } from "react-icons/bi";
import { TfiTicket } from "react-icons/tfi";
import { IoNotifications, IoSettings } from "react-icons/io5";
export interface NavTypes {
  id: string;
  icon: string;
  desc: string;
  state: boolean;
  link: string;
  submenu?: any;
}
export const navData: NavTypes[] = [
  {
    id: "PDQ17F",
    icon: "RiDashboardFill",
    desc: "Dashboard",
    state: true,
    link: "dashboard",
  },
  {
    id: "YHB84Z",
    icon: "AiOutlineToTop",
    desc: "Deposit",
    state: false,
    link: "deposit-funds",
  },
  //   {
  //     id: "LMK26P",
  //     icon: "AiOutlineToTop",
  //     desc: "Topup",
  //     state: false,
  //     link: "topup",
  //   },
  {
    id: "VWF31D",
    icon: "GiTrade",
    desc: "Trade",
    state: false,
    link: "trade",
  },
  {
    id: "RST48H",
    icon: "BiMoneyWithdraw",
    desc: "Withdraw",
    state: false,
    link: "withdrawals",
  },
  {
    id: "RSV48H",
    icon: "BiTransfer",
    desc: "Transaction Log",
    state: false,
    link: "transaction-log",
  },
  {
    id: "RST88H",
    icon: "FaMoneyBillAlt",
    desc: "Investments",
    state: false,
    link: "investments",
    submenu: [
      {
        id: "RST98H",
        desc: "Invest",
        state: false,
        link: "new-investments",
      },
      //   {
      //     id: "RSL98H",
      //     desc: "Reinvest",
      //     state: false,
      //     link: "reinvest",
      //   },
      {
        id: "KLP59J",
        desc: "Investment History",
        state: false,
        link: "investment-history",
      },
    ],
  },
  {
    id: "RST98H",
    icon: "IoNotifications",
    desc: "Notifications",
    state: false,
    link: "notifications",
  },
  {
    id: "KLP59J",
    icon: "TfiTicket",
    desc: "Support Tickets",
    state: false,
    link: "support",
  },
  {
    id: "QWE72M",
    icon: "AiOutlineStock",
    desc: "Downlines",
    state: false,
    link: "downlines",
  },

  {
    id: "QWE76M",
    icon: "AiFillCodeSandboxSquare",
    desc: "KYC",
    state: false,
    link: "kyc",
  },
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "RiDashboardFill":
      return <RiDashboardFill fontSize={18} />;
    case "RiFundsFill":
      return <RiFundsFill fontSize={18} />;
    case "AiOutlineToTop":
      return <AiOutlineToTop fontSize={18} />;
    case "AiOutlineBarChart":
      return <AiOutlineBarChart fontSize={18} />;
    case "GiTrade":
      return <GiTrade fontSize={18} />;
    case "BiMoneyWithdraw":
      return <BiMoneyWithdraw fontSize={18} />;
    case "TfiTicket":
      return <TfiTicket fontSize={18} />;
    case "AiFillCodeSandboxSquare":
      return <AiFillCodeSandboxSquare fontSize={18} />;
    case "IoSettings":
      return <IoSettings fontSize={18} />;
    case "AiOutlineLogout":
      return <AiOutlineLogout fontSize={18} />;
    case "BiTransfer":
      return <BiTransfer fontSize={18} />;
    case "IoNotifications":
      return <IoNotifications fontSize={18} />;
    case "FaMoneyBillAlt":
      return <FaMoneyBillAlt fontSize={18} />;
    case "AiOutlineStock":
      return <AiOutlineStock fontSize={18} />;

    default:
      return null;
  }
};
