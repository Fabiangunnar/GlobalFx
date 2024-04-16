import { IsEmail, IsNotEmpty } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateAdminAuthDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  usdt: string;
  btc: string;
  eth: string;
  email: string;
  phone: string;
}
