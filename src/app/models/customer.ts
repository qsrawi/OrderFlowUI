export interface CustomerBaseDto {
  customerId: number;
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
  supplierId?: number;
}

export interface CustomersResponse {
  items: CustomerBaseDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}