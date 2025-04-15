import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TradeService } from './trade.service';
import { Signal, Trades } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CreateSignalDto, CreateTradeDto } from './dto/create-trade.dto';

@Controller('trade')
export class TradeController {
  constructor(
    private tradeService: TradeService,
    private userService: UserService,
  ) {}

  @Post()
  async createTrade(@Body() tradeDto: CreateTradeDto): Promise<Trades> {
    if (
      !tradeDto.amount ||
      !tradeDto.pairs ||
      !tradeDto.position ||
      !tradeDto.userId
    )
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    const user = await this.userService.getUser({ id: tradeDto.userId });
    if (!user)
      throw new HttpException("User Doesn't exist", HttpStatus.BAD_REQUEST);
    if (Number(user.totalBalance) < Number(tradeDto.amount))
      throw new HttpException('Insufficient funds', HttpStatus.FORBIDDEN);
    const makeTrade = await this.tradeService.createTrade({
      pairs: tradeDto.pairs,
      amount: Number(tradeDto.amount),
      position: tradeDto.position,
      userId: tradeDto.userId,
    });

    await this.userService.updateUserInfo(
      { id: tradeDto.userId },
      {
        totalBalance: user.totalBalance - tradeDto.amount,
      },
    );

    return makeTrade;
  }

  @Post('signal')
  async createSignal(@Body() tradeDto: CreateSignalDto): Promise<Signal> {
    if (
      !tradeDto.amount ||
      !tradeDto.name ||
      !tradeDto.percentage ||
      !tradeDto.userId ||
      !tradeDto.description
    )
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    const user = await this.userService.getUser({ id: tradeDto.userId });
    if (!user)
      throw new HttpException("User Doesn't exist", HttpStatus.BAD_REQUEST);
    if (Number(user.totalBalance) < Number(tradeDto.amount))
      throw new HttpException('Insufficient funds', HttpStatus.FORBIDDEN);
    const makeTrade = await this.tradeService.createSignal({
      name: tradeDto.name,
      amount: Number(tradeDto.amount),
      percentage: Number(tradeDto.percentage),
      userId: tradeDto.userId,
      description: tradeDto.description,
    });

    await this.userService.updateUserInfo(
      { id: tradeDto.userId },
      {
        totalBalance: user.totalBalance - tradeDto.amount,
      },
    );

    return makeTrade;
  }

  @Get('/my/trades/:userId')
  async getMyTrades(@Param('userId') userId: string): Promise<Trades[]> {
    if (!userId)
      throw new HttpException('Id is undefined', HttpStatus.BAD_REQUEST);
    return this.tradeService.getMyTrades({ userId });
  }
  @Get('/my/signals/:userId')
  async getMySignals(@Param('userId') userId: string): Promise<Signal[]> {
    if (!userId)
      throw new HttpException('Id is undefined', HttpStatus.BAD_REQUEST);
    return this.tradeService.getMySignals({ userId });
  }

  @Get('all')
  async getAllTrades(): Promise<Trades[]> {
    const allTrades = await this.tradeService.getAllTrades();
    const users = await this.userService.getAllUsers();

    const newTrades = allTrades.map((trades) => {
      const { lastname, firstname } = users.find(
        (user) => user.id === trades.userId,
      );
      return { ...trades, username: `${firstname} ${lastname}` };
    });

    return newTrades;
  }
  @Get('all/signals')
  async getAllSignals(): Promise<Signal[]> {
    return this.tradeService.getAllSignals();
  }
}
