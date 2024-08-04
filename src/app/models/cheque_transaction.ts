export interface Transaction {
    transactionId: number;
    invoiceNumber: number;
    transactionDate: string;
    amount: number;
    receiverName: string;
    issuerName: string;
    paymentMethod: string;
    currency?: string;
    paymentStatus?: string;
    remainingDebt: number;
  } 