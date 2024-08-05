import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChequeFilterParams, ChequesResponse } from '../models/cheques';
import { CreateOrderDto, OrderFilterParams, OrderResponse } from '../models/orders';
import { ItemFilterParams, ItemResponse } from '../models/item';
import { CustomerBaseDto, CustomersResponse } from '../models/customer';
import { CashDto } from '../models/cash';
import { Transaction } from '../models/cheque_transaction';
import { SuppliersResponse } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierHttpReqService {
  private apiUrl = 'https://localhost:7188/api';
  private supplierApiUrl = `${this.apiUrl}/Supplier`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getCustomersBySupplier(
    id: number | undefined,
    pageNumber: number,
    pageSize: number,
    filters: any
  ): Observable<CustomersResponse> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

    if (filters.name) params = params.set('Name', filters.name);
    if (filters.userName) params = params.set('UserName', filters.userName);
    if (filters.email) params = params.set('Email', filters.email);
    if (filters.phone) params = params.set('Phone', filters.phone);
    if (filters.address) params = params.set('Address', filters.address);
    if (filters.identity) params = params.set('Identity', filters.identity);

    const headers = this.getAuthHeaders();
    return this.http.get<CustomersResponse>(
      `${this.supplierApiUrl}/GetCustomersBySupplier/${id}`,
      { headers, params }
    );
  }

  getChequesBySupplier(
    supplierId: number | undefined,
    filters: ChequeFilterParams
  ): Observable<ChequesResponse> {
    let params = new HttpParams()
      .set('PageNumber', filters.PageNumber.toString())
      .set('PageSize', filters.PageSize.toString());

    if (filters.Status) params = params.set('Status', filters.Status);
    if (filters.IssueDateFrom) params = params.set('IssueDateFrom', new Date(filters.IssueDateFrom).toISOString());
    if (filters.IssueDateTo) params = params.set('IssueDateTo', new Date(filters.IssueDateTo).toISOString());
    if (filters.DueDateFrom) params = params.set('DueDateFrom', new Date(filters.DueDateFrom).toISOString());
    if (filters.DueDateTo) params = params.set('DueDateTo', new Date(filters.DueDateTo).toISOString());
    if (filters.AmountFrom) params = params.set('AmountFrom', filters.AmountFrom.toString());
    if (filters.AmountTo) params = params.set('AmountTo', filters.AmountTo.toString());
    if (filters.Currency) params = params.set('Currency', filters.Currency);
    if (filters.BankName) params = params.set('BankName', filters.BankName);
    if (filters.IsIncoming) params = params.set('IsIncoming', filters.IsIncoming);

    const headers = this.getAuthHeaders();
    return this.http.get<ChequesResponse>(
      `${this.supplierApiUrl}/GetChequesBySupplier/${supplierId}`,
      { headers, params }
    );
  }

  getOrdersBySupplier(
    supplierId: number | undefined,
    filters: OrderFilterParams
  ): Observable<OrderResponse> {
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

    const headers = this.getAuthHeaders();
    return this.http.get<OrderResponse>(
      `${this.supplierApiUrl}/GetOrdersBySupplier/${supplierId}`,
      { headers, params }
    );
  }

  getItemsBySupplier(
    supplierId: number | undefined,
    filters: ItemFilterParams
  ): Observable<ItemResponse> {
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

    const headers = this.getAuthHeaders();
    return this.http.get<ItemResponse>(
      `${this.supplierApiUrl}/GetItems/${supplierId}`,
      { headers, params }
    );
  }

  getItemsForSupplier(
    filters: ItemFilterParams
  ): Observable<ItemResponse> {
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
    if (filters.supplierId !== undefined && filters.supplierId !== null) {
      params = params.set('SupplierId', filters.supplierId.toString());
    }
    params = params.set('PageNumber', filters.PageNumber.toString());
    params = params.set('PageSize', filters.PageSize.toString());

    const headers = this.getAuthHeaders();
    return this.http.get<ItemResponse>(
      `${this.supplierApiUrl}/GetItems`,
      { headers, params }
    );
  }

  saveCustomer(id: number | undefined, customer: CustomerBaseDto): Observable<void> {
    const url = id ? `${this.supplierApiUrl}/SaveCustomer?id=${id}` : `${this.supplierApiUrl}/SaveCustomer`;
    const headers = this.getAuthHeaders();
    return this.http.post<void>(url, customer, { headers });
  }

  saveItem(id: number | undefined, item: FormData): Observable<void> {
    const url = id ? `${this.supplierApiUrl}/SaveItem?id=${id}` : `${this.supplierApiUrl}/SaveItem`;
    return this.http.post<void>(url, item);
  }

  getCashDetailsBySupplier(supplierId: number): Observable<CashDto[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<CashDto[]>(`${this.supplierApiUrl}/GetCashDetailsBySupplier/${supplierId}`, { headers });
  }

  addReceipt(receipt: FormData): Observable<void> {
    return this.http.post<void>(`${this.supplierApiUrl}/AddReceipt`, receipt);
  }

  getTransactions(supplierId: number | undefined): Observable<Transaction[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Transaction[]>(`${this.supplierApiUrl}/GetAllTransactions/${supplierId}`, { headers });
  }

  getTransactionsForSupplier(supplierId: number | undefined, tradingSupplierId: number | undefined): Observable<Transaction[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Transaction[]>(`${this.supplierApiUrl}/GetTransactions/?supplierId=${supplierId}&tradingSupplierId=${tradingSupplierId}`, { headers });
  }

  getTransactionsForCustomer(customerId: number | undefined): Observable<Transaction[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Transaction[]>(`${this.supplierApiUrl}/GetCustomerTransactions/${customerId}`, { headers });
  }

  getItemImage(itemId: number): Observable<Blob> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.supplierApiUrl}/GetItemImage/${itemId}`, { headers, responseType: 'blob' });
  }

  getImage(chequeId: number, isFront: boolean): Observable<Blob> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.supplierApiUrl}/GetChequeImage/${chequeId}/${isFront}`, { headers, responseType: 'blob' });
  }

  getSuppliers(pageNumber: number, pageSize: number, filters: any, supplierId: number | undefined): Observable<SuppliersResponse> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

    if (filters.name) params = params.set('Name', filters.name);
    if (filters.userName) params = params.set('UserName', filters.userName);
    if (filters.email) params = params.set('Email', filters.email);
    if (filters.phone) params = params.set('Phone', filters.phone);
    if (filters.address) params = params.set('Address', filters.address);
    if (filters.identity) params = params.set('Identity', filters.identity);

    if (supplierId !== undefined) params = params.set('SupplierId', supplierId.toString());

    const headers = this.getAuthHeaders();
    return this.http.get<SuppliersResponse>(`${this.supplierApiUrl}/GetSuppliers`, { headers, params });
  }

  endorseCheques(chequesIds: number[], supplierId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    const url = `${this.supplierApiUrl}/EndorsementCheque?supplierId=${supplierId}`;
    return this.http.put<void>(url, chequesIds, {headers});
  }

  placeOrder(orderDto: CreateOrderDto): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/Supplier/AddOrder`, orderDto, { headers });
  }

  getChequeTransactions(chequeId: number): Observable<Transaction[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Transaction[]>(`${this.supplierApiUrl}/GetChequeTransactions/${chequeId}`, { headers });
  }

  deleteCustomer(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.supplierApiUrl}/DeleteCustomer/${id}`, { headers });
  }

  deleteItem(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.supplierApiUrl}/DeleteItem/${id}`, { headers });
  }
}