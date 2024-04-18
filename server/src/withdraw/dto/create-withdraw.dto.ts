import { IsNotEmpty } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateWithdrawDto {
  @IsNotEmpty()
  asset: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  userId: string;
  transactionState: any;
  @IsNotEmpty()
  walletAddress: string;
  @IsNotEmpty()
  walletCode: any;
}
