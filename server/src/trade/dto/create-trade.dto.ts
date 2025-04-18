export class CreateTradeDto {
  pairs: string;
  amount: number;
  position: string;
  userId: string;
}

export class CreateSignalDto {
  name: string;
  amount: number;
  percentage: string;
  userId: string;
  description: string;
}

export class CreateTradeSignalDto {
  title: string;
  description: string;
  price: string;
  percentage: string;
}
