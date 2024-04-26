/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class WithdrawMessageDto {
  @IsNotEmpty()
  @IsNumber()
  withdrawMessage: number;
}

export class CreateUserDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class UserAccountInfo {
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

export class AccountStateDto {
  accountState: string;
}
export class PhoneNumberDto {
  phoneNumber: string;
}
export class KycVerifyDto {
  idDocuments: any;
  proofOfAddress: any;
  status?: any;
}
