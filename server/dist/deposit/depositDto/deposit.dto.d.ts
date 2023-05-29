export interface DepositDto {
    asset: string;
    amount: number;
    userId: string;
    transactionState: any;
    to?: string;
    walletAddress?: string;
    walletCode?: any;
}
