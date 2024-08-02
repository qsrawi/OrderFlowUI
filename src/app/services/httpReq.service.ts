import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user'
import { ChequeFilterParams, ChequesResponse } from '../models/cheques';
import { CreateSupplierDto, SuppliersResponse } from '../models/supplier';
import { Transaction } from '../models/cheque_transaction';
import { OrderFilterParams, OrderResponse } from '../models/orders';
import { ItemFilterParams, ItemResponse } from '../models/item';
@Injectable({
  providedIn: 'root'
})
export class AdminHttpReqService {
    private apiUrl = 'https://localhost:7188/api';
    private userApiUrl = `${this.apiUrl}/User`;
    private adminApiUrl = `${this.apiUrl}/Admin`;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.userApiUrl}/login`, { username, password }).pipe(
        catchError(() => of(null as any))
        );
    }

    getSuppliers(pageNumber: number, pageSize: number, filters: any): Observable<SuppliersResponse> {
        let params = new HttpParams()
            .set('PageNumber', pageNumber.toString())
            .set('PageSize', pageSize.toString());

        if (filters.name) params = params.set('Name', filters.name);
        if (filters.userName) params = params.set('UserName', filters.userName);
        if (filters.email) params = params.set('Email', filters.email);
        if (filters.phone) params = params.set('Phone', filters.phone);
        if (filters.address) params = params.set('Address', filters.address);
        if (filters.identity) params = params.set('Identity', filters.identity);

        return this.http.get<SuppliersResponse>(`${this.adminApiUrl}/GetSuppliers`, { params });
    }

    getCheques(chequeType: string, filters: ChequeFilterParams): Observable<ChequesResponse> {
        let params = new HttpParams()
            .set('PageNumber', filters.PageNumber.toString())
            .set('PageSize', filters.PageSize.toString())
            .set('chequeType', chequeType);

        if (filters.Status) params = params.set('Status', filters.Status);
        if (filters.IssueDateFrom) params = params.set('IssueDateFrom', new Date(filters.IssueDateFrom).toISOString());
        if (filters.IssueDateTo) params = params.set('IssueDateTo', new Date(filters.IssueDateTo).toISOString());
        if (filters.DueDateFrom) params = params.set('DueDateFrom', new Date(filters.DueDateFrom).toISOString());
        if (filters.DueDateTo) params = params.set('DueDateTo', new Date(filters.DueDateTo).toISOString());
        if (filters.AmountFrom) params = params.set('AmountFrom', filters.AmountFrom.toString());
        if (filters.AmountTo) params = params.set('AmountTo', filters.AmountTo.toString());
        if (filters.Currency) params = params.set('Currency', filters.Currency);
        if (filters.BankName) params = params.set('BankName', filters.BankName);

        return this.http.get<ChequesResponse>(`${this.adminApiUrl}/GetCheques/${chequeType}`, { params });
    }

    getSupplier(id: number): Observable<CreateSupplierDto> {
        return this.http.get<CreateSupplierDto>(`${this.adminApiUrl}/GetSupplier/${id}`);
      }

    getChequeTransactions(chequeId: number): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(`${this.adminApiUrl}/GetChequeTransactions/${chequeId}`);
    }

    getOrders(filters: OrderFilterParams): Observable<OrderResponse> {
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
      
      return this.http.get<OrderResponse>(`${this.adminApiUrl}/GetOrders`, { params });
    }

    getItems(filters: ItemFilterParams): Observable<ItemResponse> {
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
  
      return this.http.get<ItemResponse>(`${this.adminApiUrl}/GetItems`, { params });
    }

    saveSupplier(id: number | undefined, supplier: CreateSupplierDto): Observable<void> {
      const url = id ? `${this.adminApiUrl}/SaveSupplier?id=${id}` : `${this.adminApiUrl}/SaveSupplier`;
      return this.http.post<void>(url, supplier);
    }

    deleteSupplier(id: number): Observable<void> {
      return this.http.delete<void>(`${this.adminApiUrl}/DeleteSupplier/${id}`);
    }
}