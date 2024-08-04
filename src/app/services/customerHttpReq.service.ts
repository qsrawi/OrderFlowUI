import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChequeFilterParams, ChequesResponse } from '../models/cheques';
import { CreateOrderDto, OrderFilterParams, OrderResponse } from '../models/orders';
import { ItemFilterParams, ItemResponse } from '../models/item';
import { CustomerBaseDto } from '../models/customer';
import { Transaction } from '../models/cheque_transaction';
import { ReceiptDto } from '../models/receipts';

@Injectable({
  providedIn: 'root'
})
export class CustomerHttpReqService {
  private apiUrl = 'https://localhost:7188/api';
  private customerApiUrl = `${this.apiUrl}/Customer`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  loadCustomer(customerId: number | undefined): Observable<CustomerBaseDto> {
    const headers = this.getAuthHeaders();
    return this.http.get<CustomerBaseDto>(
      `${this.customerApiUrl}/GetCustomer/${customerId}`,
      { headers }
    );
  }

  getItemsForCustomer(
    customerId: number | undefined,
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
      `${this.customerApiUrl}/GetItemsBySupplier/${customerId}`,
      { headers, params }
    );
  }

  getOrdersByCustomer(
    customerId: number | undefined,
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
      `${this.customerApiUrl}/GetOrdersByCustomer/${customerId}`,
      { headers, params }
    );
  }

  placeOrder(orderDto: CreateOrderDto): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.customerApiUrl}/AddOrder`, orderDto, { headers });
  }

  getTransactionsForCustomer(customerId: number | undefined): Observable<Transaction[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Transaction[]>(`${this.customerApiUrl}/GetCustomerTransactions/${customerId}`, { headers });
  }

  getReceiptsByCustomer(customerId: number | undefined): Observable<ReceiptDto[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<ReceiptDto[]>(`${this.customerApiUrl}/GetReceiptsByCustomer/${customerId}`, { headers });
  }
}
