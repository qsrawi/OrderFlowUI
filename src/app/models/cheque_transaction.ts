export interface ChequeTransaction {
    transactionId: number;
    invoiceNumber: number;
    transactionDate: string;
    amount: number;
    details: string | null;
    chequeReceiverName: string;
    paymentMethod: string;
  } 