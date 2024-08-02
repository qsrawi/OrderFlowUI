export interface Order {
    orderId: number;
    customerId: number;
    supplierId: number;
    orderDate: string;
    orderType: string;
    status: string;
    orderItems: OrderItem[];
  }
  
  export interface OrderItem {
    itemId: number;
    quantity: number;
    price: number;
    itemName: number;
    itemDescription: number;
  }
  
  export interface OrderFilterParams {
    OrderDateFrom?: Date;
    OrderDateTo?: Date;
    MinTotalAmount?: number;
    MaxTotalAmount?: number;
    Status?: string;
    PageNumber: number;
    PageSize: number;
  }
  
  export interface PaginationParams {
    PageNumber: number;
    PageSize: number;
  }
  
  export interface OrderResponse {
    items: Order[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  }
  