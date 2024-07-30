import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChequeFilterParams, ChequesResponse } from '../models/cheques';
import { OrderFilterParams, OrderResponse } from '../models/orders';
import { ItemFilterParams, ItemResponse } from '../models/item';
import { CustomerBaseDto, CustomersResponse } from '../models/customer';
import { CreateItemDto } from '../models/items';

@Injectable({
  providedIn: 'root'
})
export class SupplierHttpReqService {
    private apiUrl = 'https://localhost:7188/api';
    private supplierApiUrl = `${this.apiUrl}/Supplier`;

    constructor(private http: HttpClient) {}

    getSuppliers(id: number | undefined, pageNumber: number, pageSize: number, filters: any): Observable<CustomersResponse> {
      let params = new HttpParams()
          .set('PageNumber', pageNumber.toString())
          .set('PageSize', pageSize.toString());

      if (filters.name) params = params.set('Name', filters.name);
      if (filters.userName) params = params.set('UserName', filters.userName);
      if (filters.email) params = params.set('Email', filters.email);
      if (filters.phone) params = params.set('Phone', filters.phone);
      if (filters.address) params = params.set('Address', filters.address);
      if (filters.identity) params = params.set('Identity', filters.identity);

      return this.http.get<CustomersResponse>(`${this.supplierApiUrl}/GetCustomersBySupplier/${id}`, { params });
    }

    getChequesBySupplier(supplierId: number | undefined, filters: ChequeFilterParams): Observable<ChequesResponse> {
        let params = new HttpParams()
        .set('PageNumber', filters.PageNumber.toString())
        .set('PageSize', filters.PageSize.toString())

        if (filters.Status) params = params.set('Status', filters.Status);
        if (filters.IssueDateFrom) params = params.set('IssueDateFrom', new Date(filters.IssueDateFrom).toISOString());
        if (filters.IssueDateTo) params = params.set('IssueDateTo', new Date(filters.IssueDateTo).toISOString());
        if (filters.DueDateFrom) params = params.set('DueDateFrom', new Date(filters.DueDateFrom).toISOString());
        if (filters.DueDateTo) params = params.set('DueDateTo', new Date(filters.DueDateTo).toISOString());
        if (filters.AmountFrom) params = params.set('AmountFrom', filters.AmountFrom.toString());
        if (filters.AmountTo) params = params.set('AmountTo', filters.AmountTo.toString());
        if (filters.Currency) params = params.set('Currency', filters.Currency);
        if (filters.BankName) params = params.set('BankName', filters.BankName);
        return this.http.get<ChequesResponse>(`${this.supplierApiUrl}/GetChequesBySupplier/${supplierId}`, { params });
    }

    getOrdersBySupplier(supplierId: number| undefined, filters: OrderFilterParams): Observable<OrderResponse> {
        let params = new HttpParams();
        
        if (filters.OrderDateFrom) {
          params = params.set('OrderDateFrom', filters.OrderDateFrom.toISOString());
        }
        if (filters.OrderDateTo) {
          params = params.set('OrderDateTo', filters.OrderDateTo.toISOString());
        }
        if (filters.MinTotalAmount !== undefined && filters.MinTotalAmount !== null) {
          params = params.set('MinTotalAmount', filters.MinTotalAmount.toString());
        }
        if (filters.MaxTotalAmount !== undefined && filters.MaxTotalAmount !== null) {
          params = params.set('MaxTotalAmount', filters.MaxTotalAmount.toString());
        }
        if (filters.Status) {
          params = params.set('Status', filters.Status);
        }
        params = params.set('PageNumber', filters.PageNumber.toString());
        params = params.set('PageSize', filters.PageSize.toString());

        return this.http.get<OrderResponse>(`${this.supplierApiUrl}/GetOrdersBySupplier/${supplierId}`, { params });
    }

    getItemsBySupplier(supplierId: number | undefined, filters: ItemFilterParams): Observable<ItemResponse> {
      let params = new HttpParams();
        if (filters.SupplierName) {
          params = params.set('SupplierName', filters.SupplierName);
        }
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

      return this.http.get<ItemResponse>(`${this.supplierApiUrl}/GetItems/${supplierId}`, { params });
    }
  
    saveCustomer(id: number | undefined, customer: CustomerBaseDto): Observable<void> {
      const url = id ? `${this.supplierApiUrl}/SaveCustomer/${id}` : `${this.supplierApiUrl}/SaveCustomer`;
      return this.http.post<void>(url, customer);
    }

    addItem(item: CreateItemDto): Observable<void> {
      return this.http.post<void>(`${this.supplierApiUrl}/AddItem`, item);
    }
}