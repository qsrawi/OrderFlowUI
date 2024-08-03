export interface Cheque {
    chequeNumber: number;
    issueDate: Date;
    dueDate: Date;
    amount: number;
    accountNumber?: string;
    currency?: string;
    issuerSupplierId?: number;
    receiverSupplierId?: number;
    customerId?: number;
    bankName?: string;
    status?: string;
    frontImage?: File;
    backImage?: File;
}
  
export interface CashDetail {
    id?: number;
    number: number;
    amount: number;
    currency?: string;
    date: Date;
    supplierId?: number;
    customerId?: number;
    tradingSupplierId?: number;
    customerName?: string;
}

export interface Receipt {
    supplierId?: number;
    customerId?: number;
    tradingSupplierId?: number;
    cheques: Cheque[];
    cashDetails: CashDetail[];
}

export interface ReceiptState {
    receipts: Receipt[];
    totalAmount: number;
    remainingDebt: number;
    loading: boolean;
    error: string | null;
}