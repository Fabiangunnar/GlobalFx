import {
  DeleteUserApi,
  GetAdminApi,
  GetAllDepositsApi,
  GetAllInvestmentsApi,
  GetAllKYCDocumentsApi,
  GetAllSupportTickets,
  GetAllTrades,
  GetAllUsersApi,
  GetAllWithdrawalsApi,
  GetCodeApi,
  GetMyUserApi,
  GetUserApi,
  SendNotificationApi,
  SetTransactionStateApi,
  UpdateAdminInfoApi,
  UpdateDepositApi,
  UpdateUserApi,
  UserDepositApi,
  VerifyInvestmentApi,
  VerifyUserApi,
  loginAdminApi,
} from "@/services/AppServices";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface CodeType {
  id: string;
  withdrawalCode: string;
}
export interface AdminType {
  username: string;
  password: string;
  id: string;
  usdt: string;
  btc: string;
  email: string;
  phone: string;
  eth: string;
}
export interface TradeDto {
  id: string;
  username: string;
  pairs: string;
  amount: number;
  position: string;
}
export interface KYCDocuments {
  idDocuments: string;
  proofOfAddress: string;
  id: string;
  status: string;
  createdAt: Date;
  userId: string;
  firstname: string;
  lastname: string;
}
export interface SupportTicketType {
  subject: string;
  message: string;
  userId: string;
  id: string;
  createdAt: string;
}
export interface DepositsType {
  asset: string;
  to: string;
  amount: number;
  id: string;
  transactionState: string;
  userId: string;
  createdAt: string;
  firstname: string;
  lastname: string;
}
export interface WithdrawalType {
  firstname: string;
  lastname: string;
  asset: string;
  transactionState: string;
  walletCode: string;
  walletAddress: string;
  amount: number;
  id: string;
  userId: string;
  createdAt: string;
}
export interface InvestmentType {
  id?: string;
  plan: string;
  amount: number;
  userId: string;
  status: any;
  createdAt: Date;
  firstname: string;
  lastname: string;
}
export interface UserTypes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  activeDeposit?: number;
  earnings?: number;
  totalDeposit?: number;
  totalWithdrawal?: number;
  totalBalance?: number;
  totalProfit?: number;
  picture?: string;
  pictureInfo?: string;
  createdAt?: string;
  accountState?: string;
  lastLogin?: string;
}
export interface ManageUserDeposits {
  id: string;
  asset: string;
  to: string;
  amount: number;
  transactionState: string;
  userId: string;
  createdAt: Date;
}
let adminInfo: AdminType = {
  username: "",
  password: "",
  id: "",
  usdt: "",
  btc: "",
  phone: "",
  email: "",
  eth: "",
};
export interface NotificationType {
  message: string;
  userId: string;
}
let users: UserTypes[] = [];
let kycdocuments: KYCDocuments[] = [];
let deposits: DepositsType[] = [];
let withdrawals: WithdrawalType[] = [];
let trades: TradeDto[] = [];
let withdrawalCode: string = "";
let notification: NotificationType = {
  message: "",
  userId: "",
};
let investmentHistory: InvestmentType[] = [];

let supportTicketData: SupportTicketType[] = [];
const manageUserDeposits: ManageUserDeposits[] = [];

const userManageData: UserTypes = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  activeDeposit: 0,
  earnings: 0,
  totalDeposit: 0,
  totalProfit: 0,
  totalWithdrawal: 0,
  totalBalance: 0,
  accountState: "PENDING",
  picture: "",
  pictureInfo: "",
  createdAt: "",
};

interface initialTypes {
  adminInfo: AdminType | null;
  userState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  usersState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  getCodeState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  getState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  deleteState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  sendState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  updateState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  updateDepositState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  adminState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  adminState2: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  adminState3: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  errorMessage: {
    statusCode: number;
    message: string;
  };
  users: UserTypes[];
  deposits: DepositsType[];
  withdrawals: WithdrawalType[];
  supportTicketData: SupportTicketType[];
  notification: NotificationType;
  userManageData: UserTypes;
  kycdocuments: KYCDocuments[];
  manageUserDeposits: ManageUserDeposits[];
  investmentHistory: InvestmentType[];
  trades: TradeDto[];
  withdrawalCode: string;
}
const initialState: initialTypes = {
  adminInfo,
  deposits,
  withdrawals,
  users,
  userManageData,
  supportTicketData,
  kycdocuments,
  manageUserDeposits,
  notification,
  investmentHistory,
  withdrawalCode,
  trades,
  userState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  usersState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  getCodeState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  getState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  deleteState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  sendState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  updateState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  updateDepositState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  adminState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  adminState2: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  adminState3: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  errorMessage: {
    statusCode: 0,
    message: "",
  },
};

export const getAdmin: any = createAsyncThunk(
  "get/admin",
  async (id, thunkApi) => {
    try {
      return await GetAdminApi(id);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const login: any = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await loginAdminApi(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getUser: any = createAsyncThunk(
  "get/myuser",
  async (id, thunkApi) => {
    try {
      return await GetUserApi(id);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getCode: any = createAsyncThunk(
  "auth/code",
  async (_, thunkApi) => {
    try {
      return await GetCodeApi();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateAdminInfo: any = createAsyncThunk(
  "put/updateAminInfo",
  async ([id, adminInfo]: any, thunkApi) => {
    try {
      return await UpdateAdminInfoApi(id, adminInfo);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const logout: any = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      if (window !== undefined) {
        localStorage.removeItem("admin");
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers: any = createAsyncThunk(
  "get/allusers",
  async (_, thunkApi) => {
    try {
      return await GetAllUsersApi();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getMyUserDeposits: any = createAsyncThunk(
  "get/user",
  async (id: any, thunkApi) => {
    try {
      return await GetMyUserApi(id);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const updateDeposit: any = createAsyncThunk(
  "update/deposit",
  async ([id, depositInfo]: any, thunkApi) => {
    try {
      return await UpdateDepositApi(id, depositInfo);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllSupportTickets: any = createAsyncThunk(
  "get/allSupportTickets",
  async (_, thunkApi) => {
    try {
      return await GetAllSupportTickets();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllTrades: any = createAsyncThunk(
  "get/trades",
  async (_, thunkApi) => {
    try {
      return await GetAllTrades();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllDeposits: any = createAsyncThunk(
  "get/allDeposits",
  async (_, thunkApi) => {
    try {
      return await GetAllDepositsApi();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllInvestments: any = createAsyncThunk(
  "get/invstments",
  async (_, thunkApi) => {
    try {
      return await GetAllInvestmentsApi();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllWithdrawals: any = createAsyncThunk(
  "get/allWithdrawals",
  async (_, thunkApi) => {
    try {
      return await GetAllWithdrawalsApi();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllKYCDocuments: any = createAsyncThunk(
  "get/AllKYCDocuments",
  async (_, thunkApi) => {
    try {
      return await GetAllKYCDocumentsApi();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const sendNotification: any = createAsyncThunk(
  "post/notification",
  async (notificationdata, thunkApi) => {
    try {
      return await SendNotificationApi(notificationdata);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const sendTransactionState: any = createAsyncThunk(
  "set/transactionState",
  async ([id, transactionStateData]: any, thunkApi) => {
    try {
      return await SetTransactionStateApi(id, transactionStateData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser: any = createAsyncThunk(
  "delete/allusers",
  async (userId, thunkApi) => {
    try {
      return await DeleteUserApi(userId);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const changeState: any = createAsyncThunk(
  "put/verifyUser",
  async ([id, accountState]: any, thunkApi) => {
    try {
      return await VerifyUserApi(id, accountState);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const verifyInvestment: any = createAsyncThunk(
  "verify/investment",
  async ([id, investmentState]: any, thunkApi) => {
    try {
      return await VerifyInvestmentApi(id, investmentState);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser: any = createAsyncThunk(
  "update/user",
  async ([id, accountInfo]: any, thunkApi) => {
    try {
      return await UpdateUserApi(id, accountInfo);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const userDeposit: any = createAsyncThunk(
  "put/userDeposit",
  async (accountInfo: any, thunkApi) => {
    try {
      return await UserDepositApi(accountInfo);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const AppSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    reset: (state) => {
      state.userState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetDeleteState: (state) => {
      state.deleteState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetCodeState: (state) => {
      state.getCodeState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetUsersState: (state) => {
      state.usersState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetSendState: (state) => {
      state.sendState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetUpdateState: (state) => {
      state.updateState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetAdminState: (state) => {
      state.adminState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetUpdateDepositState: (state) => {
      state.updateDepositState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetAdmin3State: (state) => {
      state.adminState3 = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    setUserManageData: (state, {payload}) => {
      state.userManageData = payload;
    },
    removeUser: (state, {payload}) => {
      state.users = state.users.filter((user) => user.id !== payload);
    },
    setAdminInfo: (state, {payload}) => {
      state.adminInfo = payload;
    },
    setUserBalanceData: (state, {payload}) => {
      state.userManageData.totalBalance =
        Number(state.userManageData.totalBalance) + Number(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCode.fulfilled, (state, {payload}) => {
        state.getCodeState.isLoading = false;
        state.getCodeState.isSuccess = true;
        state.getCodeState.isError = false;
        state.withdrawalCode = payload.withdrawalCode;
      })
      .addCase(getCode.rejected, (state, {payload}) => {
        state.getCodeState.isLoading = false;
        state.getCodeState.isSuccess = false;
        state.getCodeState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getCode.pending, (state, {payload}) => {
        state.getCodeState.isLoading = true;
        state.getCodeState.isSuccess = false;
        state.getCodeState.isError = false;
      });
    builder
      .addCase(login.fulfilled, (state, {payload}) => {
        state.adminInfo = payload;
        state.adminState.isLoading = false;
        state.adminState.isSuccess = true;
        state.adminState.isError = false;
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.adminState.isLoading = false;
        state.adminState.isSuccess = false;
        state.adminState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(login.pending, (state, {payload}) => {
        state.adminState.isLoading = true;
        state.adminState.isSuccess = false;
        state.adminState.isError = false;
      });
    builder
      .addCase(updateAdminInfo.fulfilled, (state, {payload}) => {
        state.adminInfo = payload;
        state.adminState3.isLoading = false;
        state.adminState3.isSuccess = true;
        state.adminState3.isError = false;
      })
      .addCase(updateAdminInfo.rejected, (state, {payload}) => {
        state.adminState3.isLoading = false;
        state.adminState3.isSuccess = false;
        state.adminState3.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateAdminInfo.pending, (state, {payload}) => {
        state.adminState3.isLoading = true;
        state.adminState3.isSuccess = false;
        state.adminState3.isError = false;
      });
    builder
      .addCase(getAllUsers.fulfilled, (state, {payload}) => {
        state.users = payload;
        state.userState.isLoading = false;
        state.userState.isSuccess = true;
        state.userState.isError = false;
      })
      .addCase(getAllUsers.rejected, (state, {payload}) => {
        state.userState.isLoading = false;
        state.userState.isSuccess = false;
        state.userState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllUsers.pending, (state, {payload}) => {
        state.userState.isLoading = true;
        state.userState.isSuccess = false;
        state.userState.isError = false;
      });
    builder
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.userManageData = payload;
      })
      .addCase(getUser.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getUser.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getMyUserDeposits.fulfilled, (state, {payload}) => {
        state.userState.isLoading = false;
        state.userState.isSuccess = true;
        state.userState.isError = false;
        state.manageUserDeposits = payload;
      })
      .addCase(getMyUserDeposits.rejected, (state, {payload}) => {
        state.userState.isLoading = false;
        state.userState.isSuccess = false;
        state.userState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getMyUserDeposits.pending, (state, {payload}) => {
        state.userState.isLoading = true;
        state.userState.isSuccess = false;
        state.userState.isError = false;
      });
    builder
      .addCase(updateDeposit.fulfilled, (state, {payload}) => {
        state.updateDepositState.isLoading = false;
        state.updateDepositState.isSuccess = true;
        state.updateDepositState.isError = false;
      })
      .addCase(updateDeposit.rejected, (state, {payload}) => {
        state.updateDepositState.isLoading = false;
        state.updateDepositState.isSuccess = false;
        state.updateDepositState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateDeposit.pending, (state, {payload}) => {
        state.updateDepositState.isLoading = true;
        state.updateDepositState.isSuccess = false;
        state.updateDepositState.isError = false;
      });
    builder
      .addCase(getAdmin.fulfilled, (state, {payload}) => {
        state.adminInfo = payload;
        state.adminState2.isLoading = false;
        state.adminState2.isSuccess = true;
        state.adminState2.isError = false;
      })
      .addCase(getAdmin.rejected, (state, {payload}) => {
        state.adminState2.isLoading = false;
        state.adminState2.isSuccess = false;
        state.adminState2.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAdmin.pending, (state, {payload}) => {
        state.adminState2.isLoading = true;
        state.adminState2.isSuccess = false;
        state.adminState2.isError = false;
      });
    builder
      .addCase(deleteUser.fulfilled, (state, {payload}) => {
        state.deleteState.isLoading = false;
        state.deleteState.isSuccess = true;
        state.deleteState.isError = false;
        getAllUsers();
      })
      .addCase(deleteUser.rejected, (state, {payload}) => {
        state.deleteState.isLoading = false;
        state.deleteState.isSuccess = false;
        state.deleteState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(deleteUser.pending, (state, {payload}) => {
        state.deleteState.isLoading = true;
        state.deleteState.isSuccess = false;
        state.deleteState.isError = false;
      });
    builder
      .addCase(updateUser.fulfilled, (state, {payload}) => {
        state.updateState.isLoading = false;
        state.updateState.isSuccess = true;
        state.updateState.isError = false;
        getAllUsers();
      })
      .addCase(updateUser.rejected, (state, {payload}) => {
        state.updateState.isLoading = false;
        state.updateState.isSuccess = false;
        state.updateState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateUser.pending, (state, {payload}) => {
        state.updateState.isLoading = true;
        state.updateState.isSuccess = false;
        state.updateState.isError = false;
      });
    builder
      .addCase(userDeposit.fulfilled, (state, {payload}) => {
        state.updateState.isLoading = false;
        state.updateState.isSuccess = true;
        state.updateState.isError = false;
        getAllUsers();
      })
      .addCase(userDeposit.rejected, (state, {payload}) => {
        state.updateState.isLoading = false;
        state.updateState.isSuccess = false;
        state.updateState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(userDeposit.pending, (state, {payload}) => {
        state.updateState.isLoading = true;
        state.updateState.isSuccess = false;
        state.updateState.isError = false;
      });
    builder
      .addCase(changeState.fulfilled, (state, {payload}) => {
        state.usersState.isLoading = false;
        state.usersState.isSuccess = true;
        state.usersState.isError = false;
        getAllUsers();
        state.userManageData = {
          ...state.userManageData,
          accountState: payload.accountState,
        };
      })
      .addCase(changeState.rejected, (state, {payload}) => {
        state.usersState.isLoading = false;
        state.usersState.isSuccess = false;
        state.usersState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(changeState.pending, (state, {payload}) => {
        state.usersState.isLoading = true;
        state.usersState.isSuccess = false;
        state.usersState.isError = false;
      });
    builder
      .addCase(verifyInvestment.fulfilled, (state) => {
        state.usersState.isLoading = false;
        state.usersState.isSuccess = true;
        state.usersState.isError = false;
      })
      .addCase(verifyInvestment.rejected, (state, {payload}) => {
        state.usersState.isLoading = false;
        state.usersState.isSuccess = false;
        state.usersState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(verifyInvestment.pending, (state, {payload}) => {
        state.usersState.isLoading = true;
        state.usersState.isSuccess = false;
        state.usersState.isError = false;
      });
    builder
      .addCase(getAllSupportTickets.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.supportTicketData = payload;
      })
      .addCase(getAllSupportTickets.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllSupportTickets.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getAllDeposits.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.deposits = payload;
      })
      .addCase(getAllDeposits.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllDeposits.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getAllInvestments.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.investmentHistory = payload;
      })
      .addCase(getAllInvestments.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllInvestments.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getAllTrades.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.trades = payload;
      })
      .addCase(getAllTrades.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllTrades.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getAllWithdrawals.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.withdrawals = payload;
      })
      .addCase(getAllWithdrawals.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllWithdrawals.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getAllKYCDocuments.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.kycdocuments = payload;
      })
      .addCase(getAllKYCDocuments.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllKYCDocuments.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(sendNotification.fulfilled, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = true;
        state.sendState.isError = false;
        state.supportTicketData = payload;
      })
      .addCase(sendNotification.rejected, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = false;
        state.sendState.isError = true;
      })
      .addCase(sendNotification.pending, (state, {payload}) => {
        state.sendState.isLoading = true;
        state.sendState.isSuccess = false;
        state.sendState.isError = false;
      });
    builder
      .addCase(sendTransactionState.fulfilled, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = true;
        state.sendState.isError = false;
      })
      .addCase(sendTransactionState.rejected, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = false;
        state.sendState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(sendTransactionState.pending, (state, {payload}) => {
        state.sendState.isLoading = true;
        state.sendState.isSuccess = false;
        state.sendState.isError = false;
      });
  },
});
export const {
  resetAdminState,
  resetUsersState,
  resetAdmin3State,
  setAdminInfo,
  resetUpdateState,
  resetCodeState,
  resetUpdateDepositState,
  reset,
  setUserManageData,
  removeUser,
  resetSendState,
  resetDeleteState,
  setUserBalanceData,
} = AppSlice.actions;
export default AppSlice.reducer;
