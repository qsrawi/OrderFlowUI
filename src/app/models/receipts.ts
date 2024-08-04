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
    receipts: ReceiptDto[];
    totalAmount: number;
    remainingDebt: number;
    loading: boolean;
    error: string | null;
}

export interface ReceiptDto {
    receiptId: number;
    issuer?: string;
    reciver?: string;
    receiptDate: Date;
    cheques?: ReceiptChequesDto[];
    cashDetailes?: ReceiptDetailsDto[];
    totalAmount?: number;
  }
  
  export interface ReceiptChequesDto {
    invoiceNumber?: number;
    amount: number;
    currency?: string;
    dueDate: Date;
    bankName?: string;
  }
  
  export interface ReceiptDetailsDto {
    invoiceNumber?: number;
    amount: number;
    currency?: string;
  }