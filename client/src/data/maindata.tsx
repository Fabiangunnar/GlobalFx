import {BsCoin, BsInfoSquare, BsQuestionSquare, BsRobot} from "react-icons/bs";
import {FaChartPie, FaConnectdevelop, FaQuestion} from "react-icons/fa";
import {
  GiCubeforce,
  GiGoldBar,
  GiTakeMyMoney,
  GiTrade,
  GiTriforce,
  GiTwoCoins,
  GiWallet,
} from "react-icons/gi";
import {IoCashSharp, IoHome} from "react-icons/io5";
import {
  MdContacts,
  MdOutlineManageAccounts,
  MdSwitchAccount,
  MdToken,
} from "react-icons/md";
import {ImStatsDots} from "react-icons/im";
import {AiOutlineLogin, AiTwotoneSchedule} from "react-icons/ai";
import {TbTriangles} from "react-icons/tb";
import {
  RiExchangeDollarFill,
  RiLuggageDepositFill,
  RiStockFill,
} from "react-icons/ri";
import {HiOutlineUserGroup, HiUserGroup} from "react-icons/hi2";
import {BiTransferAlt} from "react-icons/bi";
import {FiAlertTriangle} from "react-icons/fi";

export interface footerTypes {
  id: string;
  head: string;
  links: linkTypes[];
}
export interface linkTypes {
  id: string;
  desc: string;
  link?: string;
}
export interface NavTypes {
  id: string;
  head: string;
  link?: string;
  icon: string;
  state: boolean;
  subnav?: any[];
}

export const footerData: footerTypes[] = [
  {
    id: "LMK26P",
    head: "Menu",
    links: [
      {
        id: `RST98H`,
        desc: "About us",
        link: "about",
      },
      {
        id: `XST98H`,
        desc: "Investments",
        link: "investments",
      },
      {
        id: `ZST98H`,
        desc: "FAQ",
        link: "faq",
      },
      {
        id: `RPT98H`,
        desc: "Contacts",
        link: "contact",
      },
      {
        id: `RPB88H`,
        desc: "Anti Fraud Notice",
        link: "anti-fraud",
      },
    ],
  },
  {
    id: "QWE72M",
    head: "Actions",
    links: [
      {
        id: `RST98H`,
        desc: "Make a Deposit",
        // link: "deposit-funds",
      },
      {
        id: `XST98H`,
        desc: "Statistics",
        // link: "statistics",
      },
      {
        id: `ZST98H`,
        desc: "Login",
        link: "admin/auth",
      },
    ],
  },
  {
    id: "KLP59J",
    head: "Language",
    links: [
      {
        id: `RST98H`,
        desc: "ENGLISH",
      },
    ],
  },
];

export const navData: NavTypes[] = [
  {
    id: "LMK26P",
    head: "Home Page",
    link: "/",
    icon: "IoHome",
    state: true,
  },
  {
    id: "XST98H",
    head: "About us",
    link: "about",
    icon: "BsInfoSquare",
    state: false,
  },
  {
    id: "QWE72M",
    head: "Investments",
    link: "investments",
    icon: "GiTrade",
    state: false,
  },
  {
    id: "KLP59K",
    head: "Contacts",
    link: "contact",
    icon: "MdContacts",
    state: false,
  },
  {
    id: "KLL19K",
    head: "Finance",
    icon: "BsCoin",
    state: false,
    subnav: [
      {
        id: "PAK26P",
        head: "Crypto",
        link: "crypto",
        icon: "GiTwoCoins",
        state: false,
      },
      {
        id: "QRP59K",
        head: "NFT",
        link: "nft",
        icon: "MdToken",
        state: false,
      },
      {
        id: "QWE02M",
        head: "Stocks",
        link: "stocks",
        icon: "RiStockFill",
        state: false,
      },
      {
        id: "LMK26P",
        head: "Gold",
        link: "gold",
        icon: "GiGoldBar",
        state: false,
      },
      {
        id: "LAU26P",
        head: "Plans",
        link: "plans",
        icon: "AiTwotoneSchedule",
        state: false,
      },
      {
        id: `RPB88H`,
        head: "Anti Fraud Notice",
        link: "anti-fraud",
        icon: "FiAlertTriangle",
        state: false,
      },
    ],
  },
  {
    id: "KLP58J",
    head: "Statistics",
    link: "statistics",
    icon: "ImStatsDots",
    state: false,
  },
  {
    id: "KLP59J",
    head: "FAQ",
    link: "faq",
    icon: "FaQuestion",
    state: false,
  },
  {
    id: "KQR71K",
    head: "Sign In",
    link: "admin/auth",
    icon: "AiOutlineLogin",
    state: false,
  },
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "IoHome":
      return <IoHome fontSize={18} />;
    case "GiTwoCoins":
      return <GiTwoCoins fontSize={18} />;
    case "FiAlertTriangle":
      return <FiAlertTriangle fontSize={18} />;
    case "RiStockFill":
      return <RiStockFill fontSize={18} />;
    case "GiGoldBar":
      return <GiGoldBar fontSize={18} />;
    case "AiTwotoneSchedule":
      return <AiTwotoneSchedule fontSize={18} />;
    case "MdToken":
      return <MdToken fontSize={18} />;
    case "BsInfoSquare":
      return <BsInfoSquare fontSize={18} />;
    case "GiTrade":
      return <GiTrade fontSize={18} />;
    case "FaQuestion":
      return <FaQuestion fontSize={18} />;
    case "GiTrade":
      return <GiTrade fontSize={18} />;
    case "MdContacts":
      return <MdContacts fontSize={18} />;
    case "ImStatsDots":
      return <ImStatsDots fontSize={18} />;
    case "AiOutlineLogin":
      return <AiOutlineLogin fontSize={18} />;
    case "BsCoin":
      return <BsCoin fontSize={18} />;
    case "TbTriangles":
      return <GiTriforce style={{fill: "url(#blue-gradient)"}} />;
    case "MdSwitchAccount":
      return <MdSwitchAccount style={{fill: "url(#blue-gradient)"}} />;
    case "RiLuggageDepositFill":
      return <RiLuggageDepositFill style={{fill: "url(#blue-gradient)"}} />;
    case "GiTakeMyMoney":
      return <GiTakeMyMoney style={{fill: "url(#blue-gradient)"}} />;
    case "BsQuestionSquare":
      return <BsQuestionSquare style={{fill: "url(#blue-gradient)"}} />;
    case "IoCashSharp":
      return <IoCashSharp style={{fill: "url(#blue-gradient)"}} />;
    case "RiExchangeDollarFill":
      return <RiExchangeDollarFill style={{fill: "url(#blue-gradient)"}} />;
    case "HiUserGroup":
      return <HiUserGroup style={{fill: "url(#blue-gradient)"}} />;
    case "FaChartPie":
      return <FaChartPie style={{fill: "url(#blue-gradient)"}} />;
    case "BiTransferAlt":
      return <BiTransferAlt style={{fill: "url(#blue-gradient)"}} />;
    case "GiTrade2":
      return <GiTrade style={{fill: "url(#blue-gradient)"}} />;
    case "GiWallet":
      return <GiWallet style={{fill: "url(#blue-gradient)"}} />;
    case "BsRobot":
      return <BsRobot style={{fill: "url(#blue-gradient)"}} />;
    case "FaConnectdevelop":
      return <FaConnectdevelop style={{fill: "url(#blue)"}} />;
    case "GiCubeforce":
      return <GiCubeforce style={{fill: "url(#blue)"}} />;
    case "MdOutlineManageAccounts":
      return <MdOutlineManageAccounts style={{fill: "url(#blue)"}} />;

    default:
      return null;
  }
};

export const faqData = [
  {
    id: "LMK26P",
    head: "ABOUT US",
    icon: "TbTriangles",
    state: false,
    subheads: [
      {
        id: "LMK26P",
        state: false,
        head: "WHAT IS GLOBAL TYCOON FX ?",
        desc: "GLOBAL TYCOON FX - Professional team of cryptocurrency industry developers. The main advantage of the company is a unique trading bot that makes a profit at the stage of growth and market decline.",
      },
      {
        id: "QWE72M",
        state: false,
        head: "IS GLOBAL TYCOON FX the OFFICIALLY REGISTERED COMPANY?",
        desc: "Yes, we are legally binding and officially registered in the UK under the company registration number #08683932",
      },

      {
        id: "KLP59J",
        state: false,
        head: "DO YOU HAVE ANY COUNTRY RESTRICTIONS?",
        desc: "Our company doesn't work and doesn't accept deposits from Russian residents. During the registration process you need to check the box that you are not a Russian citizen.",
      },
    ],
  },
  {
    id: "QWE72M",
    head: "My Account",
    icon: "MdSwitchAccount",
    state: false,
    subheads: [
      {
        id: "KLP59K",
        state: false,
        head: "HOW MANY ACCOUNTS CAN I OPEN?",
        desc: "Each user can only open and manage one account. Please follow this rule. In case of violation the company has the right to block all your accounts without a refund.",
      },
      {
        id: "KLL19K",
        state: false,
        head: "HOW TO UPLOAD PERSONAL DATA?",
        desc: "Please note that we do not require your personal information. To work with our platform, you need to specify your login, your email, come up with a password, and also specify the wallet number to which funds will be withdrawn from the platform.",
      },
      {
        id: "KLP49J",
        state: false,
        head: "HOW MUCH DOES IT COST TO OPEN AN ACCOUNT?",
        desc: "Opening an account is absolutely free. We do not charge you any hidden fees or service charges. The commission on operations and additional costs is included in the company's profits from the profits from the development of cryptocurrency robots.",
      },
      {
        id: "KL929J",
        state: false,
        head: "CAN I REGISTER MY CHILD?",
        desc: "Any person who has reached the age of majority in their country of residence can register in GLOBAL TYCOON FX",
      },
      {
        id: "KQR71K",
        state: false,
        head: "CAN I LOSE MY FUNDS BY INVESTING IN YOUR COMPANY?",
        desc: "Your investment, as well as your loyalty, are our core values. We will work hard to preserve your funds, reduce the risk of loss to zero, and we will do our best to multiply your funds.",
      },
      {
        id: "KLP59Z",
        state: false,
        head: "WHAT DOES THE COMPANY DO WITH USERS' PERSONAL DATA?",
        desc: "We collect your personal information only for internal use. This data will not be passed to third parties under any circumstances.",
      },
      {
        id: "KLU19K",
        state: false,
        head: "CAN I BE SURE THAT MY DATA IS SECURE?",
        desc: "We guarantee your privacy and secured. The site is protected from complex DDoS attacks by multi-layered protection. Any transmitted data is SSL encrypted. We have high quality SSL certificates.",
      },
      {
        id: "KLX29J",
        state: false,
        head: "WHAT TO DO IF I CAN NOT REGISTER?",
        desc: "Make sure that the input data is, such as e-mail, password and login, no spaces. If everything is ok, but registration still fails, please contact online support.",
      },
      {
        id: "KQR71Q",
        state: false,
        head: "HOW TO BECOME AN INVESTOR?",
        desc: "3 steps to get started with our company",
        descList: [
          {
            id: "KQR71K",
            head: "REGISTRATION BUTTON",
            desc: "Click the Register button. Enter your details to quickly create a FREE GLOBAL TYCOON FX account.",
          },
          {
            id: "KLP59Z",
            head: "OPEN A DEPOSIT",
            desc: "We offer different investment plans. You need to choose a plan that suits your financial goals. Make a deposit after reading.",
          },
          {
            id: "KLU19K",
            head: "START EARNING",
            desc: "After depositing, watch your capital grow by accumulating daily profit in real time.",
          },
        ],
      },
    ],
  },

  {
    id: "KLP59J",
    head: "Deposit",
    icon: "RiLuggageDepositFill",
    state: false,
    subheads: [
      {
        id: "KLP59K",
        state: false,
        head: "WHAT WAYS TO OBTAIN INCOME IN GLOBAL TYCOON FX ARE?",
        desc: "Users have the opportunity to earn in two ways: by opening a deposit for the chosen investment plan, as well as by receiving partner rewards for attracting new members.",
      },
      {
        id: "KLL19K",
        state: false,
        head: "TELL DETAILS HOW TO OPEN A DEPOSIT IN YOUR SYSTEM?",
        desc: 'Using the username and password you entered during registration, log into your account. Click the "Create Deposit" button. Choose the tariff plan that suits you and enter the amount you plan to invest. After confirming the amount and choosing an electronic payment system, you will be redirected to the electronic payment system. Follow her instructions to pay for the transaction. Then you will be redirected back to your Personal Account again. Funds will be credited automatically to the previously selected investment plan.',
      },
      {
        id: "KLP39J",
        state: false,
        head: "WHAT PAYMENT METHODS CAN I USE TO DEPOSIT?",
        desc: "We work with payment systems PerfectMoney, BitCoin, Ethereum, LiteCoin, DogeCoin, TRON, Tether TRC20, Tether ERC20",
      },
      {
        id: "KL929J",
        state: false,
        head: "ARE THERE ANY RESTRICTIONS ON THE AMOUNT OF INVESTMENT?",
        desc: `The tariff plans set the following restrictions on the minimum and maximum amount of the deposit.
				Minimum Amount: 10 usd, 0.005 btc, 0.02 eth, 0.3 ltc, 50 doge, 100 trx, 10 usdt,
				Maximum Amount: 75000 usd, 1.5 btc, 20 eth, 300 ltc, 350000 doge, 750000 trx, 75000 usdt`,
      },
      {
        id: "KQR71K",
        state: false,
        head: "ARE THERE ANY INVESTMENT LIMITS?",
        desc: "Investments are processed in strict accordance with the terms of the tariff plan.",
      },
      {
        id: "KLP59Z",
        state: false,
        head: "IS IT POSSIBLE TO INCREASE THE AMOUNT OF THE WORKING DEPOSIT?",
        desc: "No, you cannot increase the amount of a deposit that has already been created. However, you can create other unlimited deposits.",
      },
      {
        id: "KLU19K",
        state: false,
        head: "CAN I MAKE MULTIPLE DEPOSITS AT THE SAME TIME?",
        desc: "Yes, you can have an unlimited number of deposits, and you can also invest in different tariff plans at the same time.",
      },
    ],
  },
  {
    id: "KLP59K",
    head: "Withdrawal of funds",
    icon: "GiTakeMyMoney",
    state: false,
    subheads: [
      {
        id: "KLP59K",
        state: false,
        head: "HOW OFTEN WILL I RECEIVE ACCRUALS ON MY DEPOSITS?",
        desc: "Interest on deposits is accrued in accordance with the terms of the investment plan. The countdown starts from the moment you open a deposit in the system.",
      },
      {
        id: "KLL19K",
        state: false,
        head: "HOW LONG DOES IT TAKE TO PROCESS A WITHDRAWAL REQUEST?",
        desc: "Withdrawal requests will be processed instantly. For payment systems PerfectMoney, - funds reach the wallet instantly, after ordering the payment in your account. Waiting time for funds to a wallet for payment systems BitCoin, Ethereum, LiteCoin, DogeCoin, TRON, Tether TRC20, Tether ERC20 - At least 3 network confirmations are required and this can take from 20 minutes to several hours.",
      },
      {
        id: "KLP19J",
        state: false,
        head: "WHAT IS THE WITHDRAWAL OF FUNDS FROM A PERSONAL WALLET?",
        desc: `Before withdrawing funds, be sure to check if you have indicated the correct address of your payment wallet to which you will be withdrawing. If you have not registered a wallet, do it by going to the "Wallets" section of your account. In the same section you can always edit your payment details.
				After you have made sure that the entered data is correct, you need to go to the 'Withdrawal' section located in your investor's personal account, select the payment system to which you want to withdraw, enter the withdrawal amount and click the withdrawal button funds.`,
      },
      {
        id: "KL929J",
        state: false,
        head: "ARE THERE ANY RESTRICTIONS ON THE AMOUNT OF INVESTMENT?",
        desc: `The tariff plans set the following restrictions on the minimum and maximum amount of the deposit.
				Minimum Amount: 10 usd, 0.005 btc, 0.02 eth, 0.3 ltc, 50 doge, 100 trx, 10 usdt,
				Maximum Amount: 75000 usd, 1.5 btc, 20 eth, 300 ltc, 350000 doge, 750000 trx, 75000 usdt`,
      },
      {
        id: "KQR71K",
        state: false,
        head: "WHAT IS THE MINIMUM WITHDRAWAL AMOUNT? AND IS THERE A LIMITATION ON THE NUMBER OF WITHDRAWALS OR AMOUNTS PER DAY?",
        desc: "The minimum withdrawal amount is: 0.1 usd, 0.002 btc, 0.03 eth, 0.1 ltc, 60 doge, 60 trx, 10 usdt (trc20), 150 usdt (erc20). There are no restrictions on the maximum withdrawal amount, as well as the number of withdrawal operations per day.",
      },
      {
        id: "KLP59Z",
        state: false,
        head: "HOW DO I FIND MY ACCOUNT TRANSACTION HISTORY?",
        desc: "Go to the investor's panel, select 'Transactions' from the menu and there you will see the history of account deposits, incomes and withdrawals.",
      },
      {
        id: "KLU19K",
        state: false,
        head: "WHAT TO DO IF I CANNOT WITHDRAW THE FUNDS? THE SYSTEM CONSTANTLY PRODUCES AN ERROR.",
        desc: `If the wallet is registered correctly, the amount is entered correctly and corresponds to the one that is available for withdrawal, but the payment is still rejected by the system, check the correspondence between the currency requested for withdrawal and the electronic payment system selected for payment. If you have a withdrawable dollar amount in the TETHER USDT electronic payment system, you will not be able to withdraw Bitcoin to this wallet.`,
      },
    ],
  },
  {
    id: "KLL19K",
    head: "Additional Questions",
    icon: "BsQuestionSquare",
    state: false,
    subheads: [
      {
        id: "LMK26P",
        state: false,
        head: "WHERE CAN I EXCHANGE ONE CURRENCY FOR ANOTHER?",
        desc: "You can use monitoring with trusted exchange offices - bestchange. Choose the exchanger with the best rate and follow the instructions.",
      },
      {
        id: "QWE72M",
        state: false,
        head: "HOW TO BE IF I DIDN'T FIND ANSWER TO MY QUESTION?",
        desc: "Please contact us through any communication channel. Do not duplicate your message across multiple communication channels. This will not speed up the response, but rather the opposite.",
      },

      {
        id: "KLP59J",
        state: false,
        head: "WHAT TO DO IF I FORGOT MY PASSWORD?",
        desc: "Click on the reset password link on the main page of the site in the login section. Enter your email address and follow the instructions. You will receive information on how to reset your GLOBAL TYCOON FX account password.",
      },
    ],
  },
];
export const pmfstats_one = [
  {
    id: "LMK26P",
    head: "412",
    desc: "Days in Work",
    icon: "FaChartPie",
    state: false,
  },
  {
    id: "QWE72M",
    head: "8 965",
    icon: "HiUserGroup",
    desc: "Total Members",
    state: false,
  },

  {
    id: "KLP59J",
    head: "3 384 989 USD",
    icon: "RiExchangeDollarFill",
    desc: "Total Invested",
    state: false,
  },
  {
    id: "KLP23J",
    head: "1 168 885 USD",
    icon: "IoCashSharp",
    desc: "Total Paid",
    state: false,
  },
];
export const pmfstats_two = [
  {
    id: "LMK26P",
    desc: "ROBOT TRADING WITHOUT WEEKENDS AND HOLIDAYS",
    icon: "GiTrade2",
    state: false,
  },
  {
    id: "QWE72M",
    icon: "BiTransferAlt",
    desc: "WITHDRAWAL 24/7",
    state: false,
  },

  {
    id: "KLP59J",
    icon: "GiWallet",
    desc: "BIG NUMBER OF PAYMENT SYSTEMS",
    state: false,
  },
  {
    id: "KLP69J",
    icon: "BsRobot",
    desc: "100% ANONYMOUS AND TRANSPARENCY OF THE WORK OF THE ROBOT",
    state: false,
  },
];
export const depositstats = [
  {
    id: "LMK26P",
    name: "Vagner",
    img: "/statistic/tron.svg",
    price: "860000 trx",
  },
  {
    id: "QWE72M",
    name: "Austin132002",
    img: "/statistic/dogecoin.svg",
    price: "500000 doge",
  },

  {
    id: "KLP59J",
    name: "Qinny",
    img: "/statistic/trc20.svg",
    price: "1800 usdt",
  },
  {
    id: "KLP21J",
    name: "rannovan",
    img: "/statistic/litecoin.svg",
    price: "520 ltc",
  },
  {
    id: "KLP59K",
    name: "Parimpe",
    img: "/statistic/trc20.svg",
    price: "570 usd",
  },
  {
    id: "KLL19K",
    name: "ahmadm1990",
    img: "/statistic/tron.svg",
    price: "103000.68 trx",
  },
  {
    id: "KLP23J",
    name: "Drann",
    img: "/statistic/trc20.svg",
    price: "2700 usd",
  },
];
export const paymentstats = [
  {
    id: "LMK26P",
    name: "Serg337",
    img: "/statistic/trc20.svg",
    price: "3.6 usd",
  },
  {
    id: "QWE72M",
    name: "016timur",
    img: "/statistic/trc20.svg",
    price: "450.36 usd",
  },

  {
    id: "KLP59J",
    name: "Temirkhan",
    img: "/statistic/trc20.svg",
    price: "1349.45 usdt",
  },
  {
    id: "KLP29J",
    name: "Aom2525",
    img: "/statistic/trc20.svg",
    price: "230.26 usdt",
  },
  {
    id: "KLP59K",
    name: "Tik188",
    img: "/statistic/trc20.svg",
    price: "1890.17 usdt",
  },
  {
    id: "KLL19K",
    name: "Qinny",
    img: "/statistic/trc20.svg",
    price: "650 usdt",
  },
  {
    id: "KLP39J",
    name: "subhan911",
    img: "/statistic/trc20.svg",
    price: "1890.26 usdt",
  },
];
export const homeBoxes = [
  {
    id: "LMK26P",
    icon: "FaConnectdevelop",
    desc: "Professional Crypto Industry Development Team",
  },
  {
    id: "QWE72M",
    icon: "GiCubeforce",
    desc: "Unique robot for trading",
  },

  {
    id: "KLP59J",
    icon: "MdOutlineManageAccounts",
    desc: "Manage operations without user intervention",
  },
];
export const stepBoxes = [
  {
    id: "LMK26P",
    step: "#1",
    head: "REGISTRATION",
    desc: "Click the Register button. Fill in your details to create a FREE GLOBAL TYCOON FX account in second",
  },
  {
    id: "QWE72M",
    step: "#2",
    head: "CHOOSE INVESTMENT PLAN",
    desc: "We offer a variety of investment plans to suit your financial goals. After reading, make a deposit",
  },

  {
    id: "KLP59J",
    step: "#3",
    head: "START EARNING",
    desc: "After making a deposit, watch your capital grow by accumulating daily profit in real time",
  },
];
export const pifTraders = [
  {
    id: "LMK26P",
    img: "/investments/1.png",
    head: "UNIQUE TRADING BOT",
    desc: "GLOBAL TYCOON FX team of professionals has created a unique trading robot that makes profit at any stage of the market: rise or fall",
  },
  {
    id: "QWE72M",
    img: "/investments/2.png",
    head: "STABLE AND AUTOMATED INVESTMENT",
    desc: "The robot is not human-related. And that is why all investments are reliable and completely safe",
  },

  {
    id: "KLP59J",
    img: "/investments/3.png",
    head: "THE EXPERTS WILL DO EVERYTHING FOR YOU",
    desc: "The highly professional GLOBAL TYCOON FX team controls all the processes of the trading robot around the clock. After investing, you will observe the growth of your capital in real time",
  },
];
export const investmentProposals = [
  {
    id: "LMK26P",
    head: "COMPANY COMMISSION",
    percentage: "0.5%",
    desc: "from the received profit by the robot. This commission shows the earnings of the entire GLOBAL TYCOON FX structure, namely, each employee.",
  },
  {
    id: "QWE72M",
    head: "ADMINISTRATIVE COMMISSION",
    percentage: "0.5%",
    desc: "for technical support of the robot and the company as a whole. This commission includes the development and marketing costs of the company.",
  },
];
export const investmentPlans = [
  {
    id: "LMK26P",
    plan: "BASIC PLAN",
    percentage: "450%",
    timeFrame: "Weekly",
    timeLine: "7 DAYS",
    prop1: "$500 - $2,250",
    prop2: "$1,000 - $4,500",
    prop3: "$2,500 - $11,250",
    prop4: "$4,500 - $20,250",
    min: "$500",
  },
  {
    id: "QWE72M",
    plan: "STANDARD PLAN",
    percentage: "450%",
    timeFrame: "Weekly",
    timeLine: "7 DAYS",
    prop1: "$5,000 - $22,500",
    prop2: "$10,000 - $45,000",
    prop3: "$14,000 - $63,000",
    min: "$5,000",
  },

  {
    id: "KLP59J",
    plan: "LUXURY PLAN",
    percentage: "450%",
    timeFrame: "Weekly",
    timeLine: "7 DAYS",
    prop1: "$15,000 - $65,000",
    prop2: "$20,000 - $90,000",
    prop3: "$50,000 - $225,000",
    min: "$15,000",
  },
];

export const testimonies = [
  {
    id: "LMK26P",
    img: "/testimony4.jpg",
    testimony: `I have been seeing this post everywhere and lot of people keep saying Riana is the best and trustworthy I try her out as my account manager using this platform and it turn out to be legit I invested $10,000 and I receive over $173,000 in 2 months.  I don’t need a lot of words to prove that you’re a real dealer and may God continue to bless you  because I’ve seen it all Thanks.`,
    name: "MARCUS HANCOCK. ",
    igname: "@marcus_hancock1_",
    tradeername: "RIANA ALBERTO K.",
    traderigname: "@cryptowithriana_",
    traderimg: "/testimony2.jpg",
    traderinstagram: "https://instagram.com/cryptowithriana_",
    instagram: "https://instagram.com/marcus_hancock1_",
  },
  {
    id: "PAK26P",
    img: "/testimony5.jpg",
    testimony: `Life is an opportunity but it comes for those who extremely have the zeal to achieve it don’t sit back and watch others earning greatly just give it try now. I’ve traded under this broker with the help of Clifford since December 2017 and It have been success all the way.`,
    igname: "@_hannahowens57",
    name: "HANNAH OWENS.",
    instagram: "https://www.instagram.com/_hannahowens57",
    tradeername: "CLIFFORD RILEY",
    traderigname: "@trader__clifford",
    traderimg: "/testimony1.jpg",
    traderinstagram: "https://instagram.com/trader__clifford",
  },
  {
    id: "QRK26P",
    img: "/testimony6.jpg",
    testimony: `Tears of joy grips my heart knowing how hard I’ve struggled to become debt free. Waking up everyday to see my withdrawals successfully notifications on my mail is the best thing I have ever wished for myself. I advice y’all to stop making predictions and start making good profit with Martha. A manager with so much ambition goals towards is clients,  A woman with love and care for others welfare. You’re magnificent when it comes to investment. 
    Thank you for making it painless, pleasant and most of all hassle free!  You' saved our business!`,
    name: "JACQULINE W SPENCE.",
    instagram: "https://instagram.com/jacquline_w._Spence",
    igname: "@jacquline_w._Spence",
    tradeername: "DANIELLA MARTHA",
    traderigname: "@cryptowithmartha",
    traderimg: "/testimony3.jpg",
    traderinstagram: "https://instagram.com/cryptowithmartha",
  },
];
export const plaques = [
  {
    id: "AMK26P",
    img: "/awards/PLAQUE1.png",
    alt: "plaque",
  },
  {
    id: "KAK26P",
    img: "/awards/PLAQUE2.png",
    alt: "plaque",
  },
  {
    id: "JRK26P",
    img: "/awards/PLAQUE3.png",
    alt: "plaque",
  },
];
export const awards = [
  {
    id: "LMK26Q",
    img: "/awards/SEAL1.png",
    alt: "plaque",
  },
  {
    id: "PAK26Z",
    img: "/awards/SEAL2.png",
    alt: "plaque",
  },
];
