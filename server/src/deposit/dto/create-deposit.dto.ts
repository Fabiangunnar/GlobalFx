import { IsNotEmpty } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateDepositDto {
  @IsNotEmpty()
  asset: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  userId: string;
  transactionState: any;
  @IsNotEmpty()
  to: string;
  walletAddress: string;
  walletCode: any;
}
