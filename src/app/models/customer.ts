export interface CustomerBaseDto {
    userName: string;
    password: string;
    email: string;
    phone: string;
    name: string;
    identity: string;
    details?: string;
    address: string;
    image?: string;
    balance: number;
    supplierId: number;
  }