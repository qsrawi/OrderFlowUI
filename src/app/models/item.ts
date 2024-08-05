export interface Item {
    itemId: number;
    name: string;
    price: number;
    createdDate: string;
    image: string;
    description: string;
    supplierId: number;
  }
  
  export interface ItemFilterParams {
    ItemName?: string;
    MinPrice?: number;
    MaxPrice?: number;
    CreatedDateFrom?: Date;
    CreatedDateTo?: Date;
    supplierId?: number,
    PageNumber: number;
    PageSize: number;
  }
  
  export interface ItemResponse {
    items: Item[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  }
  