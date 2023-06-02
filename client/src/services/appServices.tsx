import axios from "axios";

const API = axios.create({
  //   baseURL: `http://localhost:5000`,
  baseURL: `https://globaltycoonfxapi.onrender.com/`,
});
const timeoutInHours = 24;
const timeoutInMilliseconds = timeoutInHours * 60 * 60 * 1000;
//  Auth Register
export const registerUserApi = async (formData: any) => {
  const {data} = await API.post("/user/register", formData);
  if (window !== undefined) {
    localStorage.setItem("user", JSON.stringify(data));
    setTimeout(() => {
      localStorage.removeItem("user");
    }, timeoutInMilliseconds);
  }
  return data;
};
export const GetUserApi = async (id: any) => {
  if (typeof id !== "string") return;
  try {
    const response = await API.get(`/user/${id}`);
    if (window !== undefined) {
      const storedUser = localStorage.getItem("user");
      const userData = storedUser ? JSON.parse(storedUser) : null;
      if (userData) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setTimeout(() => {
          localStorage.removeItem("user");
        }, timeoutInMilliseconds);
      }
    }

    if (response.status === 200 && response.data === "") {
      localStorage.removeItem("user");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const GetAdminAccountsApi = async () => {
  const {data} = await API.get(`/admin-auth`);
  return data;
};
// Auth Login
export const loginUserApi = async (formData: any) => {
  const {data} = await API.post("/user/login", formData);
  if (window !== undefined) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};
export const loginAdminApi = async (formData: any) => {
  const {data} = await API.post("/admin-auth/login", formData);
  return data;
};
export const UpdateUserAccountInfoApi = async (id: any, formData: any) => {
  const {data} = await API.put(`/user/account/${id}`, formData);
  return data;
};
export const UpdateProfilePictureApi = async (id: any, pictureData: any) => {
  const {data} = await API.put(`/user/picture/${id}`, pictureData);
  return data;
};
export const KYCVerifyApi = async (id: any, docData: any) => {
  const {data} = await API.put(`/user/kyc/${id}`, docData);
  return data;
};
export const UpdatePhoneInformationApi = async (id: any, pictureData: any) => {
  const {data} = await API.put(`/user/phone/${id}`, pictureData);
  return data;
};
export const SendSupportTicket = async (supportdata: any) => {
  const {data} = await API.post(`/support`, supportdata);
  return data;
};
export const GetAllNotifications = async (id: string) => {
  const {data} = await API.get(`/notification/${id}`);

  return data;
};
export const GetAllDeposits = async (id: string) => {
  const {data} = await API.get(`/deposit/all/${id}`);

  return data;
};
export const GetAllWithdrawals = async (id: string) => {
  const {data} = await API.get(`/withdraw/my/${id}`);
  return data;
};
export const GetMyInvestments = async (id: string) => {
  const {data} = await API.get(`/investment/my/${id}`);
  return data;
};
export const GetAllPendingDeposits = async (id: string) => {
  const {data} = await API.get(`/deposit/pending/${id}`);

  return data;
};
export const GetMyTrades = async (id: string) => {
  const {data} = await API.get(`/trade/my/${id}`);

  return data;
};
export const MakeDepositApi = async (depositData: any) => {
  const {data} = await API.post(`/deposit`, depositData);

  return data;
};
export const MakeWithdrawalApi = async (withdrawData: any) => {
  const {data} = await API.post(`/withdraw`, withdrawData);

  return data;
};
export const MakeInvestmentApi = async (investmentData: any) => {
  const {data} = await API.post(`/investment`, investmentData);

  return data;
};
export const MakeTrade = async (tradeData: any) => {
  const {data} = await API.post(`/trade`, tradeData);

  return data;
};
