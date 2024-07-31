export interface ReceiptDto {
    receiptId: number;
    issuer: string;
    reciver: string;
    invoiceNumber: number;
    amount: number;
    currency: string;
    receiptDate: Date;
}

export interface CreateReceiptDto {
    chequeId?: number;
    cashId?: number;
    supplierId?: number;
    customerId?: number;
}
  