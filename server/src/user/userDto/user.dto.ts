/* eslint-disable prettier/prettier */
export interface UserDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserAccountInfo {
  activeDeposit: number;
  totalProfit: number;
  totalDeposit: number;
  totalWithdrawal: number;
  totalBalance: number;
}
export interface UserAccountInfo {
  picture: string;
  pictureInfo: string;
}

export interface AccountStateDto {
  accountState: string;
}
export interface PhoneNumberDto {
  phoneNumber: string;
}
export interface KycVerifyDto {
  idDocuments: any;
  proofOfAddress: any;
  status?: any;
}
