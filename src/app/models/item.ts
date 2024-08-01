export interface Item {
    itemId: number;
    name: string;
    price: number;
    createdDate: string;
    image: string;
  }
  
  export interface ItemFilterParams {
    SupplierName?: string;
    ItemName?: string;
    MinPrice?: number;
    MaxPrice?: number;
    CreatedDateFrom?: Date;
    CreatedDateTo?: Date;
    PageNumber: number;
    PageSize: number;
  }
  
  export interface ItemResponse {
    items: Item[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  }
  