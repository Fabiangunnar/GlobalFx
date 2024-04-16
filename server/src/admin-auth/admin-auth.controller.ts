/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Admin, DepositHistory, WithdrawalCode } from '@prisma/client';
import { AdminAuthService } from './admin-auth.service';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'src/user/user.service';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';
import { CreateDepositDto } from 'src/deposit/dto/create-deposit.dto';
import { UpdateAdminAuthDto } from './dto/update-admin-auth.dto';
import { UpdateDepositDto } from 'src/deposit/dto/update-deposit.dto';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(
    private adminAuthService: AdminAuthService,
    private userService: UserService,
  ) {}
  @Post('/register')
  async createUser(@Body() user: CreateAdminAuthDto): Promise<Admin> {
    try {
      const { username, password } = user;

      // const salt = 10;
      // const hashedPassword = await bcrypt.hash(user.password, salt);
      const data = await this.adminAuthService.createAdmin({
        username: username,
        password: password,
      });
      // delete data.password;
      return data;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/login')
  async loginUser(@Body() user: CreateAdminAuthDto): Promise<Admin> {
    try {
      const data = await this.adminAuthService.getUser({
        username: user.username,
      });

      if (!data)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);

      const isMatch = user.password === data.password;
      if (!isMatch)
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

      return data;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/code')
  async createCode(): Promise<WithdrawalCode> {
    try {
      const uuid = uuidv4();
      const timeoutDuration = 3 * 60 * 60 * 1000 + 1 * 60 * 1000;
      const code = await this.adminAuthService.createCode({
        withdrawalCode: uuid,
      });

      setTimeout(async () => {
        await this.adminAuthService.deleteCode({
          withdrawalCode: uuid,
        });
      }, timeoutDuration);

      return code;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/my/:id')
  async getUser(@Param('id') id: string): Promise<Admin> {
    try {
      const data = await this.adminAuthService.getUser({
        id,
      });
      return data;
    } catch (error) {
      throw new HttpException(
        'Something terribly wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put('/info/:id')
  async updateAdmin(
    @Body() user: UpdateAdminAuthDto,
    @Param('id') id: string,
  ): Promise<Admin> {
    try {
      if (!id) throw new HttpException('login again', HttpStatus.FORBIDDEN);
      const data = await this.adminAuthService.getUser({
        id,
      });
      if (!data)
        throw new HttpException('Your Username is wrong', HttpStatus.NOT_FOUND);
      const app = await this.adminAuthService.updateAdmin(
        { id },
        {
          username: user.username ? user.username : data.username,
          password: user.password ? user.password : data.password,
          btc: user.btc ? user.btc : data.btc,
          eth: user.eth ? user.eth : data.eth,
          usdt: user.usdt ? user.usdt : data.usdt,
          email: user.email ? user.email : data.email,
          phone: user.phone ? user.phone : data.phone,
        },
      );
      return app;
    } catch (error) {
      throw new HttpException(
        `Something terribly wrong \n ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // @Delete('/')
  // async deleteAdmin() {
  //   try {
  //     return await this.adminAuthService.deleteAdmin();
  //   } catch (error) {
  //     throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
  //   }
  // }
  @Get('/')
  async getAdminArray(): Promise<Admin[]> {
    try {
      const data = await this.adminAuthService.getAdminArray();

      const newData = await data.map((admin) => {
        delete admin.password;
        // delete admin.username;
        return admin;
      });

      return newData;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/user/deposit')
  async createDeposit(
    @Body() deposit: UpdateDepositDto,
  ): Promise<DepositHistory> {
    try {
      const user = await this.userService.getUser({ id: deposit.userId });

      const depo = await this.adminAuthService.createDeposit({
        asset: `BTC`,
        amount: Number(deposit.amount),
        userId: `${deposit.userId}`,
        to: 'admin',
        transactionState: 'VERIFIED',
      });
      await this.userService.updateUserInfo(
        { id: deposit.userId },
        {
          totalDeposit: depo.amount + user.totalDeposit,
          totalBalance: depo.amount + user.totalBalance,
        },
      );
      return depo;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
