import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChequeFilterParams, ChequesResponse } from '../models/cheques';
import { OrderFilterParams, OrderResponse } from '../models/orders';
import { ItemFilterParams, ItemResponse } from '../models/item';
import { CustomerBaseDto } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerHttpReqService {
    private apiUrl = 'https://localhost:7188/api';
    private customerApiUrl = `${this.apiUrl}/Customer`;

    constructor(private http: HttpClient) {}

    loadCustomer(customerId: number | undefined): Observable<CustomerBaseDto> {
      return this.http.get<CustomerBaseDto>(`${this.customerApiUrl}/GetCustomer/${customerId}`);
    }

    getItemsForCustomer(supplierId: number | undefined, filters: ItemFilterParams): Observable<ItemResponse> {
      let params = new HttpParams();
        if (filters.ItemName) {
          params = params.set('ItemName', filters.ItemName);
        }
        if (filters.MinPrice !== undefined && filters.MinPrice !== null) {
          params = params.set('MinPrice', filters.MinPrice.toString());
        }
        if (filters.MaxPrice !== undefined && filters.MaxPrice !== null) {
          params = params.set('MaxPrice', filters.MaxPrice.toString());
        }
        if (filters.CreatedDateFrom) {
          params = params.set('CreatedDateFrom', filters.CreatedDateFrom.toISOString());
        }
        if (filters.CreatedDateTo) {
          params = params.set('CreatedDateTo', filters.CreatedDateTo.toISOString());
        }
        params = params.set('PageNumber', filters.PageNumber.toString());
        params = params.set('PageSize', filters.PageSize.toString());
  
      return this.http.get<ItemResponse>(`${this.customerApiUrl}/GetItemsBySupplier/${supplierId}`, { params });
    }
}