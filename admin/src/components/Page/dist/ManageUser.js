"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var User_module_scss_1 = require("@/styles/pages/User.module.scss");
var hi2_1 = require("react-icons/hi2");
var md_1 = require("react-icons/md");
var ri_1 = require("react-icons/ri");
var io5_1 = require("react-icons/io5");
var react_2 = require("@chakra-ui/react");
var react_redux_1 = require("react-redux");
var AppSlice_1 = require("@/redux-actions/AppSlice");
var Spinner_1 = require("./Spinner");
var Pagination_1 = require("../Pagination");
var ManageUser = function (props) {
    var _a = react_redux_1.useSelector(function (state) { return state.AppSlice; }), userManageData = _a.userManageData, manageUserDeposits = _a.manageUserDeposits, sendState = _a.sendState, usersState = _a.usersState, errorMessage = _a.errorMessage, updateState = _a.updateState;
    var stateBoxRef = react_1.useRef();
    var _b = react_1.useState(false), accountBox = _b[0], setAccountBox = _b[1];
    var _c = react_1.useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        phone: "",
        password: ""
    }), formData = _c[0], setFormData = _c[1];
    var _d = react_1.useState(false), isLoading = _d[0], setisLoading = _d[1];
    var _e = react_1.useState(false), isLoading2 = _e[0], setisLoading2 = _e[1];
    var _f = react_1.useState({
        totalBalance: 0,
        totalProfit: 0
    }), balanceFormData = _f[0], setBalanceFormData = _f[1];
    var _g = react_1.useState({
        amount: 0
    }), depositFormData = _g[0], setDepositFormData = _g[1];
    var _h = react_1.useState(4), postsPerPage = _h[0], sePostsPerPage = _h[1];
    var _j = react_1.useState("PENDING"), transactionState = _j[0], setTransactionState = _j[1];
    var _k = react_1.useState({
        message: ""
    }), notifFormData = _k[0], setNotifFormData = _k[1];
    var toast = react_2.createStandaloneToast().toast;
    var dispatch = react_redux_1.useDispatch();
    var date = new Date("" + userManageData.createdAt);
    var date2 = new Date("" + userManageData.lastLogin);
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
    };
    var formattedDate = "" + date.toLocaleDateString("en-US", options);
    var formattedDate2 = "" + date2.toLocaleDateString("en-US", options);
    var handleChangeAccountState = function () {
        setAccountBox(function (prev) { return !prev; });
    };
    var handleInputChange = function (e) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        });
        setNotifFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        });
        setBalanceFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        });
        setDepositFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        });
    };
    var handleTransactionStateChange = function (e) {
        if (e.target.value === "")
            return;
        setTransactionState(e.target.value);
    };
    var handleSendNotifications = function (e) {
        e.preventDefault();
        dispatch(AppSlice_1.sendNotification({
            message: notifFormData.message,
            userId: userManageData.id
        }));
    };
    var handleClickOutside = function (event) {
        if (stateBoxRef.current && !stateBoxRef.current.contains(event.target)) {
            setAccountBox(false);
        }
    };
    var _l = react_1.useState(1), currentPage = _l[0], setCurrentPage = _l[1];
    var indexOfLastPost = currentPage * postsPerPage;
    var indexofFirstPost = indexOfLastPost - postsPerPage;
    var currentDeposits = manageUserDeposits.slice(indexofFirstPost, indexOfLastPost);
    var makeTransactionStateChange = function (id, transactionstatedata) {
        dispatch(AppSlice_1.sendTransactionState([id, transactionstatedata]));
    };
    react_1.useEffect(function () {
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    react_1.useEffect(function () {
        if (usersState.isSuccess) {
            toast({
                title: "Success",
                description: "account state changed successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            setisLoading2(false);
            dispatch(AppSlice_1.getUser());
        }
        if (usersState.isError) {
            toast({
                title: errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.statusCode,
                description: errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            setisLoading2(false);
        }
        if (usersState.isLoading) {
            setisLoading2(true);
        }
        dispatch(AppSlice_1.resetUsersState());
    }, [
        usersState.isSuccess,
        usersState.isError,
        usersState.isLoading,
        dispatch,
    ]);
    var _m = react_1.useState(0), btcEq = _m[0], setBtcEq = _m[1];
    react_1.useEffect(function () {
        convertDollarToBTC(Number(userManageData === null || userManageData === void 0 ? void 0 : userManageData.totalBalance));
        dispatch(AppSlice_1.getMyUserDeposits(userManageData === null || userManageData === void 0 ? void 0 : userManageData.id));
    }, []);
    react_1.useEffect(function () {
        if (updateState.isSuccess) {
            toast({
                title: "Success",
                description: "Updated Successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            var x = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dispatch(AppSlice_1.setUserBalanceData(balanceFormData.totalBalance));
                            return [4 /*yield*/, dispatch(AppSlice_1.getUser())];
                        case 1:
                            _a.sent();
                            dispatch(AppSlice_1.getAllDeposits());
                            setisLoading(false);
                            setNotifFormData({ message: "" });
                            return [2 /*return*/];
                    }
                });
            }); };
            x();
        }
        if (updateState.isError) {
            toast({
                title: errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.statusCode,
                description: errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            setisLoading(false);
        }
        if (updateState.isLoading) {
            setisLoading(true);
        }
        dispatch(AppSlice_1.resetUpdateState());
    }, [updateState.isSuccess, updateState.isError, updateState.isLoading]);
    react_1.useEffect(function () {
        if (sendState.isSuccess) {
            toast({
                title: "Success",
                description: "Sent Successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            dispatch(AppSlice_1.getAllDeposits());
            setisLoading(false);
            setNotifFormData({ message: "" });
        }
        if (sendState.isError) {
            toast({
                title: errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.statusCode,
                description: errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            setisLoading(false);
        }
        if (sendState.isLoading) {
            setisLoading(true);
        }
        dispatch(AppSlice_1.resetSendState());
    }, [sendState.isSuccess, sendState.isError, sendState.isLoading, dispatch]);
    function convertDollarToBTC(amountInUSD) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, exchangeRate, btcValue, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        exchangeRate = data.bpi.USD.rate_float;
                        btcValue = amountInUSD / exchangeRate;
                        setBtcEq(btcValue);
                        return [2 /*return*/, btcValue];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching exchange rate:", error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var handleUpdateBalance = function (e) {
        e.preventDefault();
        dispatch(AppSlice_1.updateUser([userManageData.id, balanceFormData]));
    };
    var handleDeposit = function (e) {
        e.preventDefault();
        dispatch(AppSlice_1.userDeposit(__assign({ userId: userManageData.id }, depositFormData)));
    };
    var handleDepositChange = function (e) {
        e.preventDefault();
    };
    return (react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].manage_user_block },
        isLoading && react_1["default"].createElement(Spinner_1["default"], null),
        isLoading2 && react_1["default"].createElement(Spinner_1["default"], null),
        react_1["default"].createElement("section", { className: "" + User_module_scss_1["default"].manage_user_head },
            react_1["default"].createElement("h1", null, "Manage User"),
            react_1["default"].createElement("small", null, "Dashboard")),
        react_1["default"].createElement("section", { className: "" + User_module_scss_1["default"].user_block },
            react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_block },
                react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_head },
                    react_1["default"].createElement(hi2_1.HiUser, null),
                    react_1["default"].createElement("p", null, userManageData.firstname + " " + userManageData.lastname,
                        "'s Information")),
                react_1["default"].createElement(react_2.Flex, { p: 4, gap: 8, justify: "between", align: "center" },
                    react_1["default"].createElement(react_2.WrapItem, null,
                        react_1["default"].createElement(react_2.Avatar
                        // onClick={() => {
                        //   setOverlay(<OverlayOne />);
                        //   modal1.onOpen();
                        // }}
                        , { 
                            // onClick={() => {
                            //   setOverlay(<OverlayOne />);
                            //   modal1.onOpen();
                            // }}
                            cursor: "pointer", size: "2xl", name: "Kola Tioluwani", src: (userManageData === null || userManageData === void 0 ? void 0 : userManageData.picture) ? "" + userManageData.picture
                                : "/images.png" })),
                    react_1["default"].createElement(react_2.Stack, { spacing: 3, w: "100%" },
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" },
                            "Available Balance: $",
                            userManageData.totalBalance),
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" },
                            "Total Deposit: $",
                            userManageData.totalDeposit,
                            " "),
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" },
                            "Total Profit: $",
                            userManageData.totalProfit,
                            " "),
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" },
                            "Total Withdrawal: $",
                            userManageData.totalWithdrawal),
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" },
                            "Total Investment: ",
                            btcEq,
                            " BTC"))))),
        react_1["default"].createElement("section", { className: "" + User_module_scss_1["default"].user_block },
            react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_block },
                react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_head },
                    react_1["default"].createElement(md_1.MdAccountBalance, null),
                    react_1["default"].createElement("p", null,
                        "Update ", userManageData.firstname + " " + userManageData.lastname,
                        "'s Balance")),
                react_1["default"].createElement(react_2.Box, { p: 2 },
                    react_1["default"].createElement("form", { action: "", onSubmit: handleUpdateBalance },
                        react_1["default"].createElement(react_2.FormControl, { p: 2 },
                            react_1["default"].createElement(react_2.FormLabel, { fontSize: 11 }, "Total Balance"),
                            react_1["default"].createElement(react_2.Input, { type: "text", fontSize: 12, required: true, name: "totalBalance", value: balanceFormData.totalBalance, onChange: handleInputChange })),
                        react_1["default"].createElement(react_2.FormControl, { p: 2 },
                            react_1["default"].createElement(react_2.FormLabel, { fontSize: 11 }, "Total Profit"),
                            react_1["default"].createElement(react_2.Input, { type: "text", fontSize: 12, required: true, name: "totalProfit", value: balanceFormData.totalProfit, onChange: handleInputChange })),
                        react_1["default"].createElement(react_2.FormControl, { p: 2 },
                            react_1["default"].createElement(react_2.Button, { fontSize: 14, type: "submit", w: "100%", colorScheme: "messenger" }, "Update")))))),
        react_1["default"].createElement("section", { className: "" + User_module_scss_1["default"].user_block },
            react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_block },
                react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_head },
                    react_1["default"].createElement(md_1.MdAccountBalance, null),
                    react_1["default"].createElement("p", null,
                        "Create Deposit for",
                        " ", userManageData.firstname + " " + userManageData.lastname)),
                react_1["default"].createElement(react_2.Box, { p: 2 },
                    react_1["default"].createElement("form", { action: "", onSubmit: handleDeposit },
                        react_1["default"].createElement(react_2.FormControl, { p: 2 },
                            react_1["default"].createElement(react_2.FormLabel, { fontSize: 11 }, "Amount"),
                            react_1["default"].createElement(react_2.Input, { type: "number", fontSize: 12, required: true, name: "amount", value: depositFormData.amount, onChange: handleInputChange })),
                        react_1["default"].createElement(react_2.FormControl, { p: 2 },
                            react_1["default"].createElement(react_2.Button, { fontSize: 14, type: "submit", w: "100%", colorScheme: "messenger" }, "Create")))))),
        react_1["default"].createElement("section", { className: "" + User_module_scss_1["default"].user_block },
            react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_block },
                react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_head },
                    react_1["default"].createElement(ri_1.RiProfileLine, null),
                    react_1["default"].createElement("p", null,
                        " ", userManageData.firstname + " " + userManageData.lastname,
                        "'s Profile")),
                react_1["default"].createElement(react_2.Flex, { p: 4, gap: 1, direction: "column" },
                    react_1["default"].createElement(react_2.Box, null,
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" }, "Name:"),
                        react_1["default"].createElement(react_2.Text, { fontSize: 12 },
                            " ", userManageData.firstname + " " + userManageData.lastname)),
                    react_1["default"].createElement(react_2.Divider, null),
                    react_1["default"].createElement(react_2.Box, null,
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" }, "Email:"),
                        react_1["default"].createElement(react_2.Text, { fontSize: 12 }, userManageData.email)),
                    react_1["default"].createElement(react_2.Divider, { colorScheme: "red", variant: "solid" }),
                    react_1["default"].createElement(react_2.Box, null,
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" }, "Registered on:"),
                        react_1["default"].createElement(react_2.Text, { fontSize: 12 }, formattedDate)),
                    react_1["default"].createElement(react_2.Divider, null),
                    react_1["default"].createElement(react_2.Box, null,
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" }, "Referral link:"),
                        react_1["default"].createElement(react_2.Button, { size: "sm", fontSize: 11, colorScheme: "messenger" }, "VIEW REFERRALS")),
                    react_1["default"].createElement(react_2.Divider, { colorScheme: "red", variant: "solid" }),
                    react_1["default"].createElement(react_2.Box, { ref: stateBoxRef },
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" }, "Account State:"),
                        userManageData.accountState === "PENDING" ? (react_1["default"].createElement(react_2.Card, null,
                            react_1["default"].createElement(react_2.CardBody, null,
                                react_1["default"].createElement(react_2.Button, { fontSize: 12, colorScheme: "red", onClick: handleChangeAccountState }, "NOT VERIFIED"),
                                accountBox && (react_1["default"].createElement(react_2.Card, { position: "absolute", top: 0, left: "10rem", zIndex: 4, border: "1px solid #eaeaea", marginTop: 2 },
                                    react_1["default"].createElement(react_2.CardBody, null,
                                        react_1["default"].createElement(react_2.Text, { fontSize: 12, marginBottom: 1 }, "Set State To:"),
                                        react_1["default"].createElement(react_2.Button, { fontSize: 12, colorScheme: "whatsapp", onClick: function () {
                                                return dispatch(AppSlice_1.changeState([
                                                    userManageData.id,
                                                    { accountState: "VERIFIED" },
                                                ]));
                                            } }, "VERIFIED"))))))) : userManageData.accountState === "BLOCKED" ? (react_1["default"].createElement(react_2.Card, null,
                            react_1["default"].createElement(react_2.CardBody, null,
                                react_1["default"].createElement(react_2.Button, { fontSize: 12, colorScheme: "red", onClick: handleChangeAccountState }, "BLOCKED"),
                                accountBox && (react_1["default"].createElement(react_2.Card, { position: "absolute", top: 0, left: "10rem", border: "1px solid #eaeaea", zIndex: 4, marginTop: 2 },
                                    react_1["default"].createElement(react_2.CardBody, null,
                                        react_1["default"].createElement(react_2.Text, { fontSize: 12, marginBottom: 1 }, "Set State To:"),
                                        react_1["default"].createElement(react_2.Button, { fontSize: 12, colorScheme: "whatsapp", onClick: function () {
                                                return dispatch(AppSlice_1.changeState([
                                                    userManageData.id,
                                                    { accountState: "VERIFIED" },
                                                ]));
                                            } }, "VERIFIED"))))))) : (react_1["default"].createElement(react_2.Card, null,
                            react_1["default"].createElement(react_2.CardBody, null,
                                react_1["default"].createElement(react_2.Button, { fontSize: 12, colorScheme: "whatsapp", onClick: handleChangeAccountState }, "VERIFIED"),
                                accountBox && (react_1["default"].createElement(react_2.Card, { position: "absolute", top: 0, left: "10rem", border: "1px solid #eaeaea", zIndex: 4, marginTop: 2 },
                                    react_1["default"].createElement(react_2.CardBody, null,
                                        react_1["default"].createElement(react_2.Text, { fontSize: 12, marginBottom: 1 }, "Set State To:"),
                                        react_1["default"].createElement(react_2.Button, { fontSize: 12, colorScheme: "red", onClick: function () {
                                                return dispatch(AppSlice_1.changeState([
                                                    userManageData.id,
                                                    { accountState: "BLOCKED" },
                                                ]));
                                            } }, "BLOCKED")))))))),
                    react_1["default"].createElement(react_2.Divider, { colorScheme: "red", variant: "solid" }),
                    react_1["default"].createElement(react_2.Box, null,
                        react_1["default"].createElement(react_2.Text, { fontSize: "sm" }, "Last Login Information:"),
                        react_1["default"].createElement(react_2.Text, { fontSize: 12 }, formattedDate2)),
                    react_1["default"].createElement(react_2.Divider, { colorScheme: "red", variant: "solid" })))),
        react_1["default"].createElement("section", { id: "notifications", className: "" + User_module_scss_1["default"].user_block },
            react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_block },
                react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_head },
                    react_1["default"].createElement(io5_1.IoNotifications, null),
                    react_1["default"].createElement("p", null, "Notifications")),
                react_1["default"].createElement(react_2.Box, { p: 2 },
                    react_1["default"].createElement("form", { action: "", onClick: handleSendNotifications },
                        react_1["default"].createElement(react_2.FormControl, { p: 2 },
                            react_1["default"].createElement(react_2.Text, { mb: "8px", fontSize: 11 },
                                "Message:",
                                " "),
                            react_1["default"].createElement(react_2.Textarea, { fontSize: 12, value: notifFormData.message, required: true, name: "message", placeholder: "What's the message", onChange: handleInputChange, size: "sm" })),
                        react_1["default"].createElement(react_2.FormControl, { p: 2 },
                            react_1["default"].createElement(react_2.Button, { fontSize: 14, type: "submit", w: "100%", colorScheme: "messenger" }, "Send")))))),
        react_1["default"].createElement("section", { className: "" + User_module_scss_1["default"].user_block },
            react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_block },
                react_1["default"].createElement("div", { className: "" + User_module_scss_1["default"].management_head },
                    react_1["default"].createElement(ri_1.RiLuggageDepositFill, null),
                    react_1["default"].createElement("p", null, "Deposits")),
                react_1["default"].createElement(react_2.TableContainer, { gap: 1 },
                    react_1["default"].createElement(react_2.Table, { variant: "simple" },
                        react_1["default"].createElement(react_2.Thead, null,
                            react_1["default"].createElement(react_2.Tr, null,
                                react_1["default"].createElement(react_2.Th, { fontSize: 12 }, "Amount"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 12 }, "Amt change"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Method"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Wallet"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Status"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Time"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11, isNumeric: true }, "Action"))),
                        react_1["default"].createElement(react_2.Tbody, null, __spreadArrays(currentDeposits).map(function (manageUserDeposit, index) {
                            var date = new Date("" + manageUserDeposit.createdAt);
                            var options = {
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric"
                            };
                            var formattedDate = "" + date.toLocaleDateString("en-US", options);
                            return (react_1["default"].createElement(react_2.Tr, { key: manageUserDeposit.id },
                                react_1["default"].createElement(react_2.Td, { fontSize: 11 },
                                    "$",
                                    manageUserDeposit.amount),
                                react_1["default"].createElement(react_2.Td, { fontSize: 11 },
                                    react_1["default"].createElement("form", { onSubmit: handleDepositChange },
                                        react_1["default"].createElement(react_2.Flex, { direction: "column", gap: 1, justify: "center", align: "center", maxW: 20, minW: "6rem" },
                                            react_1["default"].createElement(react_2.Input, { type: "number", fontSize: 12, maxW: 16, required: true, size: "sm", name: "amount", value: depositFormData.amount, onChange: handleInputChange }),
                                            react_1["default"].createElement(react_2.Button, { fontSize: 11, w: "100%", size: "sm", maxW: 16, 
                                                // onClick={() =>
                                                //   makeTransactionStateChange(manageUserDeposit.id, {
                                                //     transactionState,
                                                //   })
                                                // }
                                                colorScheme: "whatsapp" }, "Update")))),
                                react_1["default"].createElement(react_2.Td, { fontSize: 11 }, manageUserDeposit.asset),
                                react_1["default"].createElement(react_2.Td, { fontSize: 11 }, manageUserDeposit.to),
                                react_1["default"].createElement(react_2.Td, { fontSize: 11 }, manageUserDeposit.transactionState === "PENDING" ? (react_1["default"].createElement(react_2.Text, { fontSize: 14, fontWeight: "bold", color: "#3a7ae0" }, "PENDING")) : manageUserDeposit.transactionState ===
                                    "NOT_VERIFIED" ? (react_1["default"].createElement(react_2.Text, { size: "sm", fontSize: 14, fontWeight: "bold", color: "red" }, "REJECTED")) : (react_1["default"].createElement(react_2.Text, { size: "sm", fontSize: 14, fontWeight: "bold", color: "#248724" }, "VERIFIED"))),
                                react_1["default"].createElement(react_2.Td, { fontSize: 11 }, formattedDate),
                                react_1["default"].createElement(react_2.Td, { fontSize: 11 },
                                    " ",
                                    react_1["default"].createElement(react_2.Flex, { direction: "column", gap: 1, align: "center", minW: "6rem" },
                                        react_1["default"].createElement(react_2.Select, { cursor: "pointer", fontSize: 11, onClick: handleTransactionStateChange, px: 0, placeholder: manageUserDeposit.transactionState ===
                                                "NOT_VERIFIED"
                                                ? "REJECTED"
                                                : manageUserDeposit.transactionState, size: "sm" },
                                            manageUserDeposit.transactionState !==
                                                "PENDING" && react_1["default"].createElement("option", null, "PENDING"),
                                            manageUserDeposit.transactionState !==
                                                "VERIFIED" && react_1["default"].createElement("option", null, "VERIFIED"),
                                            manageUserDeposit.transactionState !==
                                                "NOT_VERIFIED" && (react_1["default"].createElement("option", { value: "NOT_VERIFIED" }, "REJECTED"))),
                                        react_1["default"].createElement(react_2.Button, { fontSize: 11, maxW: 24, size: "sm", w: "100%", onClick: function () {
                                                return makeTransactionStateChange(manageUserDeposit.id, {
                                                    transactionState: transactionState
                                                });
                                            }, colorScheme: "whatsapp" }, "Update")))));
                        })),
                        react_1["default"].createElement(react_2.Tfoot, null,
                            react_1["default"].createElement(react_2.Tr, null,
                                react_1["default"].createElement(react_2.Th, { fontSize: 12, isNumeric: true }, "Amount"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 12 }, "Amt change"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Method"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Wallet"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Status"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Created"),
                                react_1["default"].createElement(react_2.Th, { fontSize: 11 }, "Action"))))),
                react_1["default"].createElement(react_2.Table, null,
                    react_1["default"].createElement(react_2.TableCaption, null,
                        " ",
                        "Showing ",
                        indexofFirstPost + 1,
                        " to",
                        " ",
                        indexofFirstPost + currentDeposits.length,
                        " of",
                        " ",
                        manageUserDeposits.length,
                        " entries",
                        " ")),
                react_1["default"].createElement(react_2.Flex, { p: 4 },
                    react_1["default"].createElement(Pagination_1["default"], { postsPerPage: postsPerPage, totalPosts: manageUserDeposits.length, currentPage: currentPage, setCurrentPage: setCurrentPage }))))));
};
exports["default"] = ManageUser;
