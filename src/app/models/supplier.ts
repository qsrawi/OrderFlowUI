export interface Supplier {
    supplierId: number;
    userName: string;
    password: string;
    email: string;
    phone: string;
    name: string;
    identity: string;
    details: string;
    address: string;
    image: string;
  }

export interface SuppliersResponse {
    items: Supplier[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}

export interface CreateSupplierDto {
  userName?: string;
  password?: string;
  email?: string;
  phone?: string;
  name?: string;
  identity?: string;
  details?: string;
  address?: string;
  image?: string;
}