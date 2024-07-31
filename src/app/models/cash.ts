export interface CashDto {
    id: number;
    number: number;
    amount: number;
    currency: string;
    date: Date;
    supplierId?: number;
    customerId?: number;
    customerName?: string;
}
