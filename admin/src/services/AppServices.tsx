import axios from "axios";

const API = axios.create({
  //   baseURL: `http://localhost:5000`,
  baseURL: `https://globaltycoonfxapi.onrender.com/`,
});
//  Auth Register
export const loginAdminApi = async (formData: any) => {
  const {data} = await API.post("/admin-auth/login", formData);
  if (window !== undefined) {
    localStorage.setItem("admin", JSON.stringify(data));
  }
  return data;
};

export const GetUserApi = async (id: any) => {
  const {data} = await API.get(`/user/${id}`);
  return data;
};
export const UserDepositApi = async (depositData: any) => {
  const {data} = await API.post(`/admin-auth/user/deposit`, depositData);
  return data;
};
export const UpdateUserApi = async (id: any, accountInfo: any) => {
  const {data} = await API.put(`/user/account/${id}`, accountInfo);
  return data;
};
export const UpdateDepositApi = async (id: any, depositInfo: any) => {
  const {data} = await API.put(`/deposit/mydeposit/${id}`, depositInfo);
  return data;
};
export const GetCodeApi = async () => {
  const {data} = await API.get(`/admin-auth/code`);
  return data;
};

export const GetAdminApi = async (id: any) => {
  const {data} = await API.get(`/admin-auth/my/${id}`);
  if (window !== undefined) {
    localStorage.setItem("admin", JSON.stringify(data));
  }
  return data;
};

export const UpdateAdminInfoApi = async (id: any, adminInfo: any) => {
  const {data} = await API.put(`/admin-auth/info/${id}`, adminInfo);
  if (window !== undefined) {
    localStorage.setItem("admin", JSON.stringify(data));
  }
  return data;
};

export const GetAllUsersApi = async () => {
  const {data} = await API.get(`/user/all`);
  if (window !== undefined) {
    localStorage.setItem("users", JSON.stringify(data));
  }
  return data;
};
export const GetMyUserApi = async (id: string) => {
  const {data} = await API.get(`/deposit/all/${id}`);

  return data;
};
export const GetAllKYCDocumentsApi = async () => {
  const {data} = await API.get(`/user/kyc/all`);

  return data;
};
export const VerifyUserApi = async (id: string, accountState: string) => {
  const {data} = await API.put(`/user/verifyuser/${id}`, accountState);

  return data;
};
export const VerifyInvestmentApi = async (
  id: string,
  investmentState: string
) => {
  const {data} = await API.put(`/investment/admin/${id}`, investmentState);

  return data;
};
export const GetAllSupportTickets = async () => {
  const {data} = await API.get(`/support`);

  return data;
};
export const GetAllDepositsApi = async () => {
  const {data} = await API.get(`/deposit/all`);

  return data;
};
export const GetAllTrades = async () => {
  const {data} = await API.get(`/trade/all`);

  return data;
};
export const GetAllInvestmentsApi = async () => {
  const {data} = await API.get(`/investment/all`);

  return data;
};
export const GetAllWithdrawalsApi = async () => {
  const {data} = await API.get(`/withdraw/all`);

  return data;
};

export const DeleteUserApi = async (id: any) => {
  const {data} = await API.delete(`/user/${id}`);
  return data;
};

export const SendNotificationApi = async (notificationdata: any) => {
  const {data} = await API.post(`/notification`, notificationdata);
  return data;
};
export const SetTransactionStateApi = async (
  id: string,
  transactiondata: any
) => {
  const {data} = await API.put(
    `/deposit/verifytransaction/${id}`,
    transactiondata
  );
  return data;
};
