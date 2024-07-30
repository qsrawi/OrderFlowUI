export interface CreateItemDto {
    name: string;
    price: number;
    description?: string;
    images?: string;
    supplierId?: number;
  }