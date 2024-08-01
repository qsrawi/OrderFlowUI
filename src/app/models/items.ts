export interface CreateItemDto {
    name: string;
    price: number;
    description?: string;
    image?: File;
    supplierId?: number;
  }