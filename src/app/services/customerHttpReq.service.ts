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

    loadCustomer(id: number): Observable<CustomerBaseDto> {
      return this.http.get<CustomerBaseDto>(`${this.customerApiUrl}/${id}`);
    }
}