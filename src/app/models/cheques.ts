export interface Cheque {
    chequeId: number;
    chequeReceiverName: string;
    chequeHolderName: string;
    chequeNumber: number;
    issueDate: string;
    dueDate: string;
    accountNumber: string;
    chequeType: number;
    amount: number;
    currency: string;
    issuerSupplierId: number;
    receiverSupplierId: number;
    customerId: number;
    bankName: string | null;
    chequeImages: string;
    status: string;
  }
  
export interface ChequeFilterParams {
    Status?: string;
    IssueDateFrom?: Date;
    IssueDateTo?: Date;
    DueDateFrom?: Date;
    DueDateTo?: Date;
    AmountFrom?: number;
    AmountTo?: number;
    Currency?: string;
    ChequeHolderName?: string;
    BankName?: string;
    PageNumber: number;
    PageSize: number;
  }
  
export interface ChequesResponse {
    items: Cheque[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  }
  