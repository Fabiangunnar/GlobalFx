import {
  GetAdminAccountsApi,
  GetAllDeposits,
  GetAllNotifications,
  GetAllPendingDeposits,
  GetAllWithdrawals,
  GetMyInvestments,
  GetMyTrades,
  GetUserApi,
  KYCVerifyApi,
  MakeDepositApi,
  MakeInvestmentApi,
  MakeTrade,
  MakeWithdrawalApi,
  SendSupportTicket,
  UpdatePhoneInformationApi,
  UpdateProfilePictureApi,
  loginUserApi,
  registerUserApi,
} from "@/services/appServices";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface UserTypes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  pendingDeposit?: number;
  totalProfit?: number;
  earnings?: number;
  totalDeposit?: number;
  totalWithdrawal?: number;
  totalBalance: number;
  picture?: string;
  pictureInfo?: string;
  accountState?: string;
  phoneNumber?: string;
}
export interface AdminAccount {
  btc: string;
  eth: string;
  usdt: string;
  phone?: string;
  email?: string;
}
export interface NotificationType {
  id: string;
  message: string;
  createdAt: Date;
  userId: string;
}
export interface DepositDto {
  id?: string;
  asset: string;
  amount: number;
  userId: string;
  to?: string;
  transactionState: any;
  createdAt: Date;
  walletAddress?: string;
  walletCode?: any;
}
export interface InvestmentType {
  id?: string;
  plan: string;
  amount: number;
  userId: string;
  status: any;
  createdAt: Date;
}
export interface PendingDepositDto {
  id?: string;
  depositId: string;
  amount: number;
  userId: string;
}
export interface TradeDto {
  id: string;
  username: string;
  pairs: string;
  amount: number;
  position: string;
  userId: string;
}
// Initial Typpes
interface initialTypes {
  userInfo: UserTypes | null;
  notifications: NotificationType[];
  adminAccounts: AdminAccount[];
  depositHistory: DepositDto[];
  withdrawalHistory: DepositDto[];
  pendingDeposits: PendingDepositDto[];
  investmentHistory: InvestmentType[];
  tradeHistory: TradeDto[];
  userState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  user2State: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  usersState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  withdrawalState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  sendState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  getState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  errorMessage: {
    statusCode: number;
    message: string;
  };
}
let userInfo: UserTypes = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  totalProfit: 0,
  pendingDeposit: 0,
  earnings: 0,
  totalDeposit: 0,
  totalWithdrawal: 0,
  totalBalance: 0,
  picture: "",
  pictureInfo: "",
  phoneNumber: "",
};
let adminAccounts: AdminAccount[] = [
  {
    btc: "",
    eth: "",
    usdt: "",
    email: "",
    phone: "",
  },
];
let notifications: NotificationType[] = [];
let depositHistory: DepositDto[] = [];
let withdrawalHistory: DepositDto[] = [];
let pendingDeposits: PendingDepositDto[] = [];
let investmentHistory: InvestmentType[] = [];
let tradeHistory: TradeDto[] = [];
const initialState: initialTypes = {
  userInfo,
  notifications,
  adminAccounts,
  depositHistory,
  withdrawalHistory,
  pendingDeposits,
  investmentHistory,
  tradeHistory,
  userState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  user2State: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  usersState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  sendState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  withdrawalState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  getState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  errorMessage: {
    statusCode: 0,
    message: "",
  },
};
export const login: any = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await loginUserApi(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getUser: any = createAsyncThunk(
  "get/user",
  async (id, thunkApi) => {
    try {
      return await GetUserApi(id);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getAdminAccounts: any = createAsyncThunk(
  "get/admin-accounts",
  async (_, thunkApi) => {
    try {
      return await GetAdminAccountsApi();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const register: any = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      return await registerUserApi(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const updateProfile: any = createAsyncThunk(
  "put/picture",
  async ([id, pictureData]: any, thunkApi) => {
    try {
      return await UpdateProfilePictureApi(id, pictureData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const kycVerify: any = createAsyncThunk(
  "put/kyc",
  async ([id, docData]: any, thunkApi) => {
    try {
      return await KYCVerifyApi(id, docData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const updateAccount: any = createAsyncThunk(
  "put/account",
  async ([id, accountData]: any, thunkApi) => {
    try {
      return await UpdateProfilePictureApi(id, accountData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const updatePhoneNumber: any = createAsyncThunk(
  "put/phone",
  async ([id, phoneData]: any, thunkApi) => {
    try {
      return await UpdatePhoneInformationApi(id, phoneData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const sendSupportTicket: any = createAsyncThunk(
  "post/ticket",
  async (supportdata, thunkApi) => {
    try {
      return await SendSupportTicket(supportdata);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getAllNotifications: any = createAsyncThunk(
  "get/notifications",
  async (userId: any, thunkApi) => {
    try {
      return await GetAllNotifications(userId);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getAllDeposits: any = createAsyncThunk(
  "get/deposits",
  async (userId: any, thunkApi) => {
    try {
      return await GetAllDeposits(userId);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getAllWithdrawals: any = createAsyncThunk(
  "get/withdrawals",
  async (userId: any, thunkApi) => {
    try {
      return await GetAllWithdrawals(userId);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getMyInvestments: any = createAsyncThunk(
  "get/investments",
  async (userId: any, thunkApi) => {
    try {
      return await GetMyInvestments(userId);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getAllPendingDeposits: any = createAsyncThunk(
  "get/pendingdeposits",
  async (userId: any, thunkApi) => {
    try {
      return await GetAllPendingDeposits(userId);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getMyTrades: any = createAsyncThunk(
  "get/trades",
  async (userId: any, thunkApi) => {
    try {
      return await GetMyTrades(userId);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const makeDeposit: any = createAsyncThunk(
  "create/deposit",
  async (depositData, thunkApi) => {
    try {
      return await MakeDepositApi(depositData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const makeWithdrawal: any = createAsyncThunk(
  "create/withdrawal",
  async (withdrawalData, thunkApi) => {
    try {
      return await MakeWithdrawalApi(withdrawalData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const makeInvestment: any = createAsyncThunk(
  "create/investment",
  async (investmentData, thunkApi) => {
    try {
      return await MakeInvestmentApi(investmentData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const makeTrade: any = createAsyncThunk(
  "create/trade",
  async (tradeData, thunkApi) => {
    try {
      return await MakeTrade(tradeData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const logout: any = createAsyncThunk(
  "auth/logout",
  async (userData, thunkApi) => {
    try {
      if (window !== undefined) {
        localStorage.removeItem("user");
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const HomeAppSlice = createSlice({
  name: "home-nav-slice",
  initialState,
  reducers: {
    reset: (state) => {
      state.userState = {
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
    resetWithdrawalState: (state) => {
      state.withdrawalState = {
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
    resetGetState: (state) => {
      state.getState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    setUserInfo: (state, {payload}) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, {payload}) => {
        state.userState.isLoading = false;
        state.userState.isSuccess = true;
        state.userState.isError = false;
        state.userInfo = payload;
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.userState.isLoading = false;
        state.userState.isSuccess = false;
        state.userState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(login.pending, (state, {payload}) => {
        state.userState.isLoading = true;
        state.userState.isSuccess = false;
        state.userState.isError = false;
      });
    builder
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.user2State.isLoading = false;
        state.user2State.isSuccess = true;
        state.user2State.isError = false;
        state.userInfo = payload;
      })
      .addCase(getUser.rejected, (state, {payload}) => {
        state.user2State.isLoading = false;
        state.user2State.isSuccess = false;
        state.user2State.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getUser.pending, (state, {payload}) => {
        state.user2State.isLoading = true;
        state.user2State.isSuccess = false;
        state.user2State.isError = false;
      });
    builder
      .addCase(register.fulfilled, (state, {payload}) => {
        state.userInfo = payload;
        state.userState.isLoading = false;
        state.userState.isSuccess = true;
        state.userState.isError = false;
      })
      .addCase(register.rejected, (state, {payload}) => {
        state.userState.isLoading = false;
        state.userState.isSuccess = false;
        state.userState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(register.pending, (state, {payload}) => {
        state.userState.isLoading = true;
        state.userState.isSuccess = false;
        state.userState.isError = false;
      });
    builder
      .addCase(updateProfile.fulfilled, (state, {payload}) => {
        state.userInfo = payload;
        state.sendState.isLoading = false;
        state.sendState.isSuccess = true;
        state.sendState.isError = false;
      })
      .addCase(updateProfile.rejected, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = false;
        state.sendState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateProfile.pending, (state, {payload}) => {
        state.sendState.isLoading = true;
        state.sendState.isSuccess = false;
        state.sendState.isError = false;
      });
    builder
      .addCase(kycVerify.fulfilled, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = true;
        state.sendState.isError = false;
      })
      .addCase(kycVerify.rejected, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = false;
        state.sendState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(kycVerify.pending, (state, {payload}) => {
        state.sendState.isLoading = true;
        state.sendState.isSuccess = false;
        state.sendState.isError = false;
      });
    builder
      .addCase(updateAccount.fulfilled, (state, {payload}) => {
        state.userInfo = payload;
        state.usersState.isLoading = false;
        state.usersState.isSuccess = true;
        state.usersState.isError = false;
      })
      .addCase(updateAccount.rejected, (state, {payload}) => {
        state.usersState.isLoading = false;
        state.usersState.isSuccess = false;
        state.usersState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateAccount.pending, (state, {payload}) => {
        state.usersState.isLoading = true;
        state.usersState.isSuccess = false;
        state.usersState.isError = false;
      });
    builder
      .addCase(updatePhoneNumber.fulfilled, (state, {payload}) => {
        state.userInfo = payload;
        state.usersState.isLoading = false;
        state.usersState.isSuccess = true;
        state.usersState.isError = false;
      })
      .addCase(updatePhoneNumber.rejected, (state, {payload}) => {
        state.usersState.isLoading = false;
        state.usersState.isSuccess = false;
        state.usersState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updatePhoneNumber.pending, (state, {payload}) => {
        state.usersState.isLoading = true;
        state.usersState.isSuccess = false;
        state.usersState.isError = false;
      });
    builder
      .addCase(sendSupportTicket.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.sendState.isSuccess = true;
        state.sendState.isError = false;
      })
      .addCase(sendSupportTicket.rejected, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = false;
        state.sendState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(sendSupportTicket.pending, (state, {payload}) => {
        state.sendState.isLoading = true;
        state.sendState.isSuccess = false;
        state.sendState.isError = false;
      });
    builder
      .addCase(makeDeposit.fulfilled, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = true;
        state.sendState.isError = false;
        state.depositHistory.push(payload);
      })
      .addCase(makeDeposit.rejected, (state, {payload}) => {
        state.sendState.isLoading = false;
        state.sendState.isSuccess = false;
        state.sendState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(makeDeposit.pending, (state, {payload}) => {
        state.sendState.isLoading = true;
        state.sendState.isSuccess = false;
        state.sendState.isError = false;
      });
    builder
      .addCase(makeWithdrawal.fulfilled, (state, {payload}) => {
        state.withdrawalState.isLoading = false;
        state.withdrawalState.isSuccess = true;
        state.withdrawalState.isError = false;
        state.withdrawalHistory.push(payload);
      })
      .addCase(makeWithdrawal.rejected, (state, {payload}) => {
        state.withdrawalState.isLoading = false;
        state.withdrawalState.isSuccess = false;
        state.withdrawalState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(makeWithdrawal.pending, (state, {payload}) => {
        state.withdrawalState.isLoading = true;
        state.withdrawalState.isSuccess = false;
        state.withdrawalState.isError = false;
      });
    builder
      .addCase(makeTrade.fulfilled, (state, {payload}) => {
        state.withdrawalState.isLoading = false;
        state.withdrawalState.isSuccess = true;
        state.withdrawalState.isError = false;
        state.tradeHistory.push(payload);
      })
      .addCase(makeTrade.rejected, (state, {payload}) => {
        state.withdrawalState.isLoading = false;
        state.withdrawalState.isSuccess = false;
        state.withdrawalState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(makeTrade.pending, (state, {payload}) => {
        state.withdrawalState.isLoading = true;
        state.withdrawalState.isSuccess = false;
        state.withdrawalState.isError = false;
      });
    builder
      .addCase(makeInvestment.fulfilled, (state, {payload}) => {
        state.withdrawalState.isLoading = false;
        state.withdrawalState.isError = false;
        state.withdrawalState.isSuccess = true;
        state.investmentHistory.push(payload);
      })
      .addCase(makeInvestment.rejected, (state, {payload}) => {
        state.withdrawalState.isLoading = false;
        state.withdrawalState.isSuccess = false;
        state.withdrawalState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(makeInvestment.pending, (state, {payload}) => {
        state.withdrawalState.isSuccess = false;
        state.withdrawalState.isError = false;
        state.withdrawalState.isLoading = true;
      });
    builder
      .addCase(getAllNotifications.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.notifications = payload;
      })
      .addCase(getAllNotifications.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllNotifications.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getAllDeposits.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.depositHistory = payload;
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
      .addCase(getAllWithdrawals.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.withdrawalHistory = payload;
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
      .addCase(getMyInvestments.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.investmentHistory = payload;
      })
      .addCase(getMyInvestments.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getMyInvestments.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getAllPendingDeposits.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.pendingDeposits = payload;
      })
      .addCase(getAllPendingDeposits.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllPendingDeposits.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getAdminAccounts.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.adminAccounts = payload;
      })
      .addCase(getAdminAccounts.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAdminAccounts.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(getMyTrades.fulfilled, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.tradeHistory = payload;
      })
      .addCase(getMyTrades.rejected, (state, {payload}) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getMyTrades.pending, (state, {payload}) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
  },
});
export const {
  resetGetState,
  resetSendState,
  reset,
  resetUsersState,
  setUserInfo,
  resetWithdrawalState,
} = HomeAppSlice.actions;
export default HomeAppSlice.reducer;
